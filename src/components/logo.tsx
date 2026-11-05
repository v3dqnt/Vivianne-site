import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/vivianne-logo.svg"
      alt="Vivianne"
      width={size}
      height={size}
      priority
      unoptimized
      className="shrink-0 rounded-[22%]"
    />
  );
}
