import { Link, buttonVariants } from "@heroui/react";
import { Logo } from "@/components/logo";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-5 z-40 flex justify-center px-6">
      <div className="glass-pill flex h-14 w-full max-w-xl items-center justify-between gap-4 rounded-full pl-5 pr-2">
        <Link href="/" className="no-underline">
          <span className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="text-[15px] font-medium tracking-tight">
              Vivianne
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <span className="hidden items-center gap-6 sm:flex">
            <Link href="/downloads">Downloads</Link>
            <Link href="/changelog">Changelog</Link>
          </span>
          <Link href="#get-started" className={buttonVariants({ size: "sm" })}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
