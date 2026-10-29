import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Briefcase01Icon, SourceCodeIcon, TestTube01Icon } from "@hugeicons/core-free-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { releases, formatReleaseDate } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every release of Vivianne, in order.",
};

// Notes are plain text except for `inline code`, which is set in a mono chip.
function renderNote(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.9em] text-foreground"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

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
          See what&apos;s already here, and where Vivianne is headed.
        </Reveal>
      </section>

      {/* Releases Section */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight mb-8">Releases</h2>
            <Accordion type="single" collapsible defaultValue="v1-9-0" className="flex flex-col gap-2.5">
              {releases.map((release) => (
                <AccordionItem key={release.id} value={release.id} id={release.id}>
                  <AccordionTrigger>
                    <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium">{release.version}</span>
                      <Badge variant={release.status === "Current" ? "default" : "outline"}>
                        {release.status}
                      </Badge>
                      <span className="text-sm font-normal text-muted-foreground">
                        {formatReleaseDate(release.date)}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-foreground/85">{release.summary}</p>
                    <ul className="mt-4 flex list-disc flex-col gap-2 pl-4 marker:text-muted-foreground/60">
                      {release.notes.map((note) => (
                        <li key={note}>{renderNote(note)}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="border-t border-hairline py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight mb-12">Roadmap</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { title: "Coding", icon: SourceCodeIcon, status: "Live", body: "Reads your codebase, runs tools, remembers." },
                { title: "Science", icon: TestTube01Icon, status: "Live", body: "Chemical structures, molecules, biology diagrams, and physics graphs in chat." },
                { title: "Office work", icon: Briefcase01Icon, status: "Live", body: "Real PDF, Word, Excel, and PowerPoint files, written on request." },
              ].map((phase) => (
                <div key={phase.title} className="surface-card flex flex-col gap-4 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                      <Icon icon={phase.icon} size={18} />
                    </span>
                    <Badge variant={phase.status === "Live" ? "default" : "outline"}>{phase.status}</Badge>
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{phase.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
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
