import Image from "next/image";
import NextLink from "next/link";
import {
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  AtomIcon,
  CpuIcon,
  File01Icon,
  MathIcon,
  Plug01Icon,
  SourceCodeIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ActionLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/reveal";
import { HeroWaves } from "@/components/hero-waves";
import { releases, formatReleaseDate } from "@/lib/releases";

const peers = [
  {
    name: "You",
    initial: "Y",
    activity: ["edited src/ipc/types.ts", "ran cargo check", "3 of 5 tasks done"],
  },
  {
    name: "Your pair",
    initial: "P",
    activity: ["edited ChatView.tsx", "ran npm run build", "2 of 4 tasks done"],
  },
];

const multiplayerPoints = [
  "Pair with a short code. Direct, encrypted peer-to-peer, no account or server in the middle.",
  "Follow your pair's session as it happens, turn by turn.",
  "Chat with your pair, send code snippets, and divide up the work.",
];

const disciplines = [
  {
    icon: SourceCodeIcon,
    title: "Coding",
    status: "Live",
    keyword: "AI coding agent",
    body: "Reads your whole codebase, edits across files, runs builds and tests in a real terminal, and shows every diff in a Review panel before you keep it.",
  },
  {
    icon: MathIcon,
    title: "Mathematics",
    status: "Live",
    keyword: "AI agent for math",
    body: "Works a problem the way you would: sets it up, writes and runs code to check each step numerically, and plots the result instead of guessing at it.",
  },
  {
    icon: AtomIcon,
    title: "Science",
    status: "Live",
    keyword: "AI for scientific research",
    body: "Literature review, data analysis, and reproducible experiments, orchestrating the scientific tools you already use rather than replacing them.",
  },
  {
    icon: CpuIcon,
    title: "Technology",
    status: "Live",
    keyword: "AI agent for developers",
    body: "Terminal, browser, MCP servers and your file system as first-class tools, with an approval step on anything that touches your machine.",
  },
];

const extraCells = [
  {
    icon: ZapIcon,
    title: "Programmatic tool calling",
    body: "Instead of one round-trip per tool, it writes a short script that calls its own tools inline. Twenty file reads collapse into one step, and every call still goes through your approval.",
  },
  {
    icon: Plug01Icon,
    title: "Extend it with playbooks",
    body: "Drop-in add-ons that give the app new tools and their own panels, for the workflows you repeat.",
  },
  {
    icon: File01Icon,
    title: "Hands you a real file",
    body: "Ask for a report, spreadsheet, or deck and it writes an actual PDF, Word, Excel, or PowerPoint file.",
  },
];

const providers = [
  "Anthropic",
  "OpenAI",
  "Google",
  "Groq",
  "xAI",
  "DeepSeek",
  "Mistral",
  "Together AI",
  "Fireworks",
  "OpenRouter",
  "Cerebras",
  "NVIDIA NIM",
  "Hugging Face",
  "Cloudflare Workers AI",
  "Local GGUF",
  "Any OpenAI-compatible API",
];

const highlights = [
  {
    title: "Master and employee agents",
    body: "Hand a project to a master agent and it staffs a team of specialists that do the work or run swarms, all reporting back to one place.",
    meta: "Product · Live",
    href: "#agents",
  },
  {
    title: "Multiplayer is live",
    body: "Pair two Vivianne instances with a short code, follow each other's agent sessions, and split the work in one shared chat.",
    meta: "Product · Live",
    href: "#multiplayer",
  },
  {
    title: "Labs: voice and gesture control",
    body: "Viv Instant, an always-on-top voice overlay, and hands-free gesture control are the latest experiments in Labs.",
    meta: "Labs · Experimental",
    href: "/labs",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vivianne trailer",
    description:
      "A week of work handed to Vivianne, a desktop AI agent: fixing a checkout bug, running a team of specialist agents, working out maths, and running local models.",
    thumbnailUrl: "https://vivianne.dev/video/vivianne-trailer-poster.jpg",
    contentUrl: "https://vivianne.dev/video/vivianne-trailer-1080p.mp4",
    uploadDate: "2026-10-02",
    duration: "PT60S",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Vivianne",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS",
    url: "https://vivianne.dev",
    downloadUrl: "https://vivianne.dev/downloads",
    image: "https://vivianne.dev/hero-interface.png",
    description:
      "A desktop AI agent and agentic harness for coding, math, science, and technology work, with subagents, persistent memory, and support for any model provider or local GGUF models.",
    featureList: [
      "AI coding agent with a real terminal",
      "Master agent that plans and delegates to a team of employee agents",
      "Employee agents that work alone or run agent swarms",
      "Subagents for background tasks",
      "Persistent memory",
      "Programmatic tool calling",
      "Local GGUF model inference, fully offline",
      "Anthropic, OpenAI, Google and OpenAI-compatible providers",
    ],
  },
];

function CtaLink({ href, label }: { href: string; label: string }) {
  return (
    <NextLink href={href} className={buttonVariants({ size: "lg", className: "group" })}>
      {label}
      <Icon
        icon={ArrowUpRight01Icon}
        size={16}
        className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-premium)] group-hover:-translate-y-px group-hover:translate-x-px"
      />
    </NextLink>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="surface-card rounded-xl p-1.5">
      <div className="overflow-hidden rounded-md bg-background">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <Badge variant="outline">{children}</Badge>;
}

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero: a monochrome shape field with the headline sitting in a
          calm clearing at its centre. */}
      <section id="top" className="relative isolate flex min-h-[88svh] items-center overflow-hidden md:min-h-[100dvh]">
        <div className="absolute inset-0 -z-10">
          <HeroWaves />
        </div>
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(38%_42%_at_50%_50%,#0a0a0a_30%,rgba(10,10,10,0.85)_55%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-canvas"
          aria-hidden
        />

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-28 pb-16 text-center md:pb-20">
          <h1 className="max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
            The agent harness for{" "}
            <span className="text-white/45">code, math, and science.</span>
          </h1>
          <p className="mt-8 max-w-[50ch] text-base leading-relaxed text-body md:text-lg">
            Vivianne turns any capable language model into an AI agent that
            works on your computer: it runs code in a real terminal, delegates
            to subagents, and remembers your projects, with the model of your
            choice or one running locally.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href="/downloads" label="Download for Windows & macOS" />
            <NextLink href="#agents" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Meet the agent team
              <Icon icon={ArrowDown01Icon} size={16} />
            </NextLink>
          </div>
        </div>
      </section>

      {/* Product trailer: a 1080p web encode of the 4K master, with the
          end card as its poster. */}
      <section id="video" className="relative pb-20 md:pb-36">
        <div className="mx-auto max-w-6xl px-6">
          <Frame>
            <video
              className="block aspect-video w-full bg-background"
              src="/video/vivianne-trailer-1080p.mp4"
              poster="/video/vivianne-trailer-poster.jpg"
              controls
              playsInline
              preload="metadata"
              aria-label="Vivianne trailer: a week of work handed to an AI agent, from fixing a checkout bug to running a team of specialist agents"
            />
          </Frame>
        </div>
      </section>

      {/* Master and employee agents: statement on the left, the Agents
          panel on a tinted backdrop on the right, flush with the edge. */}
      <section id="agents" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="surface-card grid grid-cols-1 overflow-hidden rounded-xl lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)]">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <Reveal as="h2" className="max-w-[24ch] text-xl font-medium leading-snug tracking-tight md:text-2xl">
                <span className="text-ink">A master that runs the team.</span>{" "}
                <span className="text-body">
                  Hand off the project and it staffs specialist agents that do
                  the work or run swarms, while you make the decisions.
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <ActionLink href="/faq" className="mt-8">
                  How master and employee agents work
                  <Icon icon={ArrowRight02Icon} size={16} />
                </ActionLink>
              </Reveal>
            </div>

            <div className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_0%_0%,#343434_0%,#232323_45%,#181818_100%)] py-6 pl-5 md:py-14 md:pl-14">
              <div className="overflow-hidden rounded-l-md border border-r-0 border-border shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <Image
                  src="/agents-team.png"
                  alt="Vivianne's Agents panel: a Project Versa Lead master agent with a team of four employee agents (Build & Tooling, Quality & Evaluation, Renderer, and Runtime Integration engineers), each scoped to its own files and tools and reporting to the master"
                  width={1512}
                  height={1013}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Multiplayer: an illustrative pairing panel on the left, the
          pitch on the right (mirrors the agents panel above). */}
      <section id="multiplayer" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="surface-card grid grid-cols-1 overflow-hidden rounded-xl lg:grid-cols-[minmax(0,9fr)_minmax(0,5fr)]">
            <div className="order-2 bg-[radial-gradient(120%_90%_at_100%_0%,#343434_0%,#232323_45%,#181818_100%)] p-6 md:p-12 lg:order-1">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-hidden>
                {peers.map((peer) => (
                  <div key={peer.name} className="rounded-xl border border-border bg-background p-4 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-[11px]">
                          {peer.initial}
                        </span>
                        {peer.name}
                      </span>
                      <Badge variant="outline">
                        <span className="size-1.5 rounded-full bg-foreground/70" />
                        Connected
                      </Badge>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">Agent activity</p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {peer.activity.map((line) => (
                        <li key={line} className="truncate rounded-md border border-border/40 bg-foreground/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-foreground/75">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border bg-background p-4" aria-hidden>
                <p className="text-xs text-muted-foreground">Pair chat</p>
                <div className="mt-3 flex flex-col gap-2 text-[13px]">
                  <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2 text-foreground">
                    I&apos;ll take the renderer. Can yours own the Rust side?
                  </p>
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground">
                    Deal. Mine&apos;s already on the IPC types.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col justify-center p-8 md:p-12 lg:order-2">
              <Badge variant="outline">Live</Badge>
              <Reveal as="h2" className="mt-5 max-w-[24ch] text-xl font-medium leading-snug tracking-tight md:text-2xl">
                <span className="text-ink">Multiplayer.</span>{" "}
                <span className="text-body">
                  Pair two Vivianne instances and build together: see what the
                  other agent did, and split the work in one shared chat.
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-8 flex flex-col gap-3">
                  {multiplayerPoints.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink-strong">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-ink" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="border-t border-hairline py-20 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>Built for STEM work</Eyebrow>
          <Reveal as="h2" className="mt-6 max-w-[30ch] text-3xl font-medium tracking-tight md:text-5xl">
            One AI agent for coding, mathematics, science, and technology.
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-body">
              Same harness, same tools, same memory, whatever the problem is.
              Coding, mathematics, and science are all live today, on one agent.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05} className="h-full">
                <article className="surface-card flex h-full flex-col rounded-xl p-6 transition-transform duration-[var(--dur-base)] ease-[var(--ease-premium)] hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                      <Icon icon={d.icon} size={18} />
                    </span>
                    <Badge variant={d.status === "Live" ? "default" : "outline"}>{d.status}</Badge>
                  </div>
                  <h3 className="mt-6 text-base font-medium">{d.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground/70">{d.keyword}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* More capabilities, continuing the STEM section above */}
      <section className="-mt-12 pb-20 md:-mt-24 md:pb-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {extraCells.map((cell, i) => (
              <Reveal key={cell.title} delay={i * 0.05} className="h-full">
                <div className="surface-card flex h-full flex-col gap-6 rounded-xl p-6">
                  <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Icon icon={cell.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{cell.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cell.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="border-t border-hairline py-20 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Any model, cloud or local</Eyebrow>
            <Reveal as="h2" className="mt-6 max-w-[20ch] text-3xl font-medium tracking-tight md:text-4xl">
              Bring the model. Or run it on your own machine.
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-body">
                Configure a key once in Settings and switch models mid-session.
                Or skip the key entirely: point Vivianne at a GGUF file on disk
                and it runs the model itself, fully offline, with nothing sent
                anywhere.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {providers.map((p) => (
                  <li
                    key={p}
                    className="inline-flex h-7 items-center rounded-md border border-border/40 bg-foreground/[0.03] px-2.5 text-xs text-foreground/75"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Frame>
              <Image
                src="/providers-panel.png"
                alt="Vivianne's Settings → Providers panel, showing the full list of connected model providers"
                width={1203}
                height={893}
                className="h-auto w-full"
              />
            </Frame>
          </Reveal>
        </div>
      </section>

      {/* Updates: product highlights on the left, the latest releases on
          the right. */}
      <section id="updates" className="scroll-mt-24 border-t border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Updates</h2>
            <ActionLink href="/changelog">
              Full changelog
              <Icon icon={ArrowRight02Icon} size={16} />
            </ActionLink>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col gap-2.5">
              {highlights.map((h) => (
                <NextLink
                  key={h.title}
                  href={h.href}
                  className="surface-card block rounded-xl px-5 py-4 no-underline transition-colors duration-[var(--dur-fast)] hover:bg-accent/60"
                >
                  <span className="block text-base font-medium text-foreground">{h.title}</span>
                  <span className="mt-1 block max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{h.body}</span>
                  <span className="mt-4 block text-xs text-muted-foreground">{h.meta}</span>
                </NextLink>
              ))}
            </div>

            <div>
              <h3 className="text-xs text-muted-foreground">Releases</h3>
              <ol className="mt-3 flex flex-col">
                {releases.slice(0, 4).map((r) => (
                  <li key={r.id} className="border-t border-hairline first:border-t-0">
                    <NextLink href="/changelog" className="group block py-3.5 no-underline">
                      <span className="block text-xs text-muted-foreground">
                        {formatReleaseDate(r.date)} · {r.version}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-ink group-hover:underline">
                        {r.title}
                      </span>
                    </NextLink>
                  </li>
                ))}
              </ol>
              <ActionLink href="/downloads" className="mt-4">
                Download the latest release
                <Icon icon={ArrowRight02Icon} size={16} />
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        id="download"
        className="relative scroll-mt-24 overflow-hidden border-t border-hairline bg-[radial-gradient(45%_55%_at_50%_45%,rgba(247,247,247,0.05),transparent_75%)] py-24 md:py-48"
      >
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center">
          <div className="viv-orb size-20" aria-hidden />
          <Reveal as="h2" className="max-w-[20ch] text-4xl font-medium tracking-tight md:text-6xl">
            Put a real agent on your desktop.
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col items-center gap-4">
            <CtaLink href="/downloads" label="Download for Windows & macOS" />
            <span className="text-xs text-muted-foreground">Windows and macOS today · Linux on the way</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
