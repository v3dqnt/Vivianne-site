"use client";

import dynamic from "next/dynamic";

// WebGPU only exists in the browser, so the field never renders on the
// server. Without WebGPU it falls back to the flat background color.
const ShapeWaves = dynamic(() => import("@/components/shape-waves/ShapeWaves"), {
  ssr: false,
});

export function HeroWaves() {
  return (
    <ShapeWaves
      shapes="mixed"
      cellSize={11}
      dotSize={0.62}
      color="#3a3a3a"
      hoverColor="#ffffff"
      backgroundColor="#0a0a0a"
      speed={0.6}
      scale={1.3}
      contrast={1}
      brightness={0.35}
      fade={0.45}
      interactive
      splashRadius={48}
      splashStrength={0.45}
      glow={0.3}
      intro
      introDuration={1.8}
      // No WebGPU: the flat background stays, which is a fine hero on its own.
      onError={(error: Error) => console.warn("ShapeWaves:", error)}
    />
  );
}
