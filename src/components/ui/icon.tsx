import { HugeiconsIcon } from "@hugeicons/react";

type IconData = React.ComponentProps<typeof HugeiconsIcon>["icon"];

/** Hugeicons at the Terax defaults: 1.75 stroke, sized in px. */
export function Icon({
  icon,
  size = 16,
  strokeWidth = 1.75,
  className,
}: {
  icon: IconData;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    />
  );
}
