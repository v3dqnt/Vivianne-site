"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The hero screenshot starts slightly recessed, as if still behind glass,
// then expands into its full frame as the section scrolls into view. The
// scale, clip and fade are scrubbed to scroll position (not a fixed
// duration) so the motion always matches how fast the user scrolls.
export function HeroScrollExpand({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% round 2rem)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0.6,
          y: 44,
          scale: 0.82,
          clipPath: "inset(9% round 2rem)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% round 2rem)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            end: "top 32%",
            scrub: 0.6,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  );
}
