import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Vivianne: what an agent harness is, multiplayer, the vault, supported models, and running local models offline.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-12 md:pt-48">
        <Reveal as="h1" className="text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
          Frequently asked questions
        </Reveal>
        <Reveal delay={0.06} as="p" className="mt-4 max-w-[52ch] text-base leading-relaxed text-body">
          How Vivianne works, what it runs on, and what&apos;s coming next.
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28 md:pb-36">
        <Accordion type="single" collapsible defaultValue={faqs[0].q} className="flex flex-col gap-2.5">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger as="h2">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-sm text-body">
          Something else?{" "}
          <a href="mailto:hello@vivianne.dev" className="font-medium text-foreground underline-offset-4 hover:underline">
            hello@vivianne.dev
          </a>
        </p>
      </section>
    </div>
  );
}
