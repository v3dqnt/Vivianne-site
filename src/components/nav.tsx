"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Popover } from "radix-ui";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/logo";
import { NavAccount } from "@/components/nav-account";
import { SoundToggle } from "@/components/site-sound";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

gsap.registerPlugin(ScrollTrigger);

const menuLinks = [
  { href: "/vivianne/changelog", label: "Changelog" },
  { href: "/vivianne/faq", label: "FAQ" },
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

  // The bar has no fill, so its ink follows whatever section sits under it.
  const [overInk, setOverInk] = useState(false);
  useEffect(() => {
    const over = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) over.add(entry.target);
          else over.delete(entry.target);
        }
        setOverInk(over.size > 0);
      },
      { rootMargin: "-32px 0px -95% 0px" },
    );
    document.querySelectorAll("[data-ink]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Clear over the hero; once content can pass beneath it, a solid fill keeps
  // the links readable over cards of either tone.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 24,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full text-foreground transition-[background-color] duration-[var(--dur-base)] ${
        overInk ? "ink-tokens" : ""
      } ${scrolled ? "bg-background/95" : ""}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-6">
        <NextLink href="/vivianne" className="no-underline">
          <span className="flex items-center gap-2.5">
            <Logo size={36} />
            <span className="text-[15px] font-medium tracking-tight">Vivianne</span>
          </span>
        </NextLink>

        <div className="flex items-center gap-1.5 sm:gap-5">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {menuLinks.map((l) => (
              <NextLink
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="text-sm font-medium text-foreground no-underline transition-opacity duration-[var(--dur-fast)] hover:opacity-70 aria-[current=page]:opacity-60"
              >
                {l.label}
              </NextLink>
            ))}
          </nav>
          <span className="hidden items-center sm:flex">
            <NavAccount />
          </span>
          <SoundToggle />
          <NextLink href="/vivianne/downloads" className={buttonVariants({ size: "sm" })}>
            Download
          </NextLink>

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger
              aria-label={open ? "Close menu" : "Open menu"}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "md:hidden",
              })}
            >
              <Icon icon={open ? Cancel01Icon : Menu01Icon} size={18} />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={8}
                className="surface-float z-50 w-60 animate-overlay-in rounded-3xl p-1.5 outline-none md:hidden"
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
        </div>
      </div>
    </header>
  );
}
