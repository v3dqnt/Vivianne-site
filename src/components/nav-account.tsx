"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@heroui/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { supabase } from "@/lib/supabase";

/** Signed-in/out state for the navbar — a small client island inside the
 * otherwise-static `Nav`, since it's the one piece that needs the browser's
 * persisted Supabase session (`supabase.auth.getSession()` reads whatever
 * `/sign-in` last wrote to localStorage; `onAuthStateChange` keeps it live
 * across tabs without a manual refresh).
 *
 * Signed in renders as a fixed-size avatar chip, not the raw email inline —
 * the nav is a fixed-width pill, and an email of arbitrary length sitting
 * directly in it either overflows or forces an ugly truncation the pill
 * wasn't laid out for. The email lives in the dropdown instead, where there's
 * room for it. */
export function NavAccount() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setOpen(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // `undefined` = still checking — render nothing rather than a flash of
  // "Sign in" that immediately swaps to the signed-in state.
  if (email === undefined) return null;

  if (email === null) {
    return <Link href="/sign-in">Sign in</Link>;
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account"
        aria-expanded={open}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
      >
        {initial}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+10px)] w-56 origin-top-right rounded-[var(--radius-inner)] border border-hairline bg-background p-1.5 shadow-[0_1px_2px_rgb(17_17_17/0.04),0_12px_32px_rgb(17_17_17/0.12)]"
          role="menu"
        >
          <p className="truncate px-2.5 py-2 text-xs text-mute" title={email}>
            {email}
          </p>
          <div className="my-1 h-px bg-hairline" />
          <button
            type="button"
            role="menuitem"
            onClick={() => void supabase.auth.signOut()}
            className="flex w-full items-center gap-2 rounded-[calc(var(--radius-inner)-6px)] px-2.5 py-2 text-left text-sm text-ink transition-colors hover:bg-surface-soft"
          >
            <SignOut size={15} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
