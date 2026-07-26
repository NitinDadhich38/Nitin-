"""
Design-review screenshots via Chrome DevTools Protocol.

Launches a persistent headless Chrome with remote debugging, navigates,
scrolls to a real anchor element (not a URL fragment — headless screenshot
otherwise races the scroll), waits for webfonts/images, and captures.

    python scripts/shot.py <base-url> <name> [anchor1 anchor2 ...]
    python scripts/shot.py http://localhost:3100 home
    python scripts/shot.py http://localhost:3100 home problem what-we-do

No anchors -> captures the very top of the page.
Output: .screenshots/<name>-<anchor>.png (git-ignored).

Capture the PRODUCTION build (next build && next start). The dev server
hydrates too slowly for headless capture, and reduced-motion is forced so
scroll-reveals render in their settled state rather than mid-transition.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import time
import base64
import socket

import requests
import websocket

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, ".screenshots")
DEBUG_PORT = 9333
WIDTH = 1440
HEIGHT = 950


def find_chrome() -> str:
    for p in CHROME_CANDIDATES:
        if os.path.exists(p):
            return p
    sys.exit("No Chrome or Edge found; add its path to CHROME_CANDIDATES.")


def port_open(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.3)
        return s.connect_ex(("127.0.0.1", port)) == 0


def launch_chrome() -> None:
    if port_open(DEBUG_PORT):
        return
    profile = os.path.join(ROOT, ".chrome-shot-profile")
    subprocess.Popen(
        [
            find_chrome(),
            "--headless=new",
            "--disable-gpu",
            f"--remote-debugging-port={DEBUG_PORT}",
            "--remote-allow-origins=*",
            f"--user-data-dir={profile}",
            "--hide-scrollbars",
            "--force-prefers-reduced-motion",
            f"--window-size={WIDTH},{HEIGHT}",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    for _ in range(50):
        if port_open(DEBUG_PORT):
            time.sleep(0.5)
            return
        time.sleep(0.2)
    sys.exit("Chrome debug port never opened.")


def new_tab_ws() -> tuple[str, str]:
    r = requests.put(f"http://127.0.0.1:{DEBUG_PORT}/json/new?about:blank", timeout=10)
    tab = r.json()
    return tab["id"], tab["webSocketDebuggerUrl"]


def close_tab(tab_id: str) -> None:
    try:
        requests.get(f"http://127.0.0.1:{DEBUG_PORT}/json/close/{tab_id}", timeout=5)
    except requests.RequestException:
        pass


class CDP:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=30)
        self._id = 0

    def send(self, method: str, params: dict | None = None) -> dict:
        self._id += 1
        msg_id = self._id
        self.ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        while True:
            resp = json.loads(self.ws.recv())
            if resp.get("id") == msg_id:
                return resp.get("result", {})
            # ignore unrelated events

    def close(self) -> None:
        self.ws.close()


def capture(url: str, out: str, anchor: str | None) -> bool:
    tab_id, ws_url = new_tab_ws()
    cdp = CDP(ws_url)
    try:
        cdp.send("Page.enable")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": WIDTH, "height": HEIGHT, "deviceScaleFactor": 1, "mobile": False,
        })
        cdp.send("Page.navigate", {"url": url})
        # wait for load
        deadline = time.time() + 25
        loaded = False
        while time.time() < deadline:
            raw = cdp.ws.recv()
            evt = json.loads(raw)
            if evt.get("method") == "Page.loadEventFired":
                loaded = True
                break
        if not loaded:
            print(f"  TIMEOUT loading {url}")

        # let webfonts / remote images / hydration settle
        time.sleep(2.5)

        if anchor:
            cdp.send("Runtime.evaluate", {
                "expression": (
                    f"document.getElementById({json.dumps(anchor)})"
                    "?.scrollIntoView({block:'start'})"
                )
            })
            time.sleep(1.2)

        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        data = shot.get("data")
        if not data:
            print(f"  FAILED (no data) {out}")
            return False
        with open(out, "wb") as f:
            f.write(base64.b64decode(data))
        ok = os.path.getsize(out) > 15_000
        print(("  ok   " if ok else "  THIN ") + out)
        return ok
    finally:
        cdp.close()
        close_tab(tab_id)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)

    base, name = sys.argv[1].rstrip("/"), sys.argv[2]
    anchors = sys.argv[3:]
    os.makedirs(OUT_DIR, exist_ok=True)
    launch_chrome()

    if not anchors:
        capture(base, os.path.join(OUT_DIR, f"{name}-top.png"), None)
    else:
        for a in anchors:
            capture(base, os.path.join(OUT_DIR, f"{name}-{a}.png"), a)
