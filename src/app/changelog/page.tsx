import type { Metadata } from "next";
import { Accordion, Chip } from "@heroui/react";
import { Reveal } from "@/components/reveal";
import { Code, TestTube, Briefcase } from "@phosphor-icons/react/dist/ssr";

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
          Changelog & Roadmap
        </Reveal>
        <Reveal
          delay={0.06}
          as="p"
          className="mt-4 max-w-[46ch] text-base leading-relaxed text-body"
        >
          See what's already here, and where Vivianne is headed.
        </Reveal>
      </section>

      {/* Releases Section */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight mb-8">Releases</h2>
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

      {/* Roadmap Section */}
      <section className="border-t border-hairline bg-surface-soft/20 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight mb-12">Roadmap</h2>
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-4 relative">
              
              {[
                { title: "Coding", icon: Code, status: "Live", body: "Reads codebase, runs tools, remembers." },
                { title: "Science", icon: TestTube, status: "Planned", body: "Literature review & data analysis." },
                { title: "Office Work", icon: Briefcase, status: "Planned", body: "Documents, spreadsheets, admin." },
              ].map((phase, idx, arr) => (
                <div key={phase.title} className="flex-1 flex flex-col items-center text-center relative z-10 w-full max-w-xs mx-auto group">
                  
                  {/* Connecting Line (Only for non-last items) */}
                  {idx !== arr.length - 1 && (
                    <div className="hidden md:block absolute top-[2.25rem] left-[50%] w-full h-px bg-border -z-10" />
                  )}
                  
                  <div className={`size-[4.5rem] rounded-full p-1 ring-1 ring-border/50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[0.98] ${phase.status === 'Live' ? 'bg-foreground' : 'bg-surface-soft'}`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${phase.status === 'Live' ? 'bg-foreground text-background shadow-inner' : 'bg-surface text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'}`}>
                      <phase.icon size={28} weight={phase.status === 'Live' ? 'fill' : 'light'} />
                    </div>
                  </div>

                  <div className="mt-8 p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 w-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                    <div className="bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-5 h-full flex flex-col items-center justify-center">
                      <div className="flex justify-center items-center gap-3 mb-3">
                        <h3 className="font-medium text-base">{phase.title}</h3>
                        <Chip size="sm" color={phase.status === 'Live' ? "default" : "default"} variant={phase.status === 'Live' ? "solid" : "flat"}>{phase.status}</Chip>
                      </div>
                      <p className="text-sm leading-relaxed text-mute">{phase.body}</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
