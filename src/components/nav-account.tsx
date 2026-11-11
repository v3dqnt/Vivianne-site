"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { DropdownMenu } from "radix-ui";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { supabase } from "@/lib/supabase";

/** Signed-in/out state for the navbar — a small client island, since it's
 * the one piece that needs the browser's persisted Supabase session
 * (`supabase.auth.getSession()` reads whatever `/sign-in` last wrote to
 * localStorage; `onAuthStateChange` keeps it live across tabs).
 *
 * Signed in renders as a fixed-size avatar chip, not the raw email inline —
 * an email of arbitrary length would overflow the nav. The email lives in
 * the dropdown instead, where there's room for it. */
export function NavAccount() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // `undefined` = still checking — render nothing rather than a flash of
  // "Sign in" that immediately swaps to the signed-in state.
  if (email === undefined) return null;

  if (email === null) {
    return (
      <NextLink
        href="/vivianne/sign-in"
        className="text-sm font-medium text-foreground no-underline transition-opacity duration-[var(--dur-fast)] hover:opacity-70"
      >
        Sign in
      </NextLink>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Account"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground outline-none transition-colors duration-[var(--dur-fast)] hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        {email.charAt(0).toUpperCase()}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="surface-float z-50 min-w-48 max-w-64 animate-overlay-in rounded-3xl p-1.5 outline-none"
        >
          <DropdownMenu.Label className="truncate px-3 py-2.5 text-xs text-muted-foreground" title={email}>
            {email}
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="-mx-1.5 my-1.5 h-px bg-border/50" />
          <DropdownMenu.Item
            onSelect={() => void supabase.auth.signOut()}
            className="flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium text-foreground outline-none data-[highlighted]:bg-accent"
          >
            <Icon icon={Logout01Icon} size={16} className="text-muted-foreground" />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
