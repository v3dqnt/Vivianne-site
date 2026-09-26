// Release history, shared by the changelog page and the homepage's
// "shipping" strip. Dates match the app repo's CHANGELOG.md.
export type Release = {
  id: string;
  version: string;
  status: string;
  date?: string;
  summary: string;
  notes: string[];
};

export const releases: Release[] = [
  {
    id: "v1-7-3",
    version: "v1.7.3",
    date: "2026-08-29",
    status: "Current",
    summary: "Programmatic tool calling, real document generation, auto-update, and a capability system that stops smaller models denying what they can do.",
    notes: [
      "Programmatic tool calling: the agent can write a short script that calls its own tools inline, in one turn, instead of a round-trip per call. Chaining several reads before a write, or looping over a list of files, now costs one step instead of ten.",
      "Document generation: it writes real PDF, Word, Excel, and PowerPoint files you can open in the corresponding app. Spreadsheets keep numbers numeric, so you can actually sum them.",
      "Auto-update, with release notes shown in-app after an upgrade, and an announcements channel for things worth saying between releases.",
      "A capability system built from the live tool list rather than a hand-written blurb. Smaller models were reading a stale description and concluding they had no browser tools while holding nine of them; the description can no longer drift from reality, and a router names the right tools for a request at the moment it is asked.",
      "The right sidebar and bottom bar are now tabbed and can host any view, so switching to the file tree no longer throws away what you were looking at.",
      "A usage screen with lifetime totals, streaks, and a year-long activity heatmap, all from real recorded token counts.",
      "The file browser previews anything: images, SVGs, and PDFs render properly instead of failing as invalid text, and you can paste or drag any file straight into the composer.",
      "Fixed: provider errors (out of credits, rate limits) ending a turn silently with the reason visible only in the log; the browser never auto-starting on Windows; image input being dropped on models that could have read it; model choice not surviving a restart; and file mentions only ever seeing the first workspace folder.",
    ],
  },
  {
    id: "v1-7",
    version: "v1.7",
    date: "2026-08-23",
    status: "Past release",
    summary: "A real persistent terminal, vision with an automatic OCR fallback, goal tracking, and a stalling bug fixed for good.",
    notes: [
      "A full performance pass, front to back: the panel resize drag, diff rendering, and message list no longer do unnecessary work on a long thread; the provider request context is no longer deep-cloned repeatedly on retries; token-budget checks no longer re-walk the whole transcript every turn; and the app now shuts down cleanly instead of leaving terminals, dev servers, and local models running as orphaned processes.",
      "Persistent terminal tools backed by the same PTY sessions the app's own terminal tabs use: open one, keep it alive across steps (an activated venv, a running dev server), type into it, read back what happened.",
      "Real vision for images, with an automatic OCR fallback when the selected model can't take image input at all, so a text-only model still gets the content.",
      "Goal tracking: a durable objective for a long task, separate from the moment-to-moment checklist, restated every turn so it survives compaction.",
      "Honest partial scans (a capped search says so, instead of quietly looking exhaustive), line-numbered file reads, and a list_tools call to see exactly what's registered right now.",
      "Fixed the bug behind every turn's chance of a 120-second stall, a 111MB read on every turn, New Chat not actually persisting, and the Review panel's diff view failing on real changes.",
      "Gesture control moved out into its own standalone app; the dead Rust orchestrator module removed; bash and powershell always stream live output now.",
    ],
  },
  {
    id: "v1-5",
    version: "v1.5",
    date: "2026-07-20",
    status: "Past release",
    summary: "AI Elements across the board, a real browser for web preview and search, and OpenAI's Responses API.",
    notes: [
      "Sources, Plan, Sandbox, Snippet, Web Preview, Queue, Checkpoints, and Confirmations: the full AI Elements set, wired into the agent's own tools.",
      "Web preview, web search, and web_fetch now route through a real (fingerprint-spoofed) browser process instead of an iframe or plain HTML scrape. It renders sites that block embedding, and launches itself automatically the first time it's needed.",
      "Direct OpenAI calls now speak the Responses API instead of the legacy Chat Completions endpoint, with true incremental streaming and reasoning summaries.",
      "One-click Docker install for the sandbox tool, and a fixed cron scheduler that was silently treating every automation's local time as UTC.",
      "A refreshed welcome screen with the real Vivianne mark, replacing the placeholder CLI command box.",
    ],
  },
  {
    id: "v1",
    version: "v1.0",
    status: "Past release",
    summary: "Initial release: the coding agent, the memory pipeline, and the multi-provider harness.",
    notes: [
      "A single tool-use loop: propose, run, verify, with a hard step ceiling.",
      "Three-tier memory pipeline: auto-capture, L1 fact extraction, L3 persona synthesis.",
      "Bounded delegation, one level deep, always traceable in the session log.",
      "One harness across model providers, with automatic context compaction.",
      "Runs on cloud model providers, with the SSM-MoE local architecture in development.",
    ],
  },
];
