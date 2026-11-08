import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SiteSound } from "@/components/site-sound";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "200 700",
  variable: "--font-general-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Vivianne is a desktop AI agent for code, math, and science: its own agent with any model or a local one, coding agents like Claude Code over the Agent Client Protocol, always-on assistants, and computer control.";

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
    "Agent Client Protocol",
    "ACP",
    "BYOK",
    "24/7 AI agents",
    "always-on AI agent",
    "plan mode",
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
    images: [{ url: "/hero-interface.png", width: 1617, height: 1005, alt: "Vivianne mid-task" }],
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
  themeColor: "#cfd1d5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col text-ink">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to Content
        </a>
        <SiteSound />
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
