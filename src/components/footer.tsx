import { Link } from "@heroui/react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
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
              An AI system for coding today, and soon science and office
              work too. Moving toward a fully local architecture, so nothing
              you work on will have to leave your machine.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/downloads">Downloads</Link>
            <Link href="/changelog">Changelog</Link>
            <Link href="mailto:hello@vivianne.dev">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
