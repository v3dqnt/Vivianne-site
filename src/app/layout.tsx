import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Vivianne is a desktop AI agent and agentic harness for coding, math, science, and technology work. Hand work to a master agent that runs a team of specialist employee agents and swarms, with a real terminal, persistent memory, and any model: Anthropic, OpenAI, Google, OpenAI-compatible APIs, or local GGUF models offline.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivianne.dev"),
  title: {
    default: "Vivianne: the AI agent harness for code, math, and science",
    template: "%s | Vivianne",
  },
  description,
  applicationName: "Vivianne",
  keywords: [
    "AI agent",
    "AI coding agent",
    "agentic harness",
    "agent harness",
    "agentic AI",
    "desktop AI agent",
    "AI agent for Windows",
    "AI agent for macOS",
    "AI agent for math",
    "AI for science",
    "AI research assistant",
    "STEM AI assistant",
    "local LLM",
    "run local models offline",
    "GGUF",
    "bring your own model",
    "subagents",
    "multi-agent",
    "agent swarm",
    "AI agent team",
    "orchestrator agent",
    "multiplayer AI coding",
    "AI pair programming",
    "collaborative AI agent",
    "Claude Code alternative",
    "OpenAI compatible",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vivianne",
    title: "Vivianne: the AI agent harness for code, math, and science",
    description,
    images: [{ url: "/hero-interface.png", width: 1920, height: 1080, alt: "Vivianne mid-task" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivianne: the AI agent harness for code, math, and science",
    description,
    images: ["/hero-interface.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <SmoothScroll />
        <div className="grain" />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
