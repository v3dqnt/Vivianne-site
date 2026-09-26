import type { Metadata } from "next";
import {
  ArrowsLeftRight,
  Brain,
  CloudArrowDown,
  Cpu,
  Cube,
  FolderLock,
  HandPalm,
  Package,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@heroui/react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Security, Vivianne",
  description:
    "What Vivianne can do on your machine, where your data goes, and the safeguards around both.",
};

// Every statement here maps to behaviour in the app repo (tool_exec.rs
// approval gating and sandbox, the provider clients, tauri.conf.json's
// updater key, the root README's supply-chain policy). Keep it that way:
// if a safeguard changes, change this page in the same release.
const dataFlows = [
  {
    icon: ArrowsLeftRight,
    title: "Cloud models",
    body: "Your prompt, and whatever the agent reads to answer it, is sent from your machine directly to the provider you selected, using your own API key. Vivianne runs no relay or proxy in between. That provider's own data policy applies.",
  },
  {
    icon: Cpu,
    title: "Local models",
    body: "With a GGUF model on disk, inference runs on your hardware. No request leaves the machine for the conversation itself.",
  },
  {
    icon: Brain,
    title: "Memory and sessions",
    body: "Sessions, remembered facts and usage figures are stored on your computer. Memory can be searched or switched off entirely in Settings.",
  },
  {
    icon: CloudArrowDown,
    title: "Accounts and updates",
    body: "Signing in is optional and stores only your profile; the session token lives in your operating system's credential store. The updater checks the public GitHub release for a newer version.",
  },
];

const safeguards = [
  {
    icon: HandPalm,
    title: "Approval before side effects",
    body: "Reading files and searching run freely. Writing files, running shell commands and other actions that change your system wait for your explicit approval, unless you deliberately switch to bypass mode. In plan mode, those actions are refused outright.",
  },
  {
    icon: FolderLock,
    title: "Workspace boundaries",
    body: "File reads, writes, edits and shell commands are checked against the workspace folders you opened, so the agent works where you pointed it.",
  },
  {
    icon: Cube,
    title: "Network-isolated sandbox",
    body: "For code it should not trust, the agent can use a throwaway Docker container with networking disabled, capped memory, CPU and process count, no privilege escalation, and a read-only mount.",
  },
  {
    icon: CloudArrowDown,
    title: "Signed updates",
    body: "Updates are published as signed releases. The app verifies each one against a signing key built into the installer before applying it.",
  },
  {
    icon: Package,
    title: "Supply-chain hygiene",
    body: "Direct dependencies are pinned to exact versions, lockfile changes are reviewed like code, new releases of dependencies are held back before adoption, and dependency audits run on a schedule.",
  },
];

export default function SecurityPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="sky-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-20 md:pt-28">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">Security</span>
          <Reveal as="h1" className="mt-3 text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl">
            An agent with real access, and a clear account of it.
          </Reveal>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-body">
            Vivianne runs on your computer with the permissions of your user account. That is what
            lets it do real work. This page sets out where your data goes, what stands between the
            agent and your system, and the limits you should know about.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Where your data goes</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-hairline bg-hairline md:grid-cols-2">
            {dataFlows.map((d) => (
              <div key={d.title} className="bg-white p-8">
                <d.icon size={22} className="text-ocean" />
                <h3 className="mt-5 text-base font-medium tracking-tight">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-alt py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Safeguards</h2>
          <ul className="mt-10 flex flex-col divide-y divide-hairline rounded-[var(--radius-brand)] border border-hairline bg-white">
            {safeguards.map((s) => (
              <li key={s.title} className="grid gap-4 p-8 md:grid-cols-12 md:gap-8">
                <div className="flex items-center gap-3 md:col-span-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-ocean">
                    <s.icon size={18} />
                  </span>
                  <h3 className="text-base font-medium tracking-tight">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-body md:col-span-8">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[var(--radius-brand)] border border-hairline p-8 md:p-10">
            <div className="flex items-center gap-3">
              <Warning size={20} className="text-ocean" />
              <h2 className="text-xl font-medium tracking-tight">Limits you should know</h2>
            </div>
            <ul className="mt-6 flex list-disc flex-col gap-3 pl-5 text-sm leading-relaxed text-body">
              <li>
                Outside the sandbox, the agent acts with your user account&apos;s permissions. For
                stronger isolation, run it inside a virtual machine or container.
              </li>
              <li>
                Files the agent reads can contain instructions aimed at it (prompt injection). Open
                projects and install playbooks only from sources you trust, and keep approvals on
                for unfamiliar work.
              </li>
              <li>
                Bypass mode removes the approval step. Use it for tasks and folders where you would
                be comfortable with every action running unreviewed.
              </li>
            </ul>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-medium tracking-tight">Report a vulnerability</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Email{" "}
                <Link href="mailto:security@v3dqnt.com">security@v3dqnt.com</Link> or open a private
                GitHub security advisory. Include the affected version, steps to reproduce and the
                impact. Please don&apos;t file security issues publicly.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-medium tracking-tight">More detail</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                See the <Link href="/privacy">privacy policy</Link> for how account data is handled,
                and the <Link href="/changelog">changelog</Link> for security-relevant changes in
                each release.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
