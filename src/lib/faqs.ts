// Questions for the /faq page, also emitted as FAQPage structured data.

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is an agentic harness?",
    a: "A language model on its own only produces text. An agent harness is the runtime around it: the loop that plans and calls tools, manages context and memory, asks for approval before risky actions, and checkpoints work so it can resume. Vivianne is a harness you install on your computer, so any capable model becomes an agent that finishes real tasks.",
  },
  {
    q: "What are master and employee agents?",
    a: "You hand a task to the master agent, which plans it and staffs a team of employee agents. Each employee is a specialist scoped to its own part of the project, with its own files and tools, and either does the work itself or runs a swarm of subagents. Employees report back to the master, and nothing is delegated until you approve the team.",
  },
  {
    q: "Can two people work together in Vivianne?",
    a: "Multiplayer is coming soon. Two people pair their Vivianne apps with a short code over a direct, encrypted peer-to-peer connection, follow each other's agent sessions turn by turn, and chat to divide up the work, with no account or central server required.",
  },
  {
    q: "Is Vivianne an AI coding agent?",
    a: "Yes. Coding is what it does best today: it reads and edits your codebase, runs commands in a real terminal, delegates big jobs to subagents, and shows every file change for review. Math, science, and research workflows are being built on the same harness.",
  },
  {
    q: "Can Vivianne help with math and science?",
    a: "It can already write and run code to check calculations, analyse data, and produce real documents. Dedicated math and science workflows, like inline charts, diagrams, and literature review, are in progress and will ship in upcoming releases.",
  },
  {
    q: "Which AI models does it work with?",
    a: "Anthropic, OpenAI, Google, and a dozen more providers, plus any OpenAI-compatible endpoint. You can switch models mid-session, or run a local GGUF model entirely offline.",
  },
  {
    q: "Can I run it fully offline with a local model?",
    a: "Yes. Point Vivianne at a GGUF model file on disk and it runs inference itself, with no API key and no network connection required.",
  },
  {
    q: "What platforms does it run on?",
    a: "Windows today. macOS and Linux builds are on the way.",
  },
];
