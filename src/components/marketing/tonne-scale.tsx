import { DrawnFigure, DrawnPath, DrawnIn } from "@/components/craft/drawn-figure";
import { tonneScale } from "@/lib/page-data";

/**
 * One tonne of CO₂, at human scale — the signature visual for
 * /why-carbon-markets (7_Page_Design_Roadmap.md §4, 2.1).
 *
 * Every carbon page in the world prints "tonnes" and assumes the reader has an
 * intuition for it. Nobody does, which is exactly why the numbers never land.
 * So: draw it against things people have stood next to.
 *
 * The 10 m figure is CALCULATED from gas density, not borrowed from a claim,
 * and the assumption is printed under the drawing so a sceptical reader can
 * check it rather than take our word (CLAUDE.md — never invent, always source).
 */

/** px per metre — chosen so the 10 m sphere fits the viewBox with room to label. */
const PPM = 24;
const GROUND = 380;
const m = (metres: number) => metres * PPM;

export function TonneScale() {
  const r = m(tonneScale.diameterMetres) / 2;
  const sphere = { cx: 660, cy: GROUND - r, r };

  const person = { x: 62, h: m(1.7) };
  const bus = { x: 120, w: m(11), h: m(4.4) };

  return (
    <DrawnFigure
      tone="dark"
      caption={tonneScale.assumption}
      source="Calculated from CO₂ gas density; reference heights are commonplace approximations"
    >
      <svg
        viewBox="0 0 960 460"
        className="w-full"
        role="img"
        aria-label={`One tonne of carbon dioxide as a gas is a sphere roughly ${tonneScale.diameterMetres} metres across — taller than a double-decker bus and about the height of a three-storey building.`}
      >
        {/* ground */}
        <DrawnPath
          d={`M 30 ${GROUND} L 930 ${GROUND}`}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth={1.5}
          fill="none"
          duration={900}
        />

        {/* the tonne */}
        <DrawnIn delay={700}>
          <circle
            cx={sphere.cx}
            cy={sphere.cy}
            r={sphere.r}
            fill="rgba(217,249,157,0.10)"
            stroke="#d9f99d"
            strokeWidth={2}
          />
          <text
            x={sphere.cx}
            y={sphere.cy - 8}
            textAnchor="middle"
            className="fill-white text-[26px] font-semibold"
          >
            1 tonne
          </text>
          <text
            x={sphere.cx}
            y={sphere.cy + 20}
            textAnchor="middle"
            className="fill-white/60 text-[15px]"
          >
            of CO₂
          </text>
        </DrawnIn>

        {/* diameter marker */}
        <DrawnIn delay={1300}>
          <line
            x1={sphere.cx - sphere.r}
            y1={GROUND + 26}
            x2={sphere.cx + sphere.r}
            y2={GROUND + 26}
            stroke="#d9f99d"
            strokeWidth={1.5}
          />
          <line x1={sphere.cx - sphere.r} y1={GROUND + 20} x2={sphere.cx - sphere.r} y2={GROUND + 32} stroke="#d9f99d" strokeWidth={1.5} />
          <line x1={sphere.cx + sphere.r} y1={GROUND + 20} x2={sphere.cx + sphere.r} y2={GROUND + 32} stroke="#d9f99d" strokeWidth={1.5} />
          <text x={sphere.cx} y={GROUND + 50} textAnchor="middle" className="fill-pran-lime text-[15px] font-semibold">
            {tonneScale.diameterMetres} m across
          </text>
        </DrawnIn>

        {/* a person */}
        <DrawnIn delay={300}>
          <circle cx={person.x} cy={GROUND - person.h + 6} r={5} fill="rgba(255,255,255,0.75)" />
          <rect
            x={person.x - 5}
            y={GROUND - person.h + 12}
            width={10}
            height={person.h - 12}
            rx={4}
            fill="rgba(255,255,255,0.75)"
          />
          <text x={person.x} y={GROUND + 24} textAnchor="middle" className="fill-white/55 text-[13px]">
            1.7 m
          </text>
        </DrawnIn>

        {/* a double-decker bus */}
        <DrawnIn delay={480}>
          <rect
            x={bus.x}
            y={GROUND - bus.h}
            width={bus.w}
            height={bus.h}
            rx={8}
            fill="rgba(244,201,160,0.16)"
            stroke="rgba(244,201,160,0.75)"
            strokeWidth={1.5}
          />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={bus.x + 16 + i * 58}
              y={GROUND - bus.h + 14}
              width={38}
              height={26}
              rx={3}
              fill="rgba(244,201,160,0.3)"
            />
          ))}
          <text
            x={bus.x + bus.w / 2}
            y={GROUND + 24}
            textAnchor="middle"
            className="fill-white/55 text-[13px]"
          >
            double-decker bus · 4.4 m
          </text>
        </DrawnIn>
      </svg>
    </DrawnFigure>
  );
}
