"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { HARNESSES } from "./icons";

gsap.registerPlugin(ScrollTrigger);

// Tiles sit on a ring around the Vivianne mark. All geometry is in a 100 x 100
// box so the SVG connectors and the absolutely positioned tiles share one
// coordinate system at any size.
const CENTER = 50;
const RADIUS = 37;
const POSITIONS = HARNESSES.map((_, i) => {
  const angle = -Math.PI / 2 + (i / HARNESSES.length) * Math.PI * 2;
  return { x: CENTER + Math.cos(angle) * RADIUS, y: CENTER + Math.sin(angle) * RADIUS };
});

const CYCLE_MS = 2600;

/**
 * The harnesses Vivianne can run over ACP, docked around the Vivianne mark.
 * Motion is there to say one thing: each of these plugs into the same window.
 *  - On first view the logos travel in from the centre and their connectors
 *    draw outward (arrival).
 *  - Then a pulse runs from one harness at a time into the mark (a handoff),
 *    while the readout names it. Hover or focus takes over and pauses the loop.
 * Reduced motion shows the finished state with no looping.
 */
export function HarnessDock() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Arrival animation and in-view tracking.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(reduce.matches);
    const onChange = () => setReduced(reduce.matches);
    reduce.addEventListener("change", onChange);

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
      const lines = gsap.utils.toArray<SVGPathElement>("[data-line]");
      const mark = markRef.current;

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setInView(self.isActive),
      });

      if (reduce.matches) return;

      const size = root.clientWidth;
      gsap.set(tiles, { opacity: 0, scale: 0.5 });
      gsap.set(lines, { strokeDashoffset: 1 });
      gsap.set(mark, { opacity: 0, scale: 0.8 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
          defaults: { ease: "expo.out" },
        })
        .to(mark, { opacity: 1, scale: 1, duration: 0.8 })
        .fromTo(
          tiles,
          {
            x: (i) => ((CENTER - POSITIONS[i].x) / 100) * size,
            y: (i) => ((CENTER - POSITIONS[i].y) / 100) * size,
          },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.1, stagger: 0.07 },
          0.1,
        )
        .to(lines, { strokeDashoffset: 0, duration: 0.9, stagger: 0.07, ease: "power2.out" }, 0.45);
    }, root);

    return () => {
      reduce.removeEventListener("change", onChange);
      ctx.revert();
    };
  }, []);

  // The handoff loop: advance to the next harness while visible and untouched.
  useEffect(() => {
    if (reduced || paused || held || !inView) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % HARNESSES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, held, inView]);

  // A pulse travels from the active harness into the mark each time it changes.
  useEffect(() => {
    const pulse = pulseRef.current;
    const mark = markRef.current;
    if (!pulse || !mark || reduced || !inView) return;
    const from = POSITIONS[active];
    const tween = gsap.timeline();
    tween
      .fromTo(
        pulse,
        { attr: { cx: from.x, cy: from.y }, opacity: 1 },
        { attr: { cx: CENTER, cy: CENTER }, duration: 0.8, ease: "power2.in" },
      )
      .to(pulse, { opacity: 0, duration: 0.15 }, ">-0.05")
      .fromTo(mark, { scale: 1 }, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" }, "<-0.1");
    return () => {
      tween.kill();
    };
  }, [active, reduced, inView]);

  const current = HARNESSES[active];

  return (
    <div className="mx-auto w-full max-w-[28rem]">
      <div ref={rootRef} className="relative aspect-square w-full [container-type:inline-size]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
          {POSITIONS.map((p, i) => (
            <path
              key={HARNESSES[i].id}
              data-line
              pathLength={1}
              strokeDasharray={1}
              d={`M ${CENTER} ${CENTER} L ${p.x} ${p.y}`}
              className={`fill-none transition-[stroke,stroke-opacity] duration-[var(--dur-base)] ease-[var(--ease-soft)] ${
                active === i ? "stroke-foreground" : "stroke-foreground/20"
              }`}
              strokeWidth={0.32}
            />
          ))}
          <circle ref={pulseRef} r={1.1} cx={CENTER} cy={CENTER} className="fill-foreground" opacity={0} />
        </svg>

        {/* The Vivianne mark: every line ends here. */}
        <div
          ref={markRef}
          className="surface-card absolute left-1/2 top-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2 rounded-xl p-[3%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG mark */}
          <img src="/vivianne-logo.svg" alt="Vivianne" width={96} height={96} className="size-full rounded-lg" />
        </div>

        {HARNESSES.map((h, i) => (
          <div
            key={h.id}
            data-tile
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${POSITIONS[i].x}%`, top: `${POSITIONS[i].y}%` }}
          >
            <button
              type="button"
              aria-label={h.name}
              aria-pressed={active === i}
              onPointerEnter={() => {
                setActive(i);
                setHeld(true);
              }}
              onPointerLeave={() => setHeld(false)}
              onFocus={() => {
                setActive(i);
                setHeld(true);
              }}
              onBlur={() => setHeld(false)}
              className={`surface-card flex size-[clamp(1.75rem,15cqw,4rem)] items-center justify-center rounded-xl outline-none transition-[color,background-color,box-shadow,translate] duration-[var(--dur-base)] ease-[var(--ease-premium)] focus-visible:ring-3 focus-visible:ring-ring/40 ${
                active === i
                  ? "-translate-y-0.5 bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                fillRule="evenodd"
                className="size-[46%]"
                aria-hidden
                dangerouslySetInnerHTML={{ __html: h.svg }}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p key={current.id} className="animate-pill-in text-sm" translate="no">
          <span className="font-medium text-foreground">{current.name}</span>{" "}
          <span className="text-muted-foreground">runs inside Vivianne over ACP</span>
        </p>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Resume the harness animation" : "Pause the harness animation"}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-[var(--dur-fast)] hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <Icon icon={paused ? PlayIcon : PauseIcon} size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
