"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import {
  PERSONAL,
  BUSINESS,
  DIET,
  DIET_SOURCE,
  METHODOLOGY_NOTE,
} from "@/lib/emission-factors";
import { cn } from "@/lib/utils";

/**
 * N1 — footprint calculator (5_Design.md §4.4).
 * Softer, friendlier register than the rest of the site: this is the
 * consumer-facing entry point. One question group at a time, a slim progress
 * bar, and a live running estimate.
 *
 * Estimates FOOTPRINTS only. It never generates or issues carbon credits.
 */

type Mode = "personal" | "business";

const KG_PER_TONNE = 1000;

function Field({
  label,
  hint,
  value,
  onChange,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  suffix: string;
}) {
  return (
    <label className="block">
      <span className="text-[15px] font-medium text-pran-ink">{label}</span>
      {hint && <span className="mt-1 block text-sm text-pran-muted">{hint}</span>}
      <span className="mt-2.5 flex items-center gap-3">
        <input
          type="number"
          min={0}
          inputMode="decimal"
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="h-12 w-full rounded-btn border border-pran-hairline bg-pran-surface px-4 text-[15px] tabular-nums text-pran-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50"
        />
        <span className="w-28 shrink-0 text-sm text-pran-muted">{suffix}</span>
      </span>
    </label>
  );
}

