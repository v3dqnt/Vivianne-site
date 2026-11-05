import type { Metadata } from "next";
import Image from "next/image";
import { AppleIcon, ArrowUpRight01Icon, Download04Icon, WindowsNewIcon } from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Download the Vivianne AI agent for macOS and Windows",
  description: "Download Vivianne for your machine: a universal macOS build and Windows installers.",
};

// Point at the app repo's releases, not this site's. That is where the tagged
// release is published and, critically, where the in-app updater fetches
// `latest.json` from — serving installers from a different repo than the one
// the updater watches is how a manual download and an auto-update end up on
// different versions.
const VERSION = "1.9.0";
const RELEASE_TAG = `v${VERSION}`;
const RELEASE_BASE = `https://github.com/v3dqnt/vivianne-releases/releases/download/${RELEASE_TAG}`;

const builds = [
  {
    label: "Windows (.exe)",
    detail: "Recommended for most people. NSIS installer.",
    href: `${RELEASE_BASE}/Vivianne_${VERSION}_x64-setup.exe`,
    size: "35 MB",
    icon: WindowsNewIcon,
  },
  {
    label: "Windows (.msi)",
    detail: "For managed or enterprise installs.",
    href: `${RELEASE_BASE}/Vivianne_${VERSION}_x64_en-US.msi`,
    size: "47 MB",
    icon: WindowsNewIcon,
  },
  {
    label: "macOS (universal)",
    detail: "Recommended for Mac. .dmg for Intel and Apple silicon.",
    href: `${RELEASE_BASE}/Vivianne_${VERSION}_universal.dmg`,
    size: "75 MB",
    icon: AppleIcon,
  },
];

const steps = [
  {
    number: "01",
    title: "Download the installer",
    body: "Grab the .dmg for macOS, or the .exe or .msi for Windows, from the links above to get started.",
    image: "/download%20installer.png",
  },
  {
    number: "02",
    title: "Run the installer",
    body: "On Windows, follow the setup wizard. On macOS, open the .dmg and drag Vivianne into Applications.",
    image: "/installer%20run.png",
  },
  {
    number: "03",
    title: "Launch Vivianne",
    body: "Open Vivianne and it's ready to handle tasks directly on your computer.",
    image: "/vivianne%20launched.png",
  },
];

function DownloadLink({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant?: "default" | "outline";
}) {
  return (
    <a href={href} className={buttonVariants({ size: "lg", variant })}>
      {label}
      <Icon icon={Download04Icon} size={16} />
    </a>
  );
}

export default function DownloadsPage() {
  return (
    <div>
      {/* Hero */}
      <section
        id="top"
        className="mx-auto max-w-7xl px-6 pt-32 pb-24 text-center md:pt-40"
      >
        <Reveal
          as="h1"
          className="mx-auto max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
        >
          Download Vivianne
        </Reveal>
        <Reveal
          delay={0.06}
          as="p"
          className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-body"
        >
          {RELEASE_TAG}, for macOS and Windows. Linux builds are on the way.
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap justify-center gap-3">
          <DownloadLink href={builds[0].href} label="Download for Windows" />
          <DownloadLink
            href={builds[2].href}
            label="Download for macOS"
            variant="outline"
          />
        </Reveal>

        <Reveal delay={0.14} className="mt-16">
          <div className="surface-card rounded-xl p-1.5">
            <div className="overflow-hidden rounded-md bg-background">
              <Image
                src="/hero-interface.png"
                alt="Vivianne's interface mid-task: reasoning, tool calls, and the Review panel showing real file changes"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* All builds */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Badge variant="outline">All builds</Badge>
          <Reveal
            as="h2"
            className="mt-4 text-2xl font-medium tracking-tight md:text-3xl"
          >
            Choose your installer.
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {builds.map((build, i) => (
              <Reveal key={build.label} delay={i * 0.06}>
                <a
                  href={build.href}
                  className="surface-card group block h-full rounded-xl p-5 no-underline outline-none transition-transform duration-[var(--dur-base)] ease-[var(--ease-premium)] hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/40 md:p-6"
                >
                  <div className="flex h-full items-start justify-between gap-3 md:gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                        <Icon icon={build.icon} size={18} />
                      </span>
                      <div className="min-w-0">
                        <CardTitle>{build.label}</CardTitle>
                        <CardDescription className="mt-1">{build.detail}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{build.size}</Badge>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation steps, placeholders for later */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Badge variant="outline">Installation</Badge>
          <Reveal
            as="h2"
            className="mt-4 text-2xl font-medium tracking-tight md:text-3xl"
          >
            Getting set up.
          </Reveal>

          <div className="mt-12 flex flex-col gap-16">
            {steps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.06}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                  <span className="text-xs font-medium tracking-wide text-mute">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-body">
                    {step.body}
                  </p>
                </div>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full rounded-xl border border-border"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-24 text-center">
          <Reveal
            as="h2"
            className="max-w-[22ch] text-2xl font-medium tracking-tight md:text-3xl"
          >
            Questions before you install?
          </Reveal>
          <Reveal delay={0.06}>
            <a
              href="mailto:hello@vivianne.dev"
              className={buttonVariants({ variant: "outline" })}
            >
              Get in touch
              <Icon icon={ArrowUpRight01Icon} size={16} />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
