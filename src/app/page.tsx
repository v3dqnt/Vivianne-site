import Image from "next/image";
import {
  ArrowUpRight,
  NotePencil,
  Brain,
  UserCircle,
  ArrowsClockwise,
  GitBranch,
  Plugs,
  Code,
  Calculator,
  PaintBrush,
  Lightning,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Card, Link, buttonVariants } from "@heroui/react";
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
      {/* Hero: asymmetric split */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-32 md:grid-cols-[1.1fr_0.9fr] md:pt-40 md:pb-40 min-h-[100dvh]"
      >
        <div>
          <h1 className="max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            One AI for every task on your computer.
          </h1>
          <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-body">
            Vivianne starts with coding today and is built to grow into
            science and office work next. It's moving toward a fully local
            architecture, so nothing you work on will have to leave your
            machine.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            
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

      {/* Memory + harness */}
      <section className="border-t border-hairline py-32 md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-surface-soft w-max mb-6 block">
            How it stays in context
          </span>
          <Reveal
            as="h2"
            className="mt-6 max-w-[30ch] text-3xl font-medium tracking-tight md:text-4xl"
          >
            The memory pipeline and the harness that runs it.
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
            {systemCells.map((cell, i) => (
              <Reveal key={cell.title} delay={i * 0.05} className={cell.span}>
                <div className="p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                  <div className="flex h-full flex-col gap-6 bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-8">
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-full bg-surface-soft">
                        <cell.icon size={20} weight="light" />
                      </span>
                      <span className="text-xs font-medium tracking-wide text-mute">
                        {cell.kind}
                      </span>
                    </div>
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

      {/* SSM-MoE Architecture Diagram (Editorial Split) */}
      <section className="border-t border-hairline bg-surface-soft/20 py-32 md:py-40 overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-16 md:gap-24">
            
            {/* Left Column: Typography */}
            <div className="flex-1 flex flex-col z-10 w-full md:w-1/2">
              <Reveal>
                <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-background ring-1 ring-border shadow-sm w-max mb-8 block">
                  Cognitive Architecture
                </span>
              </Reveal>
              <Reveal as="h2" delay={0.05} className="max-w-[24ch] text-4xl font-medium tracking-tight md:text-5xl leading-[1.1]">
                A dynamic network of experts working in unison.
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-body">
                  Instead of relying on a single generalist model, your requests are intelligently routed to a specialized expert, verified by a strict critic, and delivered fast—all running remarkably efficiently on local hardware.
                </p>
              </Reveal>
            </div>

            {/* Right Column: Animated Diagram */}
            <div className="flex-1 w-full md:w-1/2 relative z-10">
              <Reveal delay={0.2} className="w-full">
                <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-2">
                  
                  {/* Step 1: User Request */}
                  <div className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 z-10 animate-[fadeInDown_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards]">
                    <div className="rounded-[calc(2rem-0.375rem)] px-6 py-3 bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-sm font-medium flex items-center gap-3">
                      <UserCircle size={18} /> User Request
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="w-px h-8 bg-border z-0 animate-[growDown_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.1s] origin-top scale-y-0"></div>

                  {/* Step 2: Brain Router */}
                  <div className="w-full max-w-sm p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 z-10 animate-[fadeInUp_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.2s] opacity-0 translate-y-4">
                    <div className="rounded-[calc(2rem-0.375rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center p-6 flex flex-col items-center gap-4">
                      <div className="size-12 rounded-full bg-surface-soft flex items-center justify-center">
                        <Lightning size={24} weight="light" className="text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Intelligent Router</h3>
                        <p className="text-xs text-mute mt-1">Evaluates input and instantly selects expertise.</p>
                      </div>
                    </div>
                  </div>

                  {/* Connections Router to Experts */}
                  <div className="w-full flex justify-center relative z-0 h-12 opacity-0 animate-[fadeIn_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.3s]">
                    <div className="absolute top-1/2 w-[75%] border-t border-border"></div>
                    <div className="absolute top-1/2 left-[12.5%] border-l border-border h-1/2"></div>
                    <div className="absolute top-1/2 left-[37.5%] border-l border-border h-1/2"></div>
                    <div className="absolute top-1/2 left-[62.5%] border-l border-border h-1/2"></div>
                    <div className="absolute top-1/2 left-[87.5%] border-l border-border h-1/2"></div>
                    <div className="absolute top-0 border-l border-border h-1/2"></div>
                  </div>

                  {/* Step 3: Experts */}
                  <div className="grid grid-cols-4 w-full max-w-md z-10 gap-2">
                    {[
                      { name: "Code", icon: Code, delay: "0.4s" },
                      { name: "Math", icon: Calculator, delay: "0.45s" },
                      { name: "Logic", icon: Brain, delay: "0.5s" },
                      { name: "Art", icon: PaintBrush, delay: "0.55s" },
                    ].map((expert) => (
                      <div key={expert.name} className="opacity-0 translate-y-4 p-1 rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10" style={{ animation: `fadeInUp 0.4s cubic-bezier(0.32,0.72,0,1) forwards ${expert.delay}` }}>
                        <div className="rounded-[calc(1rem-0.25rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-4 flex flex-col items-center text-center gap-3 h-full">
                          <div className="size-10 rounded-full bg-surface-soft flex items-center justify-center">
                            <expert.icon size={20} weight="light" />
                          </div>
                          <span className="text-xs font-medium">{expert.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connections Experts to Critic */}
                  <div className="w-full flex justify-center relative z-0 h-12 opacity-0 animate-[fadeIn_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.7s]">
                    <div className="absolute bottom-1/2 w-[75%] border-t border-border"></div>
                    <div className="absolute bottom-1/2 left-[12.5%] border-l border-border h-1/2"></div>
                    <div className="absolute bottom-1/2 left-[37.5%] border-l border-border h-1/2"></div>
                    <div className="absolute bottom-1/2 left-[62.5%] border-l border-border h-1/2"></div>
                    <div className="absolute bottom-1/2 left-[87.5%] border-l border-border h-1/2"></div>
                    <div className="absolute bottom-0 border-l border-border h-1/2"></div>
                  </div>

                  {/* Step 4: Critic */}
                  <div className="w-full max-w-sm p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 z-10 animate-[fadeInUp_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.8s] opacity-0 translate-y-4">
                    <div className="rounded-[calc(2rem-0.375rem)] bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center p-6 flex flex-col items-center gap-4">
                      <div className="size-12 rounded-full bg-surface-soft flex items-center justify-center">
                        <ShieldCheck size={24} weight="light" className="text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Quality Critic</h3>
                        <p className="text-xs text-mute mt-1">Continuously evaluates responses for reliability.</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="w-px h-8 bg-border z-0 animate-[growDown_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_0.9s] origin-top scale-y-0 opacity-0"></div>

                  {/* Step 5: Final Output */}
                  <div className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 z-10 animate-[fadeInUp_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards_1.0s] opacity-0 translate-y-4">
                    <div className="rounded-[calc(2rem-0.375rem)] px-6 py-3 bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-sm font-medium flex items-center gap-3">
                      <CheckCircle size={18} weight="fill" className="text-foreground" /> Validated Output
                    </div>
                  </div>

                </div>
              </Reveal>
            </div>
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
            One AI, for whatever you're working on next.
          </Reveal>
          <Reveal delay={0.06}>
            <CtaLink href="/downloads" label="Download for Windows" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
