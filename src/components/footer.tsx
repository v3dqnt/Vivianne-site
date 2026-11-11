import { TextLink } from "@/components/ui/text-link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer data-ink className="ink-tokens relative -mt-px bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="text-[15px] font-medium tracking-tight">
                Vivianne
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-sm text-body">
              A desktop AI agent and agentic harness for coding, math, and
              science. Works with any model provider, or a local model
              that never leaves your machine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <TextLink href="/vivianne/downloads">Downloads</TextLink>
            <TextLink href="/vivianne/changelog">Changelog</TextLink>
            <TextLink href="/vivianne/faq">FAQ</TextLink>
            <TextLink href="/vivianne/privacy">Privacy</TextLink>
            <TextLink href="/vivianne/terms">Terms</TextLink>
            <TextLink href="mailto:hello@vivianne.dev">Contact</TextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
