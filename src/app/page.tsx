import Image from "next/image";
import {
  ArrowUpRight,
  TerminalWindow,
  GitDiff,
  ShieldCheck,
  Eye,
  TreeStructure,
  Brain,
  Lightning,
  PuzzlePiece,
  CalendarCheck,
  MagnifyingGlass,
  MathOperations,
  ChartLine,
  FileText,
  Flask,
} from "@phosphor-icons/react/dist/ssr";
import { Accordion, Link, buttonVariants } from "@heroui/react";
import { Reveal } from "@/components/reveal";
import { HeroScrollExpand } from "@/components/hero-scroll-expand";
import { JsonLd } from "@/components/json-ld";
import { RELEASE_VERSION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const providers = [
  { slug: "anthropic", name: "Anthropic" },
  { slug: "openai", name: "OpenAI" },
  { slug: "gemini", name: "Google Gemini" },
  { slug: "mistral", name: "Mistral AI" },
  { slug: "deepseek", name: "DeepSeek" },
  { slug: "xai", name: "xAI" },
  { slug: "groq", name: "Groq" },
  { slug: "openrouter", name: "OpenRouter" },
  { slug: "nvidia", name: "NVIDIA NIM" },
  { slug: "huggingface", name: "Hugging Face" },
  { slug: "cloudflare", name: "Cloudflare Workers AI" },
];

const codingPoints = [
  {
    icon: TerminalWindow,
    title: "A terminal that stays open",
    body: "It keeps a real shell alive between steps, so an activated venv or a running dev server is still there next turn.",
  },
  {
    icon: GitDiff,
    title: "Every change, reviewable",
    body: "The Review panel lists each file it touched with a unified or split diff, before you commit anything.",
  },
  {
    icon: ShieldCheck,
    title: "You set the permissions",
    body: "Ask before every command, auto-approve the safe ones, or plan first in read-only mode.",
  },
  {
    icon: Eye,
    title: "Reasoning you can read",
    body: "You watch it think and call tools as it happens, instead of a spinner and a wall of text.",
  },
];

const harnessParts = [
  { term: "Tools", detail: "Shell, files, web search, a real browser, documents and images." },
  { term: "Memory", detail: "Facts it learns about you and your projects, recalled when relevant." },
  { term: "Subagents", detail: "Separate workers for big, self-contained jobs, each with its own model." },
  { term: "Permissions", detail: "Approval modes and a read-only plan mode, per session." },
  { term: "Context", detail: "Compaction and durable goals so long tasks survive a full window." },
  { term: "Extensions", detail: "MCP servers, skills and playbooks that add tools and panels." },
];

const scienceFlow = [
  {
    icon: MagnifyingGlass,
    title: "Find the sources",
    body: "Searches the web, fetches papers and drives a real browser to read what a page actually says.",
    tools: ["web_search", "web_fetch", "browser_snapshot"],
  },
  {
    icon: MathOperations,
    title: "Run the numbers",
    body: "Writes and runs Python in your own environment, or in an isolated sandbox, so NumPy, SciPy and SymPy do the maths instead of the model's memory.",
    tools: ["bash", "sandbox_execute"],
  },
  {
    icon: ChartLine,
    title: "Check the result",
    body: "Plots, re-runs and reads its own output back, including images of charts and handwritten working.",
    tools: ["read", "terminal_read"],
  },
  {
    icon: FileText,
    title: "Write it up",
    body: "Hands you a real PDF, Word, Excel or PowerPoint file, with Mermaid diagrams for anything structural.",
    tools: ["create_document"],
  },
];

const faqs = [
  {
    q: "What is an AI agent harness?",
    a: "An agent harness is the software around a language model that lets it act: the tools it can call, the loop that runs them, its memory, permissions and context management. The model reasons; the harness turns that reasoning into real work on your files and terminal.",
  },
  {
    q: "What is agentic coding?",
    a: "Agentic coding is when an AI agent carries a programming task through several steps on its own: reading the code, making edits, running commands and tests, and fixing what fails, rather than suggesting a single snippet for you to paste.",
  },
  {
    q: "Is Vivianne an alternative to Claude Code, Cursor or Codex?",
    a: "It covers the same agentic coding ground as a desktop app rather than a CLI or an editor plugin, and it is not tied to one vendor. You can use Claude, GPT, Gemini, open-weight models or a local model in the same session.",
  },
  {
    q: "Which AI models and providers does Vivianne support?",
    a: "Anthropic, OpenAI, Google, Groq, xAI, DeepSeek, Mistral, Together AI, Fireworks, OpenRouter, Cerebras, NVIDIA NIM, Hugging Face and Cloudflare Workers AI, plus any OpenAI-compatible endpoint. You add a key once in Settings and can switch models mid-session.",
  },
  {
    q: "Can Vivianne run AI models locally without the internet?",
    a: "Yes. Point it at a GGUF model file on disk and it runs the model itself. No API key, no internet connection, and nothing leaves your machine.",
  },
  {
    q: "Can Vivianne help with science and maths?",
    a: "Yes. It searches and reads sources, runs Python for the actual calculation, checks plots and outputs, and writes up the result as a document. A dedicated science playbook for literature review and data analysis is in progress.",
  },
  {
    q: "Is Vivianne free, and what does it run on?",
    a: "Vivianne is free to download for Windows. You pay your model provider directly for what you use, or nothing at all with a local model.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "AI agent",
      operatingSystem: "Windows",
      softwareVersion: RELEASE_VERSION,
      downloadUrl: `${SITE_URL}/downloads`,
      screenshot: `${SITE_URL}/hero-interface.png`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Agentic coding with a persistent terminal",
        "Multi-provider model support and local GGUF models",
        "Subagents for background tasks",
        "Persistent memory across sessions",
        "Programmatic tool calling",
        "Web search, web fetch and browser control",
        "PDF, Word, Excel and PowerPoint generation",
        "MCP servers, skills and playbooks",
      ],
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function CtaLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className="inline-flex h-11 items-center rounded-full border border-hairline-strong px-5 text-sm font-medium text-ink no-underline transition-colors hover:bg-surface-soft active:scale-[0.98]"
      >
        {label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={buttonVariants({
        size: "lg",
        className: "group gap-3 pr-2 active:scale-[0.98]",
      })}
    >
      {label}
      <span className="btn-icon-circle">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </Link>
  );
}

function Frame({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="bezel-shell">
      <div className="bezel-core">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <JsonLd data={pageJsonLd} />

      {/* Hero: copy on the left, the real app on the right, bleeding off
          the edge at desktop so it reads as a window, not a thumbnail. */}
      <section id="top" className="hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pt-28 pb-20 md:px-6 md:pt-24 lg:min-h-[100dvh] lg:grid-cols-2 lg:pb-16">
          <div>
            <span className="eyebrow">Desktop AI agent harness</span>
            <h1 className="mt-6 max-w-[22ch] text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              The AI agent for code, science and maths.
            </h1>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-body">
              Vivianne reads, writes and runs real work on your computer, with
              whichever model you choose, including local ones.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaLink href="/downloads" label="Download for Windows" />
              <CtaLink href="#harness" label="See how it works" variant="secondary" />
            </div>
          </div>

          <div className="lg:-mr-48 xl:-mr-72">
            <HeroScrollExpand>
              <Frame
                src="/hero-interface.png"
                alt="Vivianne's desktop app mid-task: reasoning, bash tool calls and a to-do update in the chat, with 61 changed files listed in the Review panel"
                width={1919}
                height={1020}
                priority
              />
            </HeroScrollExpand>
          </div>
        </div>
      </section>

      {/* Providers: logos only, in one marquee. */}
      <section aria-labelledby="providers-heading" className="border-y border-hairline bg-chrome py-10">
        <h2 id="providers-heading" className="px-4 text-center text-sm text-body">
          One harness for every major model provider, and anything OpenAI-compatible
        </h2>
        <div className="marquee mt-8 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-16 pr-16">
            {[...providers, ...providers].map((p, i) => (
              <li key={`${p.slug}-${i}`} aria-hidden={i >= providers.length}>
                <span
                  role="img"
                  aria-label={p.name}
                  title={p.name}
                  className="brand-mark size-7"
                  style={{ ["--mark" as string]: `url(/logos/${p.slug}.svg)` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agentic coding: screenshot left, copy and a 2x2 of specifics right. */}
      <section id="coding" className="scroll-mt-24 py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal className="order-2 lg:order-1">
            <Frame
              src="/Heroshot.png"
              alt="Vivianne editing an HTML file: an inline diff of the change, a Changes panel and a terminal docked on the right"
              width={1918}
              height={1017}
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal as="h2" className="max-w-[18ch] text-3xl font-medium tracking-tight md:text-4xl">
              Agentic coding that runs, tests and fixes.
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-body">
                Give it a task, not a prompt. It reads the codebase, edits
                files, runs the build and the tests, and keeps going until
                they pass.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {codingPoints.map((p, i) => (
                <Reveal key={p.title} delay={0.08 + i * 0.04}>
                  <p.icon size={22} weight="light" className="text-primary" />
                  <h3 className="mt-3 text-[15px] font-medium">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The harness: an asymmetric bento, five cells for five features. */}
      <section id="harness" className="scroll-mt-24 border-t border-hairline py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal as="h2" className="max-w-[22ch] text-3xl font-medium tracking-tight md:text-5xl">
            An agent harness, not a chat window.
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-body">
              The model does the reasoning. The harness around it decides what
              it can touch, what it remembers and how it splits up the work.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
            {/* Subagents: wide, with the real panel */}
            <Reveal className="md:col-span-4">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-surface-raised">
                <div className="p-7 md:p-8">
                  <TreeStructure size={22} weight="light" className="text-primary" />
                  <h3 className="mt-4 text-xl font-medium tracking-tight">Subagents for the big jobs</h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-body">
                    Auditing a whole codebase? It hands the job to a subagent
                    that runs in the background, on its own model, while you
                    keep talking to the main session.
                  </p>
                </div>
                <div className="mt-auto pl-7 md:pl-8">
                  <Image
                    src="/subagents-panel.png"
                    alt="A subagent running a security audit in its own panel, reasoning through each file"
                    width={1918}
                    height={1023}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="h-auto w-full rounded-tl-[var(--radius-inner)] border-l border-t border-hairline"
                  />
                </div>
              </article>
            </Reveal>

            {/* Programmatic tool calling: accent gradient cell */}
            <Reveal delay={0.05} className="min-w-0 md:col-span-2">
              <article className="flex h-full min-w-0 flex-col justify-between gap-10 rounded-[var(--radius-brand)] border border-primary/25 bg-[linear-gradient(160deg,rgba(74,158,255,0.22),rgba(74,158,255,0.04)_55%,transparent)] p-7 md:p-8">
                <div>
                  <Lightning size={22} weight="light" className="text-primary" />
                  <h3 className="mt-4 text-xl font-medium tracking-tight">Twenty tool calls, one step</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    Programmatic tool calling: it writes a short script that
                    calls its own tools inline, so reading twenty files costs
                    one round-trip. Every call still goes through your
                    approvals.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-[var(--radius-inner)] border border-hairline bg-canvas/70 p-4 font-mono text-[11.5px] leading-relaxed text-body">
                  <code>
                    <span className="text-mute">{"// run_script\n"}</span>
                    {"const hits = [];\n"}
                    {"const files = await glob(\"**/*.rs\");\n"}
                    {"for (const f of files.split(\"\\n\")) {\n"}
                    {"  const src = await read(f);\n"}
                    {"  if (src.includes(\".unwrap()\"))\n"}
                    {"    hits.push(f);\n"}
                    {"}\n"}
                    {"hits;"}
                  </code>
                </pre>
              </article>
            </Reveal>

            {/* Memory: image cell */}
            <Reveal className="md:col-span-3">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-surface-raised">
                <div className="p-7 md:p-8">
                  <Brain size={22} weight="light" className="text-primary" />
                  <h3 className="mt-4 text-xl font-medium tracking-tight">Memory without asking</h3>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-body">
                    Sessions turn into facts it recalls later: your
                    preferences, past corrections, the shape of your projects.
                    Search it, prune it, or switch it off.
                  </p>
                </div>
                <div className="mt-auto px-7 md:px-8">
                  <Image
                    src="/memory-panel.png"
                    alt="Vivianne's Memory settings with auto-extraction, auto-consolidate and a searchable list of remembered facts"
                    width={1176}
                    height={860}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="h-auto w-full rounded-t-[var(--radius-inner)] border-x border-t border-hairline"
                  />
                </div>
              </article>
            </Reveal>

            {/* Extensions: dot-grid cell */}
            <Reveal delay={0.05} className="md:col-span-3">
              <article className="dot-grid flex h-full flex-col justify-between gap-10 rounded-[var(--radius-brand)] border border-hairline bg-chrome p-7 md:p-8">
                <PuzzlePiece size={22} weight="light" className="text-primary" />
                <div>
                  <h3 className="text-xl font-medium tracking-tight">MCP, skills and playbooks</h3>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-body">
                    Connect any MCP server, drop in markdown skills, or install
                    a playbook that adds its own tools and panels for the
                    workflows you repeat.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-body">
                    {["mcp", "skills", "playbooks", "custom providers"].map((t) => (
                      <li key={t} className="rounded-full border border-hairline bg-canvas px-3 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>

            {/* Automations and goals: full-width strip */}
            <Reveal className="md:col-span-6">
              <article className="flex flex-col gap-6 rounded-[var(--radius-brand)] border border-hairline bg-surface-raised p-7 md:flex-row md:items-center md:gap-10 md:p-8">
                <CalendarCheck size={22} weight="light" className="shrink-0 text-primary" />
                <div className="md:flex-1">
                  <h3 className="text-xl font-medium tracking-tight">Long tasks that keep their goal</h3>
                  <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-body">
                    A durable goal is restated every turn, so a long task
                    survives context compaction. Automations run a prompt on a
                    schedule, in your local time zone.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Science and maths: a vertical stack and a four-part flow. */}
      <section id="science" className="scroll-mt-24 border-t border-hairline bg-chrome py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <span className="eyebrow">
            <Flask size={13} weight="bold" className="text-primary" />
            AI for science and maths
          </span>
          <Reveal as="h2" className="mt-6 max-w-[20ch] text-3xl font-medium tracking-tight md:text-5xl">
            A research agent that shows its working.
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-body">
              Language models are unreliable at arithmetic. So Vivianne does
              not guess the answer: it finds sources, computes in code, and
              checks the result before it writes anything up.
            </p>
          </Reveal>

          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {scienceFlow.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-surface-raised p-7">
                <Reveal delay={i * 0.06} className="flex h-full flex-col">
                  <s.icon size={24} weight="light" className="text-primary" />
                  <h3 className="mt-5 text-lg font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
                  <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 font-mono text-xs text-mute">
                    {s.tools.map((t) => (
                      <code key={t}>{t}</code>
                    ))}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-body">
            Coming next: a science playbook with literature review, scientific
            database connectors and data analysis built in. Follow along in
            the <Link href="/changelog" className="text-ink underline underline-offset-4">changelog</Link>.
          </p>
        </div>
      </section>

      {/* Local: copy left, the real Local models panel right. */}
      <section id="local" className="scroll-mt-24 border-t border-hairline py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
          <div>
            <Reveal as="h2" className="max-w-[18ch] text-3xl font-medium tracking-tight md:text-4xl">
              A local AI agent, on your own hardware.
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-body">
                Point it at a GGUF file and it runs the model itself. No API
                key, no connection, nothing sent anywhere. Use a cloud model
                when you want one and a local model when the work is private.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-8">
                <div>
                  <dt className="text-sm text-body">Local formats</dt>
                  <dd className="mt-1 text-2xl font-medium tracking-tight">GGUF</dd>
                </div>
                <div>
                  <dt className="text-sm text-body">Cloud providers</dt>
                  <dd className="mt-1 text-2xl font-medium tracking-tight">14 built in</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <Frame
              src="/local-models-panel.png"
              alt="Vivianne's Local models settings, running Qwen2.5-Coder and LFM2.5-VL directly on the machine"
              width={1162}
              height={863}
            />
          </Reveal>
        </div>
      </section>

      {/* Definition block: plain answer to "what is an agent harness", which
          is what people search for, plus the parts of Vivianne's. */}
      <section className="border-t border-hairline py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 md:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <Reveal as="h2" className="max-w-[16ch] text-3xl font-medium tracking-tight md:text-4xl">
              What goes into an agent harness.
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[44ch] leading-relaxed text-body">
                Claude Code and Codex each wrap one vendor&apos;s models in
                a harness. Vivianne is a harness first, so the
                model is a setting you change, not the product you bought.
              </p>
            </Reveal>
          </div>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {harnessParts.map((p, i) => (
              <Reveal key={p.term} delay={i * 0.04} className="border-t border-hairline-strong pt-5">
                <dt className="text-[15px] font-medium">{p.term}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-body">{p.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ: visible answers mirror the FAQPage JSON-LD above. */}
      <section id="faq" className="scroll-mt-24 border-t border-hairline bg-chrome py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal as="h2" className="text-3xl font-medium tracking-tight md:text-4xl">
            Questions, answered.
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <Accordion>
              {faqs.map((f, i) => (
                <Accordion.Item key={f.q} id={`faq-${i}`}>
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full">
                      <h3 className="flex-1 py-1 text-left text-base font-medium">{f.q}</h3>
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="max-w-[65ch] text-sm leading-relaxed text-body">{f.a}</p>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="download" className="hero-glow relative scroll-mt-24 overflow-hidden border-t border-hairline py-32 md:py-44">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 md:px-6">
          <Reveal as="h2" className="max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Put an agent to work on your next problem.
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[44ch] leading-relaxed text-body">
              Free to download for Windows. Bring a key from any provider,
              or run a model locally.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CtaLink href="/downloads" label="Download for Windows" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
