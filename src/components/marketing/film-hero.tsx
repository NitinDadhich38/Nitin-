"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

/**
 * Home opening: the "Own your impact" film. Plays muted and looped. Sound is
 * opt-in on tap (restarts from the first line so the voice lines up). With
 * reduced motion it stays on the poster until the visitor presses play.
 * The film carries its own captions, so nothing is overlaid on it except the
 * route into the membership.
 */
export function FilmHero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const v = ref.current;
    if (!v) return;
    if (!mq.matches) {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    if (!sound) {
      v.muted = false;
      v.currentTime = 0;
      v.play().then(() => setPlaying(true)).catch(() => {
        v.muted = true;
      });
      setSound(true);
    } else {
      v.muted = true;
      setSound(false);
    }
  }

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50";

  return (
    <section className="relative -mt-16 flex min-h-[100svh] flex-col justify-center bg-pran-ink md:justify-end md:overflow-hidden">
      <div className="relative w-full md:absolute md:inset-0">
        <video
          ref={ref}
          className="aspect-video w-full object-contain md:h-full md:object-cover"
          poster="/film/poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Film: Own your impact. A walker moves from a bare road into a green, golden landscape while five lines about responsibility appear."
        >
          <source src="/film/own-your-impact.mp4" type="video/mp4" media="(min-width: 1024px)" />
          <source src="/film/own-your-impact-720.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/70 to-transparent md:block"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center gap-5 px-6 pb-10 pt-8 text-center md:flex-row md:items-end md:justify-between md:pb-12 md:text-left">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/75">
            PRAN Membership
          </p>
          <Link
            href="/membership"
            className="group mt-3 inline-flex h-14 items-center gap-2 rounded-btn bg-white px-8 text-base font-medium text-pran-forest transition-colors hover:bg-pran-cream"
          >
            Enter the membership
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/marketplace"
            className="ml-5 inline-block text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Explore the marketplace
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={togglePlay} className={btn} aria-label={playing ? "Pause film" : "Play film"}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className={btn}
            aria-label={sound ? "Mute film" : "Play film with sound"}
            aria-pressed={sound}
          >
            {sound ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          {reduced && !playing && <span className="text-xs text-white/70">Motion is paused</span>}
        </div>
      </div>
    </section>
  );
}
