"use client";

import { Label as L } from "radix-ui";
import { cn } from "@/lib/cn";

export function Label({ className, ...props }: React.ComponentProps<typeof L.Root>) {
  return <L.Root className={cn("text-sm font-medium", className)} {...props} />;
}

/** Filled, not outlined: Terax inputs sit on a translucent fill. */
export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-sm text-foreground outline-none transition-[box-shadow,border-color] duration-[var(--dur-fast)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
