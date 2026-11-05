"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(ref.current, { scale: 0.95, transformOrigin: "left center" });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<never>} data-reveal className={className}>
      {children}
    </Tag>
  );
}
