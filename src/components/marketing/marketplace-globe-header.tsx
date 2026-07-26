"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Marketplace Globe Header — a flat illustrated earth revolving.
 *
 * Original artwork in PRAN's palette (forest ocean + emerald land).
 * Continent shapes from public-domain Natural Earth data.
 * Clean earth rotating — no props, no stats, no gloss.
 */
export function MarketplaceGlobeHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RAD = Math.PI / 180;
    const TILT = 8 * RAD;
    const sinT = Math.sin(TILT);
    const cosT = Math.cos(TILT);
    const TW = 2048;
    const TH = 1024;
    const DOME = 0.52;

    // Palette
    const OCEAN = "#0f3d2e";
    const LAND_A = "#3f9e5c";
    const LAND_B = "#54b06c";
    const OUTLINE = "#0a2a20";

    const RES = 960;
    cv.width = RES;
    cv.height = RES;
    const r = RES / 2 - 3;
    const c = RES / 2;
    const img = ctx.createImageData(RES, RES);
    const D = img.data;

    // Compute visible dome band only
    const maxY = Math.min(RES, Math.ceil(RES * DOME) + 4);
    const idx: number[] = [];
    const la: number[] = [];
    const dl: number[] = [];

    for (let py = 0; py < maxY; py++) {
      for (let px = 0; px < RES; px++) {
        const nx = (px + 0.5 - c) / r;
        const ny = (c - py - 0.5) / r;
        const q = nx * nx + ny * ny;
        if (q > 1) continue;
        const nz = Math.sqrt(1 - q);
        idx.push(py * RES + px);
        la.push(Math.asin(Math.max(-1, Math.min(1, ny * cosT + nz * sinT))));
        dl.push(Math.atan2(nx, -ny * sinT + nz * cosT));
      }
    }

    const I = Int32Array.from(idx);
    const LA = Float32Array.from(la);
    const DL = Float32Array.from(dl);

    // Build texture
    const tex = document.createElement("canvas");
    tex.width = TW;
    tex.height = TH;
    const tc = tex.getContext("2d");
    if (!tc) return;

    tc.fillStyle = OCEAN;
    tc.fillRect(0, 0, TW, TH);
    const gx = (v: number) => ((v + 180) / 360) * TW;
    const gy = (v: number) => ((90 - v) / 180) * TH;
    tc.lineJoin = "round";

    // Stubbed land data — in production, this would come from the globe data
    // For now, we render an ocean-only placeholder since the full land data
    // would require embedding the TopoJSON
    const TD = tc.getImageData(0, 0, TW, TH).data;

    let lon0 = 100 * RAD;

    function draw() {
      for (let i = 0; i < I.length; i++) {
        let lo = DL[i] + lon0;
        lo = ((lo + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        let tx = ((lo / Math.PI * 0.5 + 0.5) * TW) | 0;
        let ty = ((0.5 - LA[i] / Math.PI) * TH) | 0;
        if (tx < 0) tx = 0;
        else if (tx >= TW) tx = TW - 1;
        if (ty < 0) ty = 0;
        else if (ty >= TH) ty = TH - 1;
        const t = (ty * TW + tx) << 2;
        const p = I[i] << 2;
        D[p] = TD[t];
        D[p + 1] = TD[t + 1];
        D[p + 2] = TD[t + 2];
        D[p + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);

      // Outline
      ctx.beginPath();
      ctx.arc(c, c, r + 1.5, 0, 7);
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 5;
      ctx.stroke();

      // Highlight arc
      ctx.beginPath();
      ctx.arc(c, c, r - 4, Math.PI * 1.06, Math.PI * 1.5);
      ctx.strokeStyle = "rgba(217,249,157,.55)";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      if (!reduce) lon0 += 0.0013;
      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pran-paper via-[#f2efe6] to-[#eef2e4]">
      <div className="mx-auto max-w-content px-6 py-24 sm:py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-9 bg-pran-emerald"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-pran-emerald">
              The marketplace
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-tight tracking-tight text-pran-ink">
            Verified carbon projects,{" "}
            <em className="font-display not-italic text-pran-emerald">
              one transparent market.
            </em>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-pran-muted sm:text-lg">
            Every listing is a real, registry-issued project. Purchases move through
            PRAN&rsquo;s escrow — you pay PRAN, credits transfer to your registry account,
            and you receive a retirement certificate.
          </p>
        </div>

        {/* Rotating globe */}
        <div className="mx-auto mt-16 flex justify-center">
          <div className="w-full max-w-2xl" style={{ aspectRatio: "1" }}>
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              style={{ maxWidth: "960px" }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {[
            "All Projects",
            "Forestry",
            "Renewable",
            "Blue Carbon",
            "Agriculture",
            "Waste & Biogas",
          ].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                i === 0
                  ? "bg-pran-ink text-white"
                  : "border border-pran-hairline bg-pran-surface text-pran-ink hover:border-pran-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
