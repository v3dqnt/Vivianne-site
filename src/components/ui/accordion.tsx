"use client";

import { Accordion as A } from "radix-ui";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export const Accordion = A.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof A.Item>) {
  return <A.Item className={cn("surface-card rounded-xl", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  as: Heading = "h3",
  ...props
}: React.ComponentProps<typeof A.Trigger> & { as?: "h2" | "h3" }) {
  return (
    <A.Header asChild>
      <Heading className="m-0">
        <A.Trigger
          className={cn(
            "group flex w-full cursor-pointer items-center justify-between gap-6 rounded-xl px-5 py-4 text-left text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:text-base",
            className,
          )}
          {...props}
        >
          {children}
          <Icon
            icon={Add01Icon}
            size={16}
            className="shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-premium)] group-data-[state=open]:rotate-45"
          />
        </A.Trigger>
      </Heading>
    </A.Header>
  );
}

/** Content stays in the DOM when closed (so answers stay indexable) and
 * reveals by animating grid rows from 0fr to 1fr, with no height measuring. */
export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof A.Content>) {
  return (
    <A.Content
      forceMount
      className="grid transition-[grid-template-rows,opacity,visibility] duration-[var(--dur-base)] ease-[var(--ease-soft)] [&[hidden]]:grid data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100"
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn("px-5 pb-5 text-sm leading-relaxed text-muted-foreground", className)}>
          {children}
        </div>
      </div>
    </A.Content>
  );
}
