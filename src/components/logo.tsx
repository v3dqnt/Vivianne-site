import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/vivianne-logo.png"
      alt="Vivianne"
      width={size}
      height={size}
      priority
      className="shrink-0"
    />
  );
}
