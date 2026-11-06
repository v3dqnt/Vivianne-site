import { HARNESSES } from "@/components/harness-dock/icons";

const C = 60;
const RING = 44;
const NODE = 10;
const HUB = 13;

const nodes = HARNESSES.map((harness, i) => {
  const angle = (i / HARNESSES.length) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    harness,
    x: round(C + x * RING),
    y: round(C + y * RING),
    // The spoke runs from the hub's edge to the node's edge, never under either.
    from: [round(C + x * (HUB + 4)), round(C + y * (HUB + 4))],
    to: [round(C + x * (RING - NODE)), round(C + y * (RING - NODE))],
  };
});

/**
 * Line drawing of Vivianne at the hub of the agents it runs over ACP, in the
 * same thin line style as the other feature icons. Each spoke and agent lights
 * in turn with a CSS loop (see `acp-turn` in globals.css), so it needs no
 * script; reduced motion holds it still with every agent shown.
 */
export function AcpGlyph() {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${HARNESSES.map((h) => h.name).join(", ")} connected to Vivianne over ACP`}
      className="size-[82%] text-foreground"
    >
      {nodes.map(({ harness, from, to }, i) => (
        <line
          key={harness.id}
          className="acp-turn"
          style={{ animationDelay: `${i - HARNESSES.length}s` }}
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          stroke="currentColor"
          strokeWidth={0.9}
        />
      ))}
      <rect
        x={C - HUB}
        y={C - HUB}
        width={HUB * 2}
        height={HUB * 2}
        rx={6}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.75}
        strokeWidth={0.9}
      />
      <image href="/vivianne-logo.svg" x={C - 9} y={C - 9} width={18} height={18} />
      {nodes.map(({ harness, x, y }, i) => (
        <g
          key={harness.id}
          className="acp-turn"
          style={{ animationDelay: `${i - HARNESSES.length}s` }}
        >
          <circle cx={x} cy={y} r={NODE} fill="none" stroke="currentColor" strokeWidth={0.9} />
          <svg
            x={x - 5.5}
            y={y - 5.5}
            width={11}
            height={11}
            viewBox="0 0 24 24"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: harness.svg }}
          />
        </g>
      ))}
    </svg>
  );
}
