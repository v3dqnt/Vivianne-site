"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Popover } from "radix-ui";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/logo";
import { NavAccount } from "@/components/nav-account";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/text-link";

const menuLinks = [
  { href: "/labs", label: "Labs" },
  { href: "/faq", label: "FAQ" },
  { href: "/changelog", label: "Changelog" },
  { href: "/downloads", label: "Downloads" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the phone menu whenever the route changes (a link was followed).
  // Adjusting state during render, not in an effect, per React's guidance.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-5 sm:px-6">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div className="surface-float flex h-14 w-full max-w-xl items-center justify-between gap-3 rounded-xl pl-4 pr-2 sm:gap-4 sm:pl-5">
            <NextLink href="/" className="no-underline">
              <span className="flex items-center gap-2.5">
                <Logo size={34} />
                <span className="text-[15px] font-medium tracking-tight">Vivianne</span>
              </span>
            </NextLink>

            <div className="flex items-center gap-1.5 sm:gap-5">
              <span className="hidden items-center gap-5 sm:flex">
                <TextLink href="/labs">Labs</TextLink>
                <NavAccount />
              </span>
              <NextLink href="/downloads" className={buttonVariants({ size: "sm" })}>
                Download
              </NextLink>
              <Popover.Trigger
                aria-label={open ? "Close menu" : "Open menu"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "text-muted-foreground hover:text-foreground sm:hidden",
                })}
              >
                <Icon icon={open ? Cancel01Icon : Menu01Icon} size={18} />
              </Popover.Trigger>
            </div>
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            align="center"
            sideOffset={8}
            className="surface-float z-50 w-[var(--radix-popper-anchor-width)] animate-overlay-in rounded-3xl p-1.5 outline-none sm:hidden"
          >
            <nav aria-label="Menu">
              <ul className="flex flex-col">
                {menuLinks.map((l) => (
                  <li key={l.href}>
                    <NextLink
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex h-11 w-full items-center rounded-2xl px-3 text-sm font-medium text-foreground no-underline transition-colors duration-[var(--dur-fast)] hover:bg-accent focus-visible:bg-accent"
                    >
                      {l.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
              <div className="-mx-1.5 my-1.5 h-px bg-border/50" />
              <div className="flex h-11 items-center px-3">
                <NavAccount />
              </div>
            </nav>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </header>
  );
}
