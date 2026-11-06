"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToggleGroup } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { supabase } from "@/lib/supabase";

type Mode = "signIn" | "signUp";

/** Builds the app’s local callback URL with the session appended as query
 * params (the app’s own `TcpListener` reads them off the request line, not
 * the fragment — a fragment is never sent in an HTTP request at all). */
function buildRedirect(redirectTo: string, state: string, session: { access_token: string; refresh_token: string; expires_at?: number }) {
  const url = new URL(redirectTo);
  url.searchParams.set("access_token", session.access_token);
  url.searchParams.set("refresh_token", session.refresh_token);
  if (session.expires_at) url.searchParams.set("expires_at", String(session.expires_at));
  url.searchParams.set("state", state);
  return url.toString();
}

function SignInForm() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect_to");
  const state = params.get("state");
  const fromApp = Boolean(redirectTo && state);

  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmNotice, setConfirmNotice] = useState(false);
  const [done, setDone] = useState(false);

  const complete = (session: { access_token: string; refresh_token: string; expires_at?: number } | null) => {
    if (!session) return;
    if (fromApp && redirectTo && state) {
      window.location.href = buildRedirect(redirectTo, state, session);
    } else {
      setDone(true);
    }
  };

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === "signIn") {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        complete(data.session);
      } else {
        const { data, error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        if (data.session) {
          complete(data.session);
        } else {
          // Email confirmation is on for this project — no session yet.
          setConfirmNotice(true);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <p className="text-sm leading-relaxed text-body">
        You’re signed in. You can close this tab.
      </p>
    );
  }

  if (confirmNotice) {
    return (
      <p className="text-sm leading-relaxed text-body">
        Check your email to confirm your account, then come back to this page and sign in.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {fromApp && (
        <p className="text-sm leading-relaxed text-mute">Signing in for Vivianne on your computer.</p>
      )}

      <ToggleGroup.Root
        type="single"
        value={mode}
        onValueChange={(v) => v && setMode(v as Mode)}
        aria-label="Sign in or create an account"
        className="flex h-9 w-fit items-center gap-0.5 rounded-full bg-muted p-1 ring-1 ring-border"
      >
        {([
          ["signIn", "Sign in"],
          ["signUp", "Create account"],
        ] as const).map(([value, label]) => (
          <ToggleGroup.Item
            key={value}
            value={value}
            className="h-full rounded-full px-3 text-sm font-medium text-foreground/60 outline-none transition-colors duration-[var(--dur-fast)] hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 data-[state=on]:bg-input/40 data-[state=on]:text-foreground"
          >
            {label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading || !email || password.length < 6} className="mt-1">
          {loading ? "Working…" : mode === "signIn" ? "Sign in" : "Create account"}
        </Button>

        {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="type-h3">Sign in to Vivianne</h1>
      <p className="mt-2 text-sm leading-relaxed text-mute">One account, synced across every device you install Vivianne on.</p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
