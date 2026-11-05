import NextLink from "next/link";
import { ArrowDown01Icon, ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ActionLink } from "@/components/ui/text-link";
import { HarnessDock } from "@/components/harness-dock/harness-dock";
import { Reveal } from "@/components/reveal";
import { FeatureCopy } from "@/components/feature-copy";
import { MetalCard } from "@/components/metal-card";
import LiquidChrome from "@/components/liquid-chrome/LiquidChrome";
import Beams from "@/components/beams/Beams";
import MetallicPaint from "@/components/metallic-paint/MetallicPaint";
import { releases, formatReleaseDate } from "@/lib/releases";

type Feature = {
  id: string;
  status?: string;
  lead: string;
  rest?: string;
  /** Names shown as chips; product and tool names, so never auto-translated. */
  chips?: string[];
  /** Where it sits in the 12-column bento. */
  cell: string;
};

// What Vivianne does today, per the app's feature list. Built but not yet run
// live, and anything switched off, stays out until it has shipped.
const features: Feature[] = [
  {
    id: "harnesses",
    status: "In development",
    lead: "Coding agents over ACP",
    rest: "Install agents like Claude Code once, then run them in Vivianne.",
    cell: "lg:col-span-6 lg:row-span-2",
  },
  {
    id: "agents",
    lead: "24/7 agents",
    rest: "Always-on assistants with apps, browser, screen, memory, and schedules. Approvals show up inline.",
    cell: "lg:col-span-3",
  },
  {
    id: "computer",
    status: "Windows",
    lead: "Computer control",
    rest: "UI Automation with a pixel fallback. A notch shows activity and a Stop button.",
    cell: "lg:col-span-3",
  },
  {
    id: "models",
    lead: "Any model",
    rest: "Major clouds, any OpenAI-compatible endpoint, your ChatGPT plan, or local llama.cpp.",
    cell: "lg:col-span-3",
  },
  {
    id: "long-tasks",
    lead: "Tasks that survive",
    rest: "Waits out rate limits, falls back on failing models, retries, and resumes after a restart.",
    cell: "lg:col-span-3",
  },
  {
    id: "plan",
    lead: "Plan mode",
    rest: "Research and a plan you can comment on, before anything changes.",
    cell: "lg:col-span-3",
  },
  {
    id: "browser",
    lead: "Your own browser",
    rest: "Works in any Chromium browser through the extension.",
    cell: "lg:col-span-3",
  },
  {
    id: "memory",
    lead: "Memory and new tools",
    rest: "Recalls your instructions and facts. When no tool fits, it writes, tests, and keeps one.",
    cell: "lg:col-span-3",
  },
  {
    id: "files",
    lead: "Files in the app",
    rest: "Preview code, media, 3D, PDF, and CSV. Edit Office documents.",
    cell: "lg:col-span-3",
  },
  {
    id: "more",
    lead: "Also built in",
    chips: ["MCP", "Skills", "Mods", "Git review", "Multiplayer", "viv-auto (beta)"],
    cell: "lg:col-span-12",
  },
];

