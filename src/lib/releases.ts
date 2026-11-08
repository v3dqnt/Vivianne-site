// Every Vivianne release, newest first. Shared by the changelog page and
// the homepage’s changelog strip so the two never disagree.

export type Release = {
  id: string;
  /** ISO date the release shipped. */
  date: string;
  /** Short headline for compact listings. */
  title: string;
  version: string;
  status: string;
  summary: string;
  notes: string[];
};

export const releases: Release[] = [
  {
    id: "v1-9-1-rdv2",
    date: "2026-11-08",
    title: "Threads on their own branches, and a new project rail",
    version: "v1.9.1-rdv2",
    status: "Current",
    summary:
      "The left sidebar gives way to tabs. Every thread is its own agent on its own git branch, a new project rail holds the project, version control and context, and Vivianne has a new logo.",
    notes: [
      "Threads and tabs: open as many threads as you like in the tab bar. A new tab is a blank thread; file it under a project, or add a new one, from the project rail. Home groups threads by project, and the left sidebar is gone.",
      "One branch per thread: in a git project each thread works in its own worktree and branch, cut from where you were. A checkpoint is saved around every turn on a hidden ref, so you can see what a turn changed or roll it back without touching your branch. Merge or remove the branch from the rail.",
      "A new project rail: one card beside the chat with the project and its folders, version control (commit, create pull request, history, the pull requests a thread opened) and context. Large windows get a wide card; narrow ones stack the sections with dividers.",
      "Threads can work together: start, message, ask and interrupt other threads, up to five hops deep. A person's message always ends a chain.",
      "Compaction v2: long conversations are compacted by a call that reuses the cached prefix, so it costs a fraction of before and happens on its own. There is no Compact button.",
      "Steadier runs: tool arguments are checked first, broken tool calls are repaired, every tool has a time limit, queued messages survive a restart, and a thread stopped by a usage limit picks itself up when the limit lifts. Usage is recorded per thread.",
      "Errors show up in the chat as yellow checkpoints where the model stopped, instead of a red banner over the composer. The composer is quieter, with two colours and a plus for attachments, and icons are now Solar.",
      "Rail tabs: Overview, Files, Preview and Terminal, with a sliding selector. Files has a filter and per-language icons; Terminal is a real shell. /goal now lives in the composer.",
      "Motion: thinking states on the reasoning label, and streamed words fade in.",
      "For editors and scripts: app acp speaks the Agent Client Protocol, and run_script gets agent(), phase() and log().",
      "Safer files and processes: one writer per file, edits refused if the file changed, and child processes killed as a tree with credentials withheld.",
      "A new logo: the Vivianne tesseract, in the app icon, the taskbar and inside the app.",
      "Pre-release. Windows ships as an installer (NSIS); there is no MSI for this build.",
    ],
  },
  {
    id: "v1-9-0",
    date: "2026-10-25",
    title: "A command line, a vault, and cost-aware routing",
    version: "v1.9.0",
    status: "Past release",
    summary:
      "Viv Instant and the notch step aside for this release while the rest of the app grows: a real command line, stacked panels and Quick access, a keychain vault, cost-aware routing, and workflows.",
    notes: [
      "`viv`, Vivianne’s command line: `viv models ls|rm`, `viv hardware`, `viv load <model>` with GPU, context, port and KV flags, `viv ps`, `viv unload`, `viv logs`, `viv doctor`, `viv chat` and `viv run`. The commands start with no window, so they also work on a machine with no display.",
      "`app run \"<task>\"` runs one task with no window and writes the answer, transcript, steps, seconds and token counts to a JSON file. `--model auto` uses the cost-aware router, and every provider streams through the Rust code. `--headless` starts the app with nothing shown, for an always-on server. Built for benchmarks and scripts.",
      "Stacked panels: the right panel can show its panels one above another as cards, each with its own title, Expand and Close, and a draggable gap that is a real splitter. Anything you open while stacked joins the stack, including panels from mods.",
      "Quick access: the bottom panel opens on one-press tiles for Terminal, Files, Agents, Plan, Preview, Git review, Background tasks, Timeline, Memory and Multiplayer. Mods can add their own tiles, and Customize hides, shows and reorders them.",
      "Vault: store passwords, cards and secrets in your computer’s keychain. The agent sees labels, the site and a hint like “ending 4242”, never a value, and every fill into a browser field needs your approval, only works on https, and only on the site the entry is bound to.",
      "Cost-aware routing (beta): send background work such as summaries, memory upkeep, routines and read-only exploring to a small model while chat replies and planning stay on your chosen model, with tokens routed and the savings shown. Off by default.",
      "Workflows: chain prompts into steps, let a step stop and ask you first, and trigger a workflow on a schedule or when a file appears in a folder. Each run gets its own thread.",
      "The agent works in your real browser: when a Chromium browser is connected it researches there instead of falling back to search and fetch, and it can run JavaScript in a page and read the page’s console. Settings now lists the Chromium browsers installed here and which have the extension connected.",
      "Teammates report in summary cards: one plain sentence and a card with headline numbers, steps, findings, a callout for what needs you, and buttons for the likely next moves. Report-shaped replies in any chat become cards too.",
      "Settings gains NVIDIA and Nebius skill browsing with a scan before install, a cloud embedder for memory, Get models for local inference, dictation and read aloud, interactive answers, and Usage by model. Agent DMs now show the full conversation, plans and steps, and can go back to any message.",
      "Fixed: agents writing blank PDF and Word files when the model named fields differently, provider rate limits ending an agent’s turn silently, OpenAI-compatible hosts reporting zero tokens, and scheduled automations doing nothing (they run again as Workflows).",
      "Viv Instant and the notch are off in this release. Dictation in the message box and the computer-control Stop notch are unchanged; they come back in a later release.",
    ],
  },
  {
    id: "v1-8-2",
    date: "2026-10-11",
    title: "Mods, themes, and robot faces",
    version: "v1.8.2",
    status: "Past release",
    summary:
      "Mods you can build yourself, a full appearance and theme system, rebindable shortcuts and saved layouts, agent DMs, and a robot face for every agent.",
    notes: [
      "Mods: a folder with a `mod.json` and web files adds dock panels, sidebar sections, chat components, tools and themes, all sandboxed and permission-checked. Nothing runs until you turn it on, and a mod that later asks for more is switched off until you agree again. Start from working presets or ask Vivianne to build one.",
      "Appearance: follow the system light or dark, any accent colour, five fonts, whole-app size from 90% to 125%, corner radius, chat density and width, and a wallpaper with adjustable glass and dimming.",
      "Theme builder: edit every colour for light and dark with a live preview and contrast checks, then import or export as `.vivtheme.json`.",
      "Every keyboard shortcut is listed and rebindable with clash warnings, two new layouts (Coding and Research) ship, and you can save your own arrangements and choose which one opens at launch.",
      "Agent DMs accept dropped, pasted and attached files and images, with the model picker next to the message box.",
      "Every agent has its own robot head, and its face shows what it is doing: thinking, searching, working, waiting on you, happy when done. Idle heads are still frames, so a long list costs nothing.",
      "Playbooks are now mods. Existing playbooks convert on first launch, tool playbooks keep working, panel playbooks become mod panels, and the old folder is kept.",
      "Fixed Windows release builds failing on a clean machine while looking for the speech engine’s DLLs. 1.8.1 was never published for Windows; this is that fix.",
    ],
  },
  {
    id: "v1-8-0",
    date: "2026-10-09",
    title: "macOS, connections, and an always-on notch",
    version: "v1.8.0",
    status: "Past release",
    summary:
      "macOS is back as a universal build, around 120 apps connect in one click, the notch stays on, science arrives in chat, and memory is rebuilt.",
    notes: [
      "macOS, back to 10.15 Catalina: Intel and Apple silicon in one universal build, with computer control on the Accessibility API, the notch under the menu bar, and a permissions walkthrough for Accessibility, Screen Recording, Microphone and Automation.",
      "Connections: about 120 everyday apps (mail, calendars, docs, CRMs, design, finance, developer tools) connect in one click with a browser sign-in. Hand-written MCP setup stays under Advanced.",
      "An always-on notch shows every agent at work and what each one is doing. You can speak to it and hear the answer while the main window lives in the background.",
      "Science in chat: chemical structures and reactions, 3D molecules and proteins, biology diagrams, physics graphs and interactive diagrams, and Greek letters and chemical equations anywhere. The agent checks each diagram before it answers.",
      "Teams and bots: persistent teammates with a shared room, DMs, routines, rules and their own memory, each with a model chosen on its page.",
      "Plan mode is rebuilt around research, review, approve, then carry out, and long tasks survive failures, restarts and hours of work.",
      "Use your ChatGPT plan with Sign in with ChatGPT, and let Vivianne work in your own browser with the Helium extension.",
      "Memory rebuilt: facts that change are dated and closed rather than overwritten, what it learns about you is shared across projects, finished sessions become searchable episodes, and search by meaning runs offline with EmbeddingGemma or MiniLM.",
      "Fixed: memory search ignoring almost every question, the offline embedding model never installing, stale search entries after a memory was replaced, and the app exiting at startup when the speech model loaded on some machines.",
    ],
  },
  {
    id: "v1-7-3",
    date: "2026-08-29",
    title: "Programmatic tool calling and real documents",
    version: "v1.7.3",
    status: "Past release",
    summary:
      "Programmatic tool calling, real document generation, auto-update, and a capability system that stops smaller models denying what they can do.",
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
    date: "2026-08-24",
    title: "A persistent terminal and real vision",
    version: "v1.7",
    status: "Past release",
    summary:
      "A real persistent terminal, vision with an automatic OCR fallback, goal tracking, and a stalling bug fixed for good.",
    notes: [
      "A full performance pass, front to back: the panel resize drag, diff rendering, and message list no longer do unnecessary work on a long thread; the provider request context is no longer deep-cloned repeatedly on retries; token-budget checks no longer re-walk the whole transcript every turn; and the app now shuts down cleanly instead of leaving terminals, dev servers, and local models running as orphaned processes.",
      "Persistent terminal tools backed by the same PTY sessions the app’s own terminal tabs use: open one, keep it alive across steps (an activated venv, a running dev server), type into it, read back what happened.",
      "Real vision for images, with an automatic OCR fallback when the selected model can’t take image input at all, so a text-only model still gets the content.",
      "Goal tracking: a durable objective for a long task, separate from the moment-to-moment checklist, restated every turn so it survives compaction.",
      "Honest partial scans (a capped search says so, instead of quietly looking exhaustive), line-numbered file reads, and a list_tools call to see exactly what’s registered right now.",
      "Fixed the bug behind every turn’s chance of a 120-second stall, a 111MB read on every turn, New Chat not actually persisting, and the Review panel’s diff view failing on real changes.",
      "Gesture control moved out into its own standalone app; the dead Rust orchestrator module removed; bash and powershell always stream live output now.",
    ],
  },
  {
    id: "v1-5",
    date: "2026-07-20",
    title: "AI Elements and a real browser",
    version: "v1.5",
    status: "Past release",
    summary:
      "AI Elements across the board, a real browser for web preview and search, and OpenAI’s Responses API.",
    notes: [
      "Sources, Plan, Sandbox, Snippet, Web Preview, Queue, Checkpoints, and Confirmations: the full AI Elements set, wired into the agent’s own tools.",
      "Web preview, web search, and web_fetch now route through a real (fingerprint-spoofed) browser process instead of an iframe or plain HTML scrape. It renders sites that block embedding, and launches itself automatically the first time it’s needed.",
      "Direct OpenAI calls now speak the Responses API instead of the legacy Chat Completions endpoint, with true incremental streaming and reasoning summaries.",
      "One-click Docker install for the sandbox tool, and a fixed cron scheduler that was silently treating every automation’s local time as UTC.",
      "A refreshed welcome screen with the real Vivianne mark, replacing the placeholder CLI command box.",
    ],
  },
  {
    id: "v1",
    date: "2026-07-14",
    title: "The first release",
    version: "v1.0",
    status: "Past release",
    summary:
      "Initial release: the coding agent, the memory pipeline, and the multi-provider harness.",
    notes: [
      "A single tool-use loop: propose, run, verify, with a hard step ceiling.",
      "Three-tier memory pipeline: auto-capture, L1 fact extraction, L3 persona synthesis.",
      "Bounded delegation, one level deep, always traceable in the session log.",
      "One harness across model providers, with automatic context compaction.",
      "Runs on cloud model providers, with the SSM-MoE local architecture in development.",
    ],
  },
];

export function formatReleaseDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
