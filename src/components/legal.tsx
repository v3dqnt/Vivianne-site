import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/** Shared shell for the policy pages. Long-form legal prose is the one place
 * on this site where a narrower measure and looser leading matter more than
 * the marketing layout's rhythm, so it gets its own container rather than
 * reusing a section from the landing page. */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-12 md:pt-48">
        <Reveal
          as="h1"
          className="text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl"
        >
          {title}
        </Reveal>
        <Reveal
          delay={0.06}
          as="p"
          className="mt-4 text-sm text-body/70"
        >
          Last updated: {updated}
        </Reveal>
        {intro ? (
          <Reveal
            delay={0.1}
            as="p"
            className="mt-6 max-w-[60ch] text-base leading-relaxed text-body"
          >
            {intro}
          </Reveal>
        ) : null}
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-10">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-medium tracking-tight">{heading}</h2>
      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-body">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-body/40">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Emphasised lead-in for a list item, matching the source documents'
 * "**Term:** explanation" shape. */
export function Term({ children }: { children: ReactNode }) {
  return <span className="font-medium text-fg">{children}</span>;
}
