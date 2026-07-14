import Image from "next/image";
import {
  ArrowUpRight,
  NotePencil,
  Brain,
  UserCircle,
  ArrowsClockwise,
  GitBranch,
  Plugs,
  Cpu,
  Code,
  TestTube,
  Briefcase,
} from "@phosphor-icons/react/dist/ssr";
import { Card, Chip, Link, buttonVariants } from "@heroui/react";
import { Reveal } from "@/components/reveal";

const systemCells = [
  {
    icon: NotePencil,
    kind: "Memory",
    title: "Auto-capture",
    body: "A deterministic note is written at the close of every turn. No model call, no cost, just a record of what happened.",
    span: "md:col-span-7",
  },
  {
    icon: Brain,
    kind: "Memory",
    title: "L1 extraction",
    body: "Once enough notes accumulate, a single pass distills them into typed, atomic facts.",
    span: "md:col-span-5",
  },
  {
    icon: UserCircle,
    kind: "Memory",
    title: "L3 synthesis",
    body: "Persona facts are periodically re-synthesized into one coherent profile that shapes every future session.",
    span: "md:col-span-5",
  },
  {
    icon: ArrowsClockwise,
    kind: "Harness",
    title: "The loop",
    body: "Model call, tool execution, result check, repeat, with a hard step ceiling so it always wraps up.",
    span: "md:col-span-7",
  },
  {
    icon: GitBranch,
    kind: "Harness",
    title: "Delegation",
    body: "A task can be handed off one level deep, never nested. Every delegated call stays visible in the log.",
    span: "md:col-span-6",
  },
  {
    icon: Plugs,
    kind: "Harness",
    title: "Providers",
    body: "One interface across model providers. Swap without rewrites, compaction runs automatically as sessions grow.",
    span: "md:col-span-6",
  },
];

const roadmapDomains = [
  {
    icon: Code,
    title: "Coding",
    status: "Live",
    body: "Reads your codebase, runs your tools, and remembers what it learned last time.",
  },
  {
    icon: TestTube,
    title: "Science",
    status: "Planned",
    body: "Literature review, data analysis, and experiment tracking, with the same memory and reasoning.",
  },
  {
    icon: Briefcase,
    title: "Office work",
    status: "Planned",
    body: "Documents, spreadsheets, and everyday admin, handled the same way engineering work is.",
  },
];

function CtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        size: "lg",
        className: "group gap-3 pr-2",
      })}
    >
      {label}
      <span className="btn-icon-circle">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero: asymmetric split */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-32 md:grid-cols-[1.1fr_0.9fr] md:pt-40 md:pb-40"
      >
        <div>
          <h1 className="max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            One AI for every task on your computer.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-body">
            Vivianne starts with coding today and is built to grow into
            science and office work next. It's moving toward a fully local
            architecture, so nothing you work on will have to leave your
            machine.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <CtaLink href="#get-started" label="Get started" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/vivianne-logo.png"
            alt="Vivianne"
            width={420}
            height={420}
            priority
            className="w-72 md:w-[26rem]"
          />
        </div>
      </section>

      {/* Memory + harness: one unified system, asymmetric bento */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <span className="eyebrow">How it stays in context</span>
          <Reveal
            as="h2"
            className="mt-4 max-w-[30ch] text-2xl font-medium tracking-tight md:text-3xl"
          >
            The memory pipeline and the harness that runs it.
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
            {systemCells.map((cell, i) => (
              <Reveal key={cell.title} delay={i * 0.05} className={cell.span}>
                <div className="bezel-shell h-full">
                  <div className="flex h-full flex-col gap-6 bezel-core p-8">
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-full bg-surface-soft">
                        <cell.icon size={20} weight="light" />
                      </span>
                      <span className="text-xs font-medium tracking-wide text-mute">
                        {cell.kind}
                      </span>
                    </div>
                    <Card.Header className="p-0">
                      <Card.Title>{cell.title}</Card.Title>
                      <Card.Description>{cell.body}</Card.Description>
                    </Card.Header>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap: architecture + where Vivianne is headed */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <span className="eyebrow">Roadmap</span>
          <Reveal
            as="h2"
            className="mt-4 max-w-[28ch] text-2xl font-medium tracking-tight md:text-3xl"
          >
            Moving toward frontier performance, run entirely on your machine.
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="bezel-shell h-full">
                <div className="flex h-full flex-col gap-6 bezel-core p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-full bg-surface-soft">
                      <Cpu size={20} weight="light" />
                    </span>
                    <Chip size="sm">In development</Chip>
                  </div>
                  <Card.Header className="p-0">
                    <Card.Title>SSM-MoE architecture</Card.Title>
                    <Card.Description>
                      Vivianne runs on cloud model providers today. We're
                      building it toward a mixture-of-experts state space
                      model: only a small slice of the network activates per
                      token, and state space layers keep memory usage flat as
                      context grows, instead of scaling with it like standard
                      transformers. That combination is what will make
                      frontier level reasoning practical on a single machine,
                      fully offline, with no data ever leaving it.
                    </Card.Description>
                  </Card.Header>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:col-span-7">
              {roadmapDomains.map((domain, i) => (
                <Reveal key={domain.title} delay={i * 0.05}>
                  <div className="bezel-shell">
                    <div className="flex items-center gap-5 bezel-core p-6">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                        <domain.icon size={20} weight="light" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-medium">
                            {domain.title}
                          </h3>
                          <Chip size="sm">{domain.status}</Chip>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-body">
                          {domain.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        id="get-started"
        className="scroll-mt-24 border-t border-hairline"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-32 text-center md:py-40">
          <Reveal
            as="h2"
            className="max-w-[22ch] text-3xl font-medium tracking-tight md:text-4xl"
          >
            One AI, for whatever you're working on next.
          </Reveal>
          <Reveal delay={0.06}>
            <CtaLink href="mailto:hello@vivianne.dev" label="Get started" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
