import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/vivianne-logo.png"
      alt="Vivianne"
      width={size}
      height={size}
      priority
      // The planet is solid black, so on the dark canvas it needs a thin
      // light rim and a faint halo to read at all.
      className="shrink-0 [filter:drop-shadow(0_0_0.6px_rgba(255,255,255,0.85))_drop-shadow(0_0_6px_rgba(247,247,247,0.12))]"
    />
  );
}
