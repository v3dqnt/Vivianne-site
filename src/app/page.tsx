import {
  ArrowRight,
  ArrowUpRight,
  Browser,
  ChatCircleText,
  Cpu,
  FileText,
  GitDiff,
  Lightning,
  ListChecks,
  LockKey,
  Plugs,
  ShieldCheck,
  Stack,
  Terminal,
  TreeStructure,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import NextLink from "next/link";
import { Link, buttonVariants } from "@heroui/react";
import { Reveal } from "@/components/reveal";
import { HeroScrollExpand } from "@/components/hero-scroll-expand";
import { WindowFrame } from "@/components/window-frame";
import { releases } from "@/lib/releases";

// Figures below are counted from the app itself (tool schemas, provider
// integrations, built-in subagent profiles), not rounded up for effect.
const stats = [
  { value: "62", label: "built-in tools, from shell to browser" },
  { value: "15+", label: "model providers, plus any OpenAI-compatible endpoint" },
  { value: "5", label: "specialist subagents that work in the background" },
  { value: "0", label: "bytes sent anywhere when you run a local model" },
];

const pillars = [
  {
    icon: Lightning,
    title: "Capable",
    body: "It edits code, drives a real terminal and browser, and hands back finished PDF, Word, Excel and PowerPoint files. It does the task rather than describing how you could.",
  },
  {
    icon: LockKey,
    title: "Private",
    body: "Runs on your machine. Talk to a provider directly with your own key, or run a GGUF model locally and nothing leaves the computer at all.",
  },
  {
    icon: Plugs,
    title: "Open",
    body: "Any model from any major provider, switchable mid-session. Extend it with playbooks that add tools and panels for the workflows you repeat.",
  },
];

const steps = [
  {
    icon: ChatCircleText,
    title: "Describe the outcome",
    body: "Ask in plain language. For bigger jobs it lays out a plan and a goal before touching anything.",
  },
  {
    icon: ShieldCheck,
    title: "It works, you approve",
    body: "Reads run freely. Writes, shell commands and other side effects wait for your approval unless you choose otherwise.",
  },
  {
    icon: GitDiff,
    title: "Review what changed",
    body: "Every file it touched lands in the Review panel as a real diff, staged and unstaged, ready to keep or revert.",
  },
];

const showcases = [
  {
    id: "subagents",
    eyebrow: "Subagents",
    headline: "Hand the busywork to a dedicated helper.",
    body: "For a large, self-contained job, like auditing an entire codebase, it starts a subagent that runs in the background while you keep working with the main session. Code review, debugging, tests, web research and docs each have a specialist with its own tool allowlist.",
    image: "/subagents-panel.png",
    width: 1918,
    height: 1023,
    alt: "Vivianne reasoning through a security audit and handing it off to a subagent, with the Review panel tracking every file touched",
  },
  {
    id: "memory",
    eyebrow: "Memory",
    headline: "Remembers how you work, without being told.",
    body: "Sessions quietly turn into facts it can recall later: your preferences, past corrections, the shape of your projects. Every fact is searchable, and the whole thing can be switched off.",
    image: "/memory-panel.png",
    width: 1176,
    height: 860,
    alt: "Vivianne's Memory settings, showing auto-extraction, auto-consolidate, and a searchable list of remembered facts",
  },
  {
    id: "local",
    eyebrow: "Local inference",
    headline: "Bring your own model, and keep it on your machine.",
    body: "Point it at a GGUF file on disk and it runs the model itself: no API key, no internet connection, nothing sent anywhere.",
    image: "/local-models-panel.png",
    width: 1162,
    height: 863,
    alt: "Vivianne's Local models settings, running Qwen2.5-Coder and LFM2.5-VL directly on the machine",
  },
];

const capabilities = [
  { icon: Terminal, title: "Persistent terminals", body: "Real PTY sessions that survive across steps: an activated venv, a running dev server." },
  { icon: Browser, title: "Browser control", body: "Snapshots, clicks, typing and console reads in a real browser, shown live in the Preview panel." },
  { icon: FileText, title: "Real documents", body: "PDF, DOCX, XLSX and PPTX output. Spreadsheets keep numbers numeric, so they add up." },
  { icon: Stack, title: "Isolated sandbox", body: "Untrusted code runs in a Docker container with no network and capped memory, CPU and processes." },
  { icon: ListChecks, title: "Plans and goals", body: "A stated objective and a checklist that survive long tasks and context compaction." },
  { icon: Cpu, title: "Vision with OCR fallback", body: "Models that can see get the pixels. Models that can't still get the text." },
  { icon: TreeStructure, title: "Playbooks", body: "Drop-in add-ons that bring new tools and their own panels into the app." },
  { icon: UsersThree, title: "Accounts", body: "Optional sign-in, with the session kept in your OS credential store. Multiplayer pairing is in early testing." },
];

const providers = [
  "Anthropic",
  "OpenAI",
  "Google Gemini",
  "Amazon Bedrock",
  "xAI",
  "Mistral",
  "DeepSeek",
  "Groq",
  "Cerebras",
  "Together AI",
  "Fireworks",
  "OpenRouter",
  "NVIDIA NIM",
  "Hugging Face",
  "Cloudflare Workers AI",
  "Local GGUF",
];

const latest = releases[0];

function PrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={buttonVariants({ size: "lg", className: "group gap-3 pr-2 no-underline" })}>
      {label}
      <span className="btn-icon-circle">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </Link>
  );
}

function SecondaryCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-ink no-underline"
    >
      {label}
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">{eyebrow}</span>
      <Reveal as="h2" className="mt-3 text-3xl font-medium tracking-tight md:text-[2.5rem] md:leading-[1.15]">
        {title}
      </Reveal>
      {body && <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-body">{body}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="sky-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="sky-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Link
              href="/changelog"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-white/80 py-1 pl-1 pr-3 text-xs text-body no-underline backdrop-blur"
            >
              <span className="rounded-full bg-ocean px-2 py-0.5 font-medium text-white">{latest.version}</span>
              Documents, auto-update and more
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <h1 className="mt-7 text-4xl font-medium leading-[1.05] tracking-tight md:text-[4.25rem]">
              The AI workspace that does the work, on your machine.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-body">
              Vivianne is a desktop AI agent that writes code, runs commands, drives a browser and
              produces finished documents, using the model you choose, with every change shown
              to you for review.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <PrimaryCta href="/downloads" label="Download for Windows" />
              <SecondaryCta href="#how-it-works" label="See how it works" />
            </div>
            <p className="mt-5 text-xs text-mute">Windows 10 and 11 · Signed automatic updates</p>
          </div>

          <div className="mt-16 md:mt-20">
            <HeroScrollExpand>
              <WindowFrame
                src="/hero-interface.png"
                alt="Vivianne's interface mid-task: reasoning, tool calls, and the Review panel showing real file changes"
                width={1920}
                height={1080}
                priority
              />
            </HeroScrollExpand>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-hairline bg-canvas-alt">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 md:px-8 ${i % 2 === 1 ? "pl-6 border-l border-hairline" : ""} ${i > 0 ? "md:border-l md:border-hairline" : ""} ${i < 2 ? "border-b border-hairline md:border-b-0" : ""} ${i === 0 ? "md:pl-0" : "md:pl-8"}`}
            >
              <div className="text-4xl font-medium tracking-tight text-ink">{s.value}</div>
              <p className="mt-2 max-w-[24ch] text-sm leading-snug text-body">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Why Vivianne"
            title="More capable than a chat window, and it shows its work."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-hairline md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="bg-white p-8 md:p-10">
                <span className="flex size-10 items-center justify-center rounded-lg bg-surface-soft text-ocean">
                  <p.icon size={20} />
                </span>
                <h3 className="mt-6 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-hairline bg-canvas-alt py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="How it works"
            title="You stay in charge of every change."
            body="Vivianne is built around a simple loop: it proposes, you decide, and nothing that alters your machine happens out of sight."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="rounded-[var(--radius-brand)] border border-hairline bg-white p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-surface-soft text-ocean">
                    <s.icon size={20} />
                  </span>
                  <span className="text-xs font-medium tabular-nums text-mute">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Showcases */}
      <section id="capabilities" className="scroll-mt-20 border-t border-hairline py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Product" title="Built to actually finish the job." />

          <div className="mt-16 flex flex-col gap-24 md:gap-32">
            {showcases.map((s, i) => (
              <Reveal key={s.id}>
                <div className={`grid items-center gap-10 md:grid-cols-12 md:gap-16`}>
                  <div className={`min-w-0 md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">{s.eyebrow}</span>
                    <h3 className="mt-3 max-w-[22ch] text-2xl font-medium tracking-tight md:text-3xl">{s.headline}</h3>
                    <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-body">{s.body}</p>
                  </div>
                  <div className="min-w-0 md:col-span-7">
                    <WindowFrame src={s.image} alt={s.alt} width={s.width} height={s.height} />
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Programmatic tool calling has no honest screenshot of its own,
                so it is shown as the kind of script the agent writes. */}
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                <div className="md:order-2 md:col-span-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">Programmatic tool calling</span>
                  <h3 className="mt-3 max-w-[22ch] text-2xl font-medium tracking-tight md:text-3xl">
                    Twenty tool calls, one step.
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-body">
                    Instead of one round-trip per tool call, it writes a short script that calls its own
                    tools inline and runs it in-process. Every call inside still goes through the same
                    approval you would get otherwise.
                  </p>
                </div>
                <div className="min-w-0 md:col-span-7">
                  <div className="window-frame">
                    <div className="window-frame-bar" aria-hidden>
                      <i />
                      <i />
                      <i />
                      <span className="ml-3 text-[11px] font-medium text-mute">ptc · one step</span>
                    </div>
                    <pre className="overflow-x-auto bg-ocean-deep p-6 font-mono text-[13px] leading-relaxed text-sky-light">
                      <code>
                        <span className="text-white/45">{"// read every route, find the ones missing auth\n"}</span>
                        {"const files = await glob({ pattern: \"src/routes/**/*.ts\" });\n"}
                        {"const unguarded = [];\n"}
                        {"for (const f of files) {\n"}
                        {"  const src = await read({ path: f });\n"}
                        {"  if (!src.includes(\"requireAuth\")) unguarded.push(f);\n"}
                        {"}\n"}
                        {"return unguarded;"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Capability grid */}
          <div className="mt-28 grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-white p-7">
                <c.icon size={22} className="text-ocean" />
                <h3 className="mt-5 text-[15px] font-medium tracking-tight">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="scroll-mt-20 border-t border-hairline bg-canvas-alt py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionHeading
              eyebrow="Models & providers"
              title="Every major model. Switch mid-session."
              body="Add a key once in Settings and pick a different model whenever the task calls for it. Requests go from your machine straight to the provider you chose, or nowhere at all with a local model."
            />
            <ul className="mt-10 flex flex-wrap gap-2">
              {providers.map((p) => (
                <li key={p} className="rounded-md border border-hairline bg-white px-3 py-1.5 text-sm text-ink">
                  {p}
                </li>
              ))}
              <li className="rounded-md border border-dashed border-hairline-strong px-3 py-1.5 text-sm text-body">
                + any OpenAI-compatible endpoint
              </li>
            </ul>
          </div>
          <div className="md:col-span-6">
            <WindowFrame
              src="/providers-panel.png"
              alt="Vivianne's Settings → Providers panel, showing the list of connected model providers"
              width={1203}
              height={893}
            />
          </div>
        </div>
      </section>

      {/* Security band */}
      <section className="bg-ocean-deep py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-light">Security</span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-[2.5rem] md:leading-[1.15]">
              Your machine, your keys, your call.
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/70">
              An agent with real access deserves a clear account of what it can do and where your
              data goes. Here is ours.
            </p>
            <Link
              href="/security"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white no-underline"
            >
              Read the security overview
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-white/10 bg-white/10 sm:grid-cols-2 md:col-span-7">
            {[
              ["Direct to provider", "No Vivianne server sits between you and the model. Your key, your request, your provider."],
              ["Approval by default", "Writes, shell commands and other side effects wait for you unless you turn that off."],
              ["Network-isolated sandbox", "Untrusted code runs in a container with networking disabled and resources capped."],
              ["Signed updates", "Every update is verified against a pinned signing key before it installs."],
            ].map(([t, b]) => (
              <li key={t} className="bg-ocean-deep p-7">
                <ShieldCheck size={20} className="text-sky-light" />
                <h3 className="mt-4 text-[15px] font-medium">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shipping cadence */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Changelog"
              title="Shipped in the open, release after release."
            />
            <SecondaryCta href="/changelog" label="Full changelog" />
          </div>
          <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
            {releases.slice(0, 3).map((r) => (
              <li key={r.id}>
                <NextLink
                  href="/changelog"
                  className="grid gap-2 py-6 no-underline md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <span className="text-sm font-medium tabular-nums text-ink md:col-span-2">{r.version}</span>
                  <span className="text-sm text-mute md:col-span-2">
                    {r.date &&
                      new Date(r.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                  </span>
                  <span className="text-sm leading-relaxed text-body md:col-span-8">{r.summary}</span>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="download" className="relative overflow-hidden border-t border-hairline">
        <div className="sky-glow pointer-events-none absolute inset-0 rotate-180" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-28 text-center md:py-36">
          <Reveal as="h2" className="max-w-[22ch] text-4xl font-medium tracking-tight md:text-5xl">
            Put an agent to work on your next task.
          </Reveal>
          <p className="max-w-[48ch] text-base leading-relaxed text-body">
            Install in a minute. Bring a key from any provider, or run a model locally.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <PrimaryCta href="/downloads" label="Download for Windows" />
            <SecondaryCta href="/security" label="Security overview" />
          </div>
        </div>
      </section>
    </div>
  );
}
