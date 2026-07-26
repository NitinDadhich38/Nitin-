import type { Metadata } from "next";
import { CalculatorClient } from "@/components/calculator/calculator-client";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator",
  description:
    "Estimate your personal or business carbon footprint on cited factors — DEFRA, GHG Protocol, and the CEA grid factor for Indian electricity.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
