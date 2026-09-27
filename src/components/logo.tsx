import Image from "next/image";

// The planet mark, recoloured for a dark page (the body lifted to near-white,
// the blue-to-silver ring untouched). `size` is the rendered height.
export function Logo({ size = 20 }: { size?: number }) {
  return (
    <Image
      src="/vivianne-logo-dark.png"
      alt=""
      width={Math.round((size * 457) / 269)}
      height={size}
      priority
      className="shrink-0"
    />
  );
}
