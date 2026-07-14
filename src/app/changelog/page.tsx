import type { Metadata } from "next";
import { Accordion, Chip } from "@heroui/react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Changelog, Vivianne",
  description: "Every release of Vivianne, in order.",
};

const releases = [
  {
    id: "v1",
    version: "v1.0",
    status: "Current",
    summary: "Initial release: the coding agent, the memory pipeline, and the multi-provider harness.",
    notes: [
      "A single tool-use loop: propose, run, verify, with a hard step ceiling.",
      "Three-tier memory pipeline: auto-capture, L1 fact extraction, L3 persona synthesis.",
      "Bounded delegation, one level deep, always traceable in the session log.",
      "One harness across model providers, with automatic context compaction.",
      "Runs on cloud model providers, with the SSM-MoE local architecture in development.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-40 pb-16 md:pt-48">
        <Reveal
          as="h1"
          className="text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl"
        >
          Changelog
        </Reveal>
        <Reveal
          delay={0.06}
          as="p"
          className="mt-4 max-w-[46ch] text-base leading-relaxed text-body"
        >
          Every release of Vivianne, in order.
        </Reveal>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal>
            <Accordion defaultExpandedKeys={["v1"]}>
              {releases.map((release) => (
                <Accordion.Item key={release.id} id={release.id}>
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full">
                      <span className="flex flex-1 items-center gap-3 text-left">
                        <span className="text-base font-medium">
                          {release.version}
                        </span>
                        <Chip size="sm">{release.status}</Chip>
                      </span>
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="text-sm leading-relaxed text-body">
                        {release.summary}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {release.notes.map((note) => (
                          <li
                            key={note}
                            className="text-sm leading-relaxed text-body"
                          >
                            {note}
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
