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
 * One feature, set as plain centred text under its illustration, and
 * choreographed as a single timeline when it scrolls into view: the
 * illustration settles in, the title words rise out of their lines, the badge
 * pops, and the sentence fades up. Scrolling back above it rewinds it, so it
 * plays again on the way down. Reduced motion shows everything in place.
 */
export function FeatureCopy({
  art,
  status,
  lead,
  rest,
}: {
  art?: React.ReactNode;
  status?: string;
  lead: string;
  rest: string;
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
        scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none reverse" },
      });
      // Not every feature has every part, and an empty tween would only warn.
      const step = (name: string, from: gsap.TweenVars, to: gsap.TweenVars, at: gsap.Position) => {
        const targets = q(`[data-ft="${name}"]`);
        if (targets.length) tl.fromTo(targets, from, to, at);
      };
      step("art", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1 }, 0);
      step("word", { y: 0, yPercent: 110 }, { yPercent: 0, stagger: 0.04 }, 0.15);
      step("badge", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" }, 0.35);
      step("rest", { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.3);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} data-feature className="flex flex-col items-center text-center">
      {art && <div data-ft="art">{art}</div>}
      <h3 className="type-h4 mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-foreground">
        <span>
          <Words text={lead} />
        </span>
        {status && (
          <span data-ft="badge" className="inline-flex">
            <Badge variant="outline">{status}</Badge>
          </span>
        )}
      </h3>
      <p data-ft="rest" className="type-body mt-2 max-w-[34ch] text-muted-foreground">
        {rest}
      </p>
    </div>
  );
}
