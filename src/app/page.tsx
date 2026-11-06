import NextLink from "next/link";
import {
  AiChipIcon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  Brain02Icon,
  Clock01Icon,
  Cursor01Icon,
  Route01Icon,
  Refresh01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ActionLink } from "@/components/ui/text-link";
import { AcpGlyph } from "@/components/harness-dock/acp-glyph";
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
  rest: string;
  /** A line icon; ACP draws its own instead. */
  icon?: React.ComponentProps<typeof Icon>["icon"];
};

// What Vivianne does today, per the app’s feature list. Built but not yet run
// live, and anything switched off, stays out until it has shipped.
const features: Feature[] = [
  {
    id: "agents",
    lead: "24/7 agents",
    rest: "Always-on assistants with apps, browser, screen, memory, and schedules. Approvals show up inline.",
    icon: Clock01Icon,
  },
  {
    id: "computer",
    status: "Windows",
    lead: "Computer control",
    rest: "UI Automation with a pixel fallback. A notch shows activity and a Stop button.",
    icon: Cursor01Icon,
  },
  {
    id: "models",
    lead: "Any model",
    rest: "Major clouds, any OpenAI-compatible endpoint, your ChatGPT plan, or local llama.cpp.",
    icon: AiChipIcon,
  },
  {
    id: "long-tasks",
    lead: "Tasks that survive",
    rest: "Waits out rate limits, falls back on failing models, retries, and resumes after a restart.",
    icon: Refresh01Icon,
  },
  {
    id: "router",
    status: "Beta",
    lead: "Cost-aware routing",
    rest: "viv-auto picks the model for each step to keep cost down, with usage tracked by model.",
    icon: Route01Icon,
  },
  {
    id: "multiplayer",
    status: "Experimental",
    lead: "Multiplayer",
    rest: "Pair two Vivianne apps and see each other’s agents work, live.",
    icon: UserMultipleIcon,
  },
  {
    id: "memory",
    lead: "Memory and new tools",
    rest: "Recalls your instructions and facts. When no tool fits, it writes, tests, and keeps one.",
    icon: Brain02Icon,
  },
  {
    id: "harnesses",
    status: "In development",
    lead: "Coding agents over ACP",
    rest: "Install agents like Claude Code once, then run them in Vivianne.",
  },
];

const builtIn = "plan mode, a browser extension, MCP, skills, mods, and Git review";

const [latest, ...rest] = releases;
const earlier = rest.slice(0, 3);

const jsonLd = [
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
      "A desktop AI agent for code, math, and science: its own agent with any model, coding agents like Claude Code over ACP, always-on assistants, and computer control.",
    featureList: [
      "24/7 agents with schedules and inline approvals",
      "Computer control on Windows, with a Stop button",
      "Any model: major clouds, OpenAI-compatible endpoints, a ChatGPT plan, or local llama.cpp",
      "Long tasks that wait out rate limits, fall back, retry, and resume",
      "Cost-aware model routing (beta)",
      "Multiplayer pairing (experimental)",
      "Memory and self-written tools",
      "Coding agents over the Agent Client Protocol (in development)",
    ],
  },
];

