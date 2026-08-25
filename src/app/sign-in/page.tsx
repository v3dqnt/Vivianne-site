"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { supabase } from "@/lib/supabase";

type Mode = "signIn" | "signUp";

/** Builds the app's local callback URL with the session appended as query
 * params (the app's own `TcpListener` reads them off the request line, not
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
        You&apos;re signed in. You can close this tab.
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

      <div className="flex gap-1 rounded-full bg-surface-soft p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode("signIn")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${mode === "signIn" ? "bg-background shadow-sm" : "text-mute"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signUp")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${mode === "signUp" ? "bg-background shadow-sm" : "text-mute"}`}
        >
          Create account
        </button>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <TextField className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Email</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[var(--radius-inner)] border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ink"
          />
          <FieldError className="text-xs text-red-600" />
        </TextField>

        <TextField className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Password</Label>
          <Input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[var(--radius-inner)] border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ink"
          />
          <FieldError className="text-xs text-red-600" />
        </TextField>

        <Button type="submit" isDisabled={loading || !email || password.length < 6} className="mt-1">
          {loading ? "Working…" : mode === "signIn" ? "Sign in" : "Create account"}
        </Button>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-2xl font-medium tracking-tight">Sign in to Vivianne</h1>
      <p className="mt-2 text-sm leading-relaxed text-mute">One account, synced across every device you install Vivianne on.</p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
