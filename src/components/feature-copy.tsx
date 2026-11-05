"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

/** Splits a sentence into masked words so each one can rise out of its line. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <span data-ft="word" className="inline-block will-change-transform">
              {word}
            </span>
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * The copy for one bento card, choreographed as a single timeline when it
 * scrolls into view: the title words rise out of their lines, the badge pops,
 * the sentence fades up, and chips follow. Scrolling back above the card
 * rewinds it, so it plays again on the way down. Reduced motion shows
 * everything in place.
 */
export function FeatureCopy({
  status,
  lead,
  rest,
  chips,
}: {
  status?: string;
  lead: string;
  rest?: string;
  chips?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.9 },
        scrollTrigger: { trigger: root, start: "top 88%", toggleActions: "play none none reverse" },
      });
      // Not every card has every part, and an empty tween would only warn.
      const step = (name: string, from: gsap.TweenVars, to: gsap.TweenVars, at: gsap.Position) => {
        const targets = q(`[data-ft="${name}"]`);
        if (targets.length) tl.fromTo(targets, from, to, at);
      };
      step("word", { y: 0, yPercent: 110 }, { yPercent: 0, stagger: 0.04 }, 0);
      step("badge", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" }, 0.2);
      step("rest", { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.2);
      step("chip", { opacity: 0, y: 8, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)", stagger: 0.03 }, 0.35);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} data-feature className={rest ? undefined : "flex flex-wrap items-center gap-x-5 gap-y-3"}>
      <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg font-medium leading-snug tracking-[-0.015em] text-foreground">
        <span>
          <Words text={lead} />
        </span>
        {status && (
          <span data-ft="badge" className="inline-flex">
            <Badge variant="outline">{status}</Badge>
          </span>
        )}
      </h3>
      {rest && (
        <p data-ft="rest" className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
          {rest}
        </p>
      )}
      {chips && (
        <ul className={`flex flex-wrap gap-1 ${rest ? "mt-3" : ""}`} translate="no">
          {chips.map((chip) => (
            <li
              key={chip}
              data-ft="chip"
              className="inline-flex h-6 items-center rounded-md border border-border bg-foreground/[0.05] px-2 text-xs text-foreground/80"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