// Corner marks around an illustration, like crop marks on a drawing.
function Brackets({ children, className }: { children: React.ReactNode; className?: string }) {
  const corner = "absolute size-2.5 border-foreground/35";
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      <span className={`${corner} left-0 top-0 border-l border-t`} aria-hidden />
      <span className={`${corner} right-0 top-0 border-r border-t`} aria-hidden />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} aria-hidden />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} aria-hidden />
      {children}
    </div>
  );
}

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
          {/* Phones have no room beside the copy, so the whole field dims a touch. */}
          <div className="absolute inset-0 bg-background/45 md:hidden" />
          {/* Shades the top edge, so the nav stays readable over bright chrome. */}
          <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_88%,transparent)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_45%,transparent_100%)]" />
        </div>
        <div data-ink className="absolute inset-x-0 top-0 h-[88svh]" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <Reveal as="h1" className="type-display text-foreground">
              The agent harness for code, math, and science.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="type-lead mt-6 max-w-[42ch] text-foreground/80"
            >
              One desktop app for your own agent, coding agents over ACP, and
              assistants that keep working. Any model, your keys.
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

      {/* Features: plain text on drafting paper. A statement, then each
          feature as a quiet column under its drawing. The top padding clears
          the chrome as it melts into the silver. */}
      <section id="features" className="relative overflow-hidden pb-20 pt-[18svh] md:pb-28">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal
            as="h2"
            className="type-h2 mx-auto max-w-[24ch] text-center font-normal"
          >
            One desktop agent for your code, your computer, and your browser, with any model.
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-16 md:mt-20 lg:grid-cols-4">
            {features.map(({ id, icon, ...copy }) => (
              <div key={id} id={id}>
                <FeatureCopy
                  {...copy}
                  art={
                    <Brackets className="size-20 sm:size-28">
                      {icon ? (
                        <Icon icon={icon} size={36} strokeWidth={1} className="text-foreground/75" />
                      ) : (
                        <AcpGlyph />
                      )}
                    </Brackets>
                  }
                />
              </div>
            ))}
          </div>

          <div id="more" className="mt-20">
            <Reveal as="p" className="type-body mx-auto max-w-[60ch] text-center text-muted-foreground">
              Also built in: <span className="text-foreground/85">{builtIn}</span>.
            </Reveal>
          </div>
        </div>
      </section>

      {/* What’s new: the latest release on a metal plate, the ones before it
          as plain text beside it. */}
      <section id="updates" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal as="h2" className="type-h2">
              What’s new
            </Reveal>
            <ActionLink href="/changelog">
              Full Changelog
              <Icon icon={ArrowRight02Icon} size={16} />
            </ActionLink>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
            <Reveal>
              <NextLink href="/changelog" className="block no-underline">
                <MetalCard>
                  <div className="flex min-h-56 flex-col p-4 md:p-6">
                    <p className="type-small text-muted-foreground tabular-nums">
                      {latest.version}, {formatReleaseDate(latest.date)}
                    </p>
                    <p className="type-h3 mt-3 max-w-[22ch] text-foreground">
                      {latest.title}
                    </p>
                    <span className="type-small mt-auto inline-flex items-center gap-1.5 pt-8 font-medium text-foreground">
                      Read the release notes
                      <Icon icon={ArrowRight02Icon} size={16} />
                    </span>
                  </div>
                </MetalCard>
              </NextLink>
            </Reveal>

            <ol className="flex flex-col gap-7">
              {earlier.map((r, i) => (
                <li key={r.id}>
                  <Reveal delay={0.08 * (i + 1)}>
                    <NextLink href="/changelog" className="group block no-underline">
                      <span className="type-small block text-muted-foreground tabular-nums">
                        {r.version}, {formatReleaseDate(r.date)}
                      </span>
                      <span className="type-body mt-1 block font-medium text-foreground underline-offset-4 group-hover:underline">
                        {r.title}
                      </span>
                    </NextLink>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The last word: silver falls away into the beams, with the mark in
          liquid metal. The 1px clip at each edge hides the seam the composited
          canvas leaves on a fractional pixel row. */}
      <section
        id="download"
        data-sound-shimmer
        className="ink-tokens relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background [clip-path:inset(1px_0_1px_0)]"
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
        {/* A soft pool of shade behind the copy keeps it clear of the brightest beams. */}
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_44%_38%_at_50%_56%,color-mix(in_oklab,var(--background)_82%,transparent)_0%,transparent_100%)]"
          aria-hidden
        />
        <div data-ink className="absolute inset-x-0 bottom-0 top-[20svh]" aria-hidden />
        <div className="flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          <div className="size-32 md:size-40" aria-hidden>
            <MetallicPaint imageSrc="/vivianne-mark.png" color="#e6e7ea" scale={0.9} speed={0.7} mouseTilt={0.4} dpr={1.5} />
          </div>
          <Reveal
            as="h2"
            className="type-h1 mt-8"
          >
            One harness. Every side of the work.
          </Reveal>
          <Reveal as="p" delay={0.1} className="type-body mt-5 text-muted-foreground">
            Windows and macOS today. Linux is on the way.
          </Reveal>
          <Reveal delay={0.2} className="mt-9">
            <CtaLink href="/downloads" label="Download for Windows & macOS" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