const highlights = [
  {
    title: "A command line, cost-aware routing, and a vault",
    body: "v1.9 adds viv for running local models with no window, routes background work to a small model, and keeps secrets in your keychain.",
    meta: `Release · ${formatReleaseDate(releases[0].date)}`,
    href: "/changelog",
  },
  {
    title: "Multiplayer",
    body: "Pair two Vivianne apps peer-to-peer and see each other’s agent work live.",
    meta: "Product · Experimental",
    href: "#more",
  },
  {
    title: "Labs: gesture control",
    body: "Hands-free gesture control is the latest experiment in Labs.",
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
      "A week of work handed to Vivianne, a desktop AI agent: fixing a checkout bug, working out maths, and running local models.",
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
      "A desktop agent harness: its own coding agent with your keys and 25+ providers, 24/7 agents with routines, multiplayer, and other agent harnesses over the Agent Client Protocol.",
    featureList: [
      "Bring your own key: 25+ providers, custom endpoints, and local models",
      "24/7 agents with routines, a messenger chat, and approval cards",
      "Multiplayer: two Vivianne apps paired peer-to-peer",
      "Plan mode with versioned plans and parallel steps",
      "Per-assignment review, undo, and file checkpoints",
      "Programmatic tool calling and speculative execution",
      "Cost-aware model routing",
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

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero: liquid chrome that runs on past the fold and melts into the
          silver page, so there is no edge between the two. */}
      <section id="top" data-sound-dissolve className="ink-tokens relative flex min-h-[100svh] items-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[120svh] bg-background [mask-image:linear-gradient(180deg,#000_60%,transparent_100%)]"
          aria-hidden
        >
          <LiquidChrome color="#e6e7ea" speed={0.14} roughness={0.22} maxDevicePixelRatio={1.5} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--background)_78%,transparent)_0%,color-mix(in_oklab,var(--background)_45%,transparent)_42%,transparent_72%)]" />
          {/* Shades the top edge, so the nav stays readable over bright chrome. */}
          <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_88%,transparent)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_45%,transparent_100%)]" />
        </div>
        <div data-ink className="absolute inset-x-0 top-0 h-[88svh]" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <Reveal as="h1" className="text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-balance text-foreground md:text-7xl">
              The agent harness for code, math, and science.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-[46ch] text-base font-medium leading-relaxed text-pretty text-foreground/80 md:text-lg"
            >
              Run <span translate="no">Vivianne</span>’s own agent on your own keys,
              bring in other harnesses over ACP, keep agents working around the
              clock, and build with a partner, all from one desktop app.
            </Reveal>
            <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-3">
              <CtaLink href="/downloads" label="Download for Windows & macOS" />
              <NextLink href="#features" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Explore the Features
                <Icon icon={ArrowDown01Icon} size={16} />
              </NextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product trailer: a 1080p web encode of the 4K master, with the
          end card as its poster. The top padding clears the chrome as it
          melts into the silver. */}
      <section id="video" className="relative pb-8 pt-[18svh] md:pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
          <Frame>
            <video
              className="block aspect-video w-full bg-background"
              src="/video/vivianne-trailer-1080p.mp4"
              poster="/video/vivianne-trailer-poster.jpg"
              controls
              playsInline
              preload="metadata"
              aria-label="Vivianne trailer: a week of work handed to an AI agent, from fixing a checkout bug to running local models"
            />
          </Frame>
          </Reveal>
        </div>
      </section>

      {/* Features: one compact bento of metal plates. */}
      <section id="features" className="relative py-16 md:py-20">
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal as="h2" className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">
            Beyond the basics.
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-8 lg:grid-cols-12">
            {features.map(({ id, cell, ...copy }, i) => (
              <div
                key={id}
                id={id}
                className={`${cell} ${id === "harnesses" || id === "more" ? "sm:col-span-2" : ""}`}
              >
                <Reveal delay={i * 0.04} className="h-full">
                  <MetalCard>
                    {id === "harnesses" ? (
                      <div className="grid h-full items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
                        <FeatureCopy {...copy} />
                        <HarnessDock />
                      </div>
                    ) : (
                      <FeatureCopy {...copy} />
                    )}
                  </MetalCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates: product highlights on the left, the latest releases on
          the right. */}
      <section id="updates" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Updates</h2>
            <ActionLink href="/changelog">
              Full Changelog
              <Icon icon={ArrowRight02Icon} size={16} />
            </ActionLink>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col gap-3">
              {highlights.map((h) => (
                <NextLink key={h.title} href={h.href} className="block no-underline">
                  <MetalCard>
                    <span className="block text-base font-medium text-foreground">{h.title}</span>
                    <span className="mt-1 block max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{h.body}</span>
                    <span className="mt-4 block text-xs text-muted-foreground">{h.meta}</span>
                  </MetalCard>
                </NextLink>
              ))}
            </div>

            <div>
              <h3 className="text-xs text-muted-foreground">Releases</h3>
              <ol className="mt-3 flex flex-col">
                {releases.slice(0, 4).map((r) => (
                  <li key={r.id}>
                    <NextLink href="/changelog" className="group block py-3.5 no-underline">
                      <span className="block text-xs text-muted-foreground tabular-nums">
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
                Download the Latest Release
                <Icon icon={ArrowRight02Icon} size={16} />
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* The last word: silver falls away into the beams, with the mark in
          liquid metal. */}
      <section
        id="download"
        data-sound-shimmer
        className="ink-tokens relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
      >
        <div className="absolute inset-0 -z-10" aria-hidden>
          <Beams color="#d9dbde" backgroundColor="#09090b" rotation={32} speed={0.8} quality={0.45} dpr={1} grain={0} />
        </div>
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[32svh] bg-[linear-gradient(180deg,var(--silver),transparent)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-[22svh] bg-[linear-gradient(0deg,var(--background),transparent)]"
          aria-hidden
        />
        <div data-ink className="absolute inset-x-0 bottom-0 top-[20svh]" aria-hidden />
        <div className="flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          <div className="size-32 md:size-40" aria-hidden>
            <MetallicPaint imageSrc="/vivianne-mark.png" color="#e6e7ea" scale={0.9} speed={0.7} mouseTilt={0.4} dpr={1.5} />
          </div>
          <Reveal
            as="h2"
            className="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-balance md:text-6xl"
          >
            One harness. Every side of the work.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-sm text-muted-foreground">
            Windows and macOS today · Linux on the way
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <CtaLink href="/downloads" label="Download for Windows & macOS" />
            <ActionLink href="/changelog">
              Read the Changelog
              <Icon icon={ArrowRight02Icon} size={16} />
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
