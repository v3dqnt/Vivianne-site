import type { Metadata } from "next";
import {
  AiBrain01Icon,
  CpuIcon,
  Hold04Icon,
  Mic01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Experiments from the Vivianne team: voice control, hand-gesture control, multiplayer, a local model architecture, and human-gated self-improvement.",
  alternates: { canonical: "/labs" },
};

const experiments = [
  {
    icon: Mic01Icon,
    title: "Viv Instant",
    status: "Experimental",
    body: "An always-on-top voice overlay. Say what you want done and it works through it step by step, with a spoken \"stop\" window before anything destructive runs.",
  },
  {
    icon: Hold04Icon,
    title: "Gesture control",
    status: "Experimental",
    body: "Drive Windows with hand gestures from a webcam: pointing, clicking, and scrolling without touching the mouse. Ships as its own standalone app.",
  },
  {
    icon: UserMultipleIcon,
    title: "Multiplayer",
    status: "In progress",
    body: "Two Vivianne instances paired over a direct, encrypted peer-to-peer link, sharing agent activity and one chat to divide up the work.",
  },
  {
    icon: CpuIcon,
    title: "Local architecture",
    status: "Research",
    body: "A model architecture built to run entirely on your own machine, so nothing you work on has to leave it.",
  },
  {
    icon: AiBrain01Icon,
    title: "Self-improvement",
    status: "Research",
    body: "Letting the harness propose improvements to itself from real sessions, test them against regressions, and only switch them on after a human approves.",
  },
];

export default function LabsPage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-12 md:pt-48">
        <Reveal as="h1" className="text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
          Labs
        </Reveal>
        <Reveal delay={0.06} as="p" className="mt-4 max-w-[56ch] text-base leading-relaxed text-body">
          What we&apos;re experimenting with next. Early, sometimes rough, and
          not all of it will ship.
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {experiments.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.04} className="h-full">
              <article className="surface-card flex h-full flex-col rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Icon icon={e.icon} size={18} />
                  </span>
                  <Badge variant="outline">{e.status}</Badge>
                </div>
                <h2 className="mt-5 text-base font-medium">{e.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">{e.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
