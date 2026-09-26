import { Link, buttonVariants } from "@heroui/react";
import { List } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { NavAccount } from "@/components/nav-account";

const links = [
  { href: "/#capabilities", label: "Product" },
  { href: "/#providers", label: "Models" },
  { href: "/security", label: "Security" },
  { href: "/changelog", label: "Changelog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="no-underline">
            <span className="flex items-center gap-2.5">
              <Logo size={30} />
              <span className="text-[15px] font-semibold tracking-tight text-ink">Vivianne</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-body no-underline hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <NavAccount />
          <Link href="/downloads" className={buttonVariants({ size: "sm" })}>
            Download
          </Link>
          {/* Small screens: the section links fold into a native disclosure,
              so the menu works without any client-side JavaScript. */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Menu"
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg border border-hairline [&::-webkit-details-marker]:hidden"
            >
              <List size={18} />
            </summary>
            <div className="absolute right-0 top-11 w-48 rounded-xl border border-hairline bg-white p-2 shadow-[var(--shadow-float)]">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink no-underline hover:bg-surface-soft"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
