import NextLink from "next/link";
import { cn } from "@/lib/cn";

/** Quiet nav/footer link: muted at rest, ink on hover. */
export function TextLink({ className, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        "text-sm text-muted-foreground no-underline transition-colors duration-[var(--dur-fast)] hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Emphasised call-to-action link: ink, underlined on hover. */
export function ActionLink({ className, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        // Inline-block, not flex, so a trailing icon follows the last word when
        // the label wraps instead of floating to the far edge.
        "inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline [&>svg]:ml-1.5 [&>svg]:inline-block [&>svg]:align-[-3px]",
        className,
      )}
      {...props}
    />
  );
}