export function CalculatorClient() {
  const [mode, setMode] = useState<Mode>("personal");
  const [step, setStep] = useState(0);

  // personal
  const [kwh, setKwh] = useState(0);
  const [lpg, setLpg] = useState(0);
  const [carKm, setCarKm] = useState(0);
  const [transitKm, setTransitKm] = useState(0);
  const [flightKm, setFlightKm] = useState(0);
  const [diet, setDiet] = useState<keyof typeof DIET>("mixed");

  // business
  const [bKwh, setBKwh] = useState(0);
  const [bGas, setBGas] = useState(0);
  const [bDiesel, setBDiesel] = useState(0);
  const [bAir, setBAir] = useState(0);
  const [bCommute, setBCommute] = useState(0);

  const breakdown = useMemo(() => {
    if (mode === "personal") {
      return [
        { label: "Electricity", kg: kwh * 12 * PERSONAL.electricity.kgCo2e },
        { label: "Cooking (LPG)", kg: lpg * 12 * PERSONAL.lpg.kgCo2e },
        { label: "Car travel", kg: carKm * 12 * PERSONAL.petrolCar.kgCo2e },
        { label: "Public transport", kg: transitKm * 12 * PERSONAL.bus.kgCo2e },
        { label: "Flights", kg: flightKm * PERSONAL.flightLong.kgCo2e },
        { label: "Diet", kg: DIET[diet].tCo2ePerYear * KG_PER_TONNE },
      ].filter((b) => b.kg > 0);
    }
    return [
      { label: "Electricity (Scope 2)", kg: bKwh * 12 * BUSINESS.electricity.kgCo2e },
      { label: "Natural gas (Scope 1)", kg: bGas * 12 * BUSINESS.naturalGas.kgCo2e },
      { label: "Fleet diesel (Scope 1)", kg: bDiesel * 12 * BUSINESS.diesel.kgCo2e },
      { label: "Business air travel (Scope 3)", kg: bAir * BUSINESS.businessTravelAir.kgCo2e },
      { label: "Employee commuting (Scope 3)", kg: bCommute * 12 * BUSINESS.employeeCommute.kgCo2e },
    ].filter((b) => b.kg > 0);
  }, [mode, kwh, lpg, carKm, transitKm, flightKm, diet, bKwh, bGas, bDiesel, bAir, bCommute]);

  const totalKg = breakdown.reduce((s, b) => s + b.kg, 0);
  const totalTonnes = totalKg / KG_PER_TONNE;

  const personalSteps = ["Home energy", "Travel", "Diet"];
  const businessSteps = ["Energy", "Travel"];
  const steps = mode === "personal" ? personalSteps : businessSteps;
  const isResult = step >= steps.length;
  const progress = Math.min(step / steps.length, 1) * 100;

  const reset = () => {
    setStep(0);
    setKwh(0); setLpg(0); setCarKm(0); setTransitKm(0); setFlightKm(0); setDiet("mixed");
    setBKwh(0); setBGas(0); setBDiesel(0); setBAir(0); setBCommute(0);
  };

  const swap = (m: Mode) => {
    setMode(m);
    setStep(0);
  };

  const palette = ["#0F3D2E", "#16A34A", "#5FA97F", "#C97A4A", "#9AB3A8", "#D9C48A"];

  return (
    <div className="bg-pran-paper-warm">
      {/* S1 — opener over photography */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.seedling}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(217,249,157,.12),transparent_60%),linear-gradient(180deg,rgba(5,14,9,.74),rgba(4,12,8,.94))]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="mx-auto max-w-[16ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              Know your number before you offset it.
            </h1>
            <p className="mx-auto mt-5 max-w-[54ch] text-lg leading-relaxed text-white/70">
              A quick estimate built on cited factors — DEFRA, the GHG Protocol,
              and the CEA grid factor for Indian electricity. No sign-up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-12 text-center sm:pt-14">

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Calculator mode"
            className="mx-auto mt-8 inline-flex rounded-btn bg-pran-surface p-1 shadow-card"
          >
            {(["personal", "business"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => swap(m)}
                className={cn(
                  "rounded-[9px] px-6 py-2.5 text-sm font-medium capitalize transition-colors",
                  mode === m
                    ? "bg-pran-ink text-white"
                    : "text-pran-ink hover:text-pran-emerald",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* S2 — the card */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="overflow-hidden rounded-hero bg-pran-surface shadow-float">
          {/* progress */}
          <div className="h-1 w-full bg-pran-hairline">
            <div
              className="h-full bg-pran-emerald transition-[width] duration-500"
              style={{ width: `${isResult ? 100 : progress}%` }}
            />
          </div>

          <div className="p-7 sm:p-10">
            {!isResult && (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                  Step {step + 1} of {steps.length} · {steps[step]}
                </p>

                <div className="mt-7 flex flex-col gap-6">
                  {mode === "personal" && step === 0 && (
                    <>
                      <Field label="Electricity used" hint="Check a recent bill — the monthly average is fine." value={kwh} onChange={setKwh} suffix="kWh / month" />
                      <Field label="Cooking gas" hint="A domestic LPG cylinder is about 14.2 kg." value={lpg} onChange={setLpg} suffix="kg / month" />
                    </>
                  )}
                  {mode === "personal" && step === 1 && (
                    <>
                      <Field label="Car or two-wheeler" value={carKm} onChange={setCarKm} suffix="km / month" />
                      <Field label="Bus, metro or train" value={transitKm} onChange={setTransitKm} suffix="km / month" />
                      <Field label="Flights" hint="Total distance flown across a year." value={flightKm} onChange={setFlightKm} suffix="km / year" />
                    </>
                  )}
                  {mode === "personal" && step === 2 && (
                    <fieldset>
                      <legend className="text-[15px] font-medium text-pran-ink">
                        Which best describes how you eat?
                      </legend>
                      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {(Object.keys(DIET) as (keyof typeof DIET)[]).map((k) => (
                          <button
                            key={k}
                            onClick={() => setDiet(k)}
                            aria-pressed={diet === k}
                            className={cn(
                              "rounded-btn border px-4 py-3.5 text-left text-[15px] transition-colors",
                              diet === k
                                ? "border-pran-emerald bg-pran-emerald/8 text-pran-ink"
                                : "border-pran-hairline text-pran-ink hover:border-pran-ink/30",
                            )}
                          >
                            {DIET[k].label}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-pran-muted">
                        {DIET_SOURCE.note}
                      </p>
                    </fieldset>
                  )}

                  {mode === "business" && step === 0 && (
                    <>
                      <Field label="Purchased electricity" hint="Scope 2 — across all sites." value={bKwh} onChange={setBKwh} suffix="kWh / month" />
                      <Field label="Natural gas" hint="Scope 1 — on-site combustion." value={bGas} onChange={setBGas} suffix="m³ / month" />
                      <Field label="Fleet diesel" hint="Scope 1 — owned or leased vehicles." value={bDiesel} onChange={setBDiesel} suffix="litres / month" />
                    </>
                  )}
                  {mode === "business" && step === 1 && (
                    <>
                      <Field label="Business air travel" hint="Scope 3 — total passenger-km across a year." value={bAir} onChange={setBAir} suffix="km / year" />
                      <Field label="Employee commuting" hint="Scope 3 — total passenger-km for all staff." value={bCommute} onChange={setBCommute} suffix="km / month" />
                    </>
                  )}
                </div>

                {/* live running estimate */}
                <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-pran-hairline pt-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                      Running estimate
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-pran-ink">
                      {totalTonnes.toFixed(2)}
                      <span className="ml-1.5 text-sm font-normal text-pran-muted">
                        tCO₂e / year
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className={cn(buttonVariants({ variant: "secondary" }), "gap-1.5")}
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    )}
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      className={cn(buttonVariants(), "group")}
                    >
                      {step === steps.length - 1 ? "See result" : "Continue"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* S3 — result */}
            {isResult && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
                  Your estimate
                </p>
                <p className="mt-4 font-display text-display-xl font-semibold tabular-nums leading-none text-pran-emerald">
                  {totalTonnes.toFixed(2)}
                </p>
                <p className="mt-2 text-lg text-pran-muted">
                  tonnes CO₂e per year
                  {mode === "business" && " (from the categories entered)"}
                </p>

                {breakdown.length > 0 ? (
                  <div className="mt-9">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                      Where it comes from
                    </p>
                    <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-pran-hairline">
                      {breakdown.map((b, i) => (
                        <span
                          key={b.label}
                          title={`${b.label} — ${((b.kg / totalKg) * 100).toFixed(0)}%`}
                          style={{
                            width: `${(b.kg / totalKg) * 100}%`,
                            background: palette[i % palette.length],
                          }}
                        />
                      ))}
                    </div>
                    <ul className="mt-6 flex flex-col gap-3">
                      {breakdown
                        .slice()
                        .sort((a, b) => b.kg - a.kg)
                        .map((b) => (
                          <li
                            key={b.label}
                            className="flex items-center justify-between border-b border-pran-hairline pb-3 text-sm last:border-b-0"
                          >
                            <span className="text-pran-ink">{b.label}</span>
                            <span className="font-mono tabular-nums text-pran-muted">
                              {(b.kg / KG_PER_TONNE).toFixed(2)} t
                              <span className="ml-2 text-pran-ink">
                                {((b.kg / totalKg) * 100).toFixed(0)}%
                              </span>
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-8 rounded-card bg-pran-paper-warm p-5 text-sm text-pran-muted">
                    No figures entered yet — go back and add at least one.
                  </p>
                )}

                {/* Mandatory disclaimer */}
                <p className="mt-9 rounded-card bg-pran-paper-warm p-5 text-sm leading-relaxed text-pran-muted">
                  <span className="font-medium text-pran-ink">
                    This is an estimate, not a verified inventory.
                  </span>{" "}
                  {METHODOLOGY_NOTE} Purchasing and retiring credits does not
                  make an organisation, product, or individual &ldquo;carbon
                  neutral&rdquo; — it records that a quantity of verified
                  credits was purchased and retired on your behalf.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/marketplace?tonnes=${totalTonnes.toFixed(2)}`}
                    className={cn(buttonVariants({ size: "lg" }), "group")}
                  >
                    Offset through PRAN
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    onClick={reset}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "gap-1.5",
                    )}
                  >
                    <RotateCcw className="h-4 w-4" /> Start again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-pran-muted">
          PRAN never creates carbon credits. This tool estimates footprints only.
        </p>
      </section>
    </div>
  );
}
