import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-4xl text-sm font-medium no-underline transition-[background-color,color,border-color,box-shadow,translate,opacity] duration-[var(--dur-fast)] ease-[var(--ease-soft)] outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-3 focus-visible:ring-ring/40 [&_svg]:shrink-0";

const variants = {
  default: "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_1px_2px_var(--lift)] hover:bg-primary/85",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-transparent text-foreground hover:bg-input/30",
  ghost: "text-foreground hover:bg-muted/50",
  link: "text-foreground underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-8 px-3",
  default: "h-9 px-4",
  lg: "h-10 px-5",
  icon: "size-9",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  asChild,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={buttonVariants({ variant, size, className })} {...props} />;
}
