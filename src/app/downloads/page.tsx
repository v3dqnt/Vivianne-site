import type { Metadata } from "next";
import {
  ArrowUpRight,
  WindowsLogo,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import { Card, Chip, Link, buttonVariants } from "@heroui/react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Downloads, Vivianne",
  description: "Download Vivianne for your machine.",
};

const builds = [
  {
    label: "Windows (.exe)",
    detail: "Recommended for most people. NSIS installer.",
    href: "https://github.com/v3dqnt/Vivianne-site/releases/download/v1.5.0/Vivianne_1.5.0_x64-setup.exe",
    size: "16 MB",
  },
  {
    label: "Windows (.msi)",
    detail: "For managed or enterprise installs.",
    href: "https://github.com/v3dqnt/Vivianne-site/releases/download/v1.5.0/Vivianne_1.5.0_x64_en-US.msi",
    size: "20 MB",
  },
];

const steps = [
  {
    number: "01",
    title: "Download the installer",
    body: "Grab the .exe or .msi installer from the links above to get started.",
    image: "/download%20installer.png",
  },
  {
    number: "02",
    title: "Run the installer",
    body: "Follow the setup wizard to install Vivianne on your machine.",
    image: "/installer%20run.png",
  },
  {
    number: "03",
    title: "Launch Vivianne",
    body: "Open Vivianne and it's ready to handle tasks directly on your computer.",
    image: "/vivianne%20launched.png",
  },
];

function DownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className={buttonVariants({
        size: "lg",
        className: "group gap-3 pr-2",
      })}
    >
      {label}
      <span className="btn-icon-circle">
        <DownloadSimple size={14} weight="bold" />
      </span>
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
          v1.5, for Windows. macOS and Linux builds are on the way.
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex justify-center">
          <DownloadLink
            href="https://github.com/v3dqnt/Vivianne-site/releases/download/v1.5.0/Vivianne_1.5.0_x64-setup.exe"
            label="Download for Windows"
          />
        </Reveal>

        <Reveal delay={0.14} className="mt-16">
          <img 
            src="/Heroshot.png" 
            alt="Vivianne hero screenshot" 
            className="w-full rounded-[var(--radius-inner)] border border-hairline shadow-sm"
          />
        </Reveal>
      </section>

      {/* All builds */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <span className="eyebrow">All builds</span>
          <Reveal
            as="h2"
            className="mt-4 text-2xl font-medium tracking-tight md:text-3xl"
          >
            Choose your installer.
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {builds.map((build, i) => (
              <Reveal key={build.label} delay={i * 0.06}>
                <a href={build.href} className="block bezel-shell h-full outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-[var(--radius-brand)]">
                  <div className="flex h-full items-start justify-between gap-4 bezel-core p-8 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                        <WindowsLogo size={20} weight="light" />
                      </span>
                      <Card.Header className="p-0">
                        <Card.Title>{build.label}</Card.Title>
                        <Card.Description>{build.detail}</Card.Description>
                      </Card.Header>
                    </div>
                    <Chip size="sm">{build.size}</Chip>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation steps, placeholders for later */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <span className="eyebrow">Installation</span>
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
                  className="w-full rounded-[var(--radius-inner)] border border-hairline shadow-sm"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-24 text-center">
          <Reveal
            as="h2"
            className="max-w-[22ch] text-2xl font-medium tracking-tight md:text-3xl"
          >
            Questions before you install?
          </Reveal>
          <Reveal delay={0.06}>
            <Link href="mailto:hello@vivianne.dev">
              Get in touch
              <Link.Icon>
                <ArrowUpRight size={12} />
              </Link.Icon>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
