import { Link, buttonVariants } from "@heroui/react";
import { Logo } from "@/components/logo";
import { NavAccount } from "@/components/nav-account";

const links = [
  { href: "/#harness", label: "Features" },
  { href: "/#science", label: "Science" },
  { href: "/#faq", label: "FAQ" },
  { href: "/changelog", label: "Changelog" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:px-6">
      <nav
        aria-label="Main"
        className="glass-pill flex h-14 w-full max-w-3xl items-center justify-between gap-4 rounded-full pl-5 pr-2"
      >
        <Link href="/" className="no-underline" aria-label="Vivianne home">
          <span className="flex items-center gap-2.5">
            <Logo size={18} />
            <span className="text-[15px] font-medium tracking-tight text-ink">
              Vivianne
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <span className="hidden items-center gap-6 text-sm md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-body no-underline transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </span>
          <span className="flex items-center gap-3">
            <NavAccount />
            <Link href="/downloads" className={buttonVariants({ size: "sm" })}>
              Download
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
