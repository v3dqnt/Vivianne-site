import Image from "next/image";
import { ArrowUpRight, Plugs, Lightning, FileText } from "@phosphor-icons/react/dist/ssr";
import { Card, Link, buttonVariants } from "@heroui/react";
import { Reveal } from "@/components/reveal";
import { HeroScrollExpand } from "@/components/hero-scroll-expand";

const showcases = [
  {
    id: "subagents",
    eyebrow: "Subagents",
    headline: "Hands off the busywork to a dedicated helper.",
    body: "For a big, self-contained job, like auditing an entire codebase, it spins up a subagent to do just that, running in the background while you keep talking to the main session.",
    image: "/subagents-panel.png",
    width: 1918,
    height: 1023,
    alt: "Vivianne reasoning live through a security audit and handing it off to a subagent, with the Review panel tracking every file touched",
    reverse: false,
  },
  {
    id: "memory",
    eyebrow: "Memory",
    headline: "Remembers you, without you asking it to.",
    body: "Every session quietly turns into facts it can recall later: your preferences, past corrections, the shape of your projects. No \"remember this\" required, and you can always search or turn it off.",
    image: "/memory-panel.png",
    width: 1176,
    height: 860,
    alt: "Vivianne's Memory settings, showing auto-extraction, auto-consolidate, and a searchable list of remembered facts",
    reverse: true,
  },
  {
    id: "programmatic-tools",
    eyebrow: "Programmatic tool calling",
    headline: "Writes a script that runs its own tools, in one step.",
    body: "Instead of one round-trip per tool call, it writes a short script that calls its own tools inline and runs it in-process. Reading twenty files, or chaining several searches before an edit, collapses from twenty steps into one, and every call inside still goes through the same approval you would get otherwise.",
    image: "/subagents-panel.png",
    width: 1918,
    height: 1023,
    alt: "Vivianne running a script that calls several of its own tools inline within a single step",
    reverse: false,
  },
  {
    id: "local",
    eyebrow: "Local inference",
    headline: "Bring your own model, run it on your own machine.",
    body: "Point it at a GGUF file on disk and it runs the model itself: no API key, no internet connection, nothing sent anywhere.",
    image: "/local-models-panel.png",
    width: 1162,
    height: 863,
    alt: "Vivianne's Local models settings, running Qwen2.5-Coder and LFM2.5-VL directly on the machine",
    reverse: true,
  },
];

const extraCells = [
  {
    icon: Plugs,
    title: "Extend it with playbooks",
    body: "Playbooks are drop-in add-ons that give the app new tools and their own panels, for the workflows you do over and over.",
  },
  {
    icon: Lightning,
    title: "Thinks out loud, in real time",
    body: "You watch it reason and work as it happens, not a spinner followed by a wall of text at the end.",
  },
  {
    icon: FileText,
    title: "Hands you a real file",
    body: "Ask for a report, a spreadsheet, or a deck and it writes an actual PDF, Word, Excel, or PowerPoint file you can open, not a wall of text to copy out.",
  },
];

function CtaLink({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        size: "lg",
        className: `group gap-3 pr-2 ${className || ""}`,
      })}
    >
      {label}
      <span className="btn-icon-circle group-hover:bg-foreground group-hover:text-background">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero: text, then a large screenshot below */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <h1 className="max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            One AI for every task on your computer.
          </h1>
          <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-body">
            Vivianne is an AI that works directly on your computer: it
            writes code, runs commands, and gets real things done instead
            of just talking about them. Built for coding today, with
            everyday office and research work on the way.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <CtaLink href="/downloads" label="Download for Windows" />
          </div>
        </div>

        <div className="mt-20">
          <HeroScrollExpand>
            <div className="p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
              <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <Image
                  src="/hero-interface.png"
                  alt="Vivianne's interface mid-task: reasoning, tool calls, and the Review panel showing real file changes"
                  width={1920}
                  height={1080}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </HeroScrollExpand>
        </div>
      </section>

      {/* Under the hood: subagents, memory, local inference */}
      <section className="border-t border-hairline py-32 md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-surface-soft w-max mb-6 block">
            Built to actually finish the job
          </span>
          <Reveal
            as="h2"
            className="mt-6 max-w-[34ch] text-3xl font-medium tracking-tight md:text-4xl"
          >
            More capable than a chat window, and it shows its work.
          </Reveal>

          <div className="mt-20 flex flex-col gap-20 md:gap-28">
            {showcases.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <div
                  className={`flex flex-col gap-10 md:items-center md:gap-16 ${
                    s.reverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-xs font-medium tracking-wide text-mute">{s.eyebrow}</span>
                    <h3 className="mt-2 max-w-[26ch] text-2xl font-medium tracking-tight">
                      {s.headline}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-body">
                      {s.body}
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
                      <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          width={s.width}
                          height={s.height}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-20 md:mt-28">
            <div className="p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
              <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <span className="text-xs font-medium tracking-wide text-mute">Providers</span>
                    <h3 className="mt-2 text-xl font-medium tracking-tight">
                      Anthropic, OpenAI, Google, and a dozen more, plus anything OpenAI-compatible.
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-body">
                      Groq, xAI, DeepSeek, Mistral, Together AI, Fireworks, OpenRouter, Cerebras,
                      NVIDIA NIM, Hugging Face, Cloudflare Workers AI, or a custom endpoint of your
                      own: configure a key once in Settings and switch models mid-session.
                    </p>
                  </div>
                  <div className="w-full md:w-[380px] shrink-0">
                    <Image
                      src="/providers-panel.png"
                      alt="Vivianne's Settings → Providers panel, showing the full list of connected model providers"
                      width={1203}
                      height={893}
                      className="w-full h-auto rounded-[var(--radius-inner)] border border-hairline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {extraCells.map((cell, i) => (
              <Reveal key={cell.title} delay={i * 0.05}>
                <div className="p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                  <div className="flex h-full flex-col gap-6 bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-8">
                    <span className="flex size-11 items-center justify-center rounded-full bg-surface-soft">
                      <cell.icon size={20} weight="light" />
                    </span>
                    <Card.Header className="p-0">
                      <Card.Title className="text-lg">{cell.title}</Card.Title>
                      <Card.Description className="text-body leading-relaxed">{cell.body}</Card.Description>
                    </Card.Header>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        id="download"
        className="scroll-mt-24 border-t border-hairline py-32 md:py-40 min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center">
          <Reveal
            as="h2"
            className="max-w-[22ch] text-4xl font-medium tracking-tight md:text-5xl"
          >
            One AI, for whatever you&apos;re working on next.
          </Reveal>
          <Reveal delay={0.06}>
            <CtaLink href="/downloads" label="Download for Windows" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
