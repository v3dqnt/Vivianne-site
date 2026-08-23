import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const sora = localFont({
  src: [
    { path: "../fonts/Sora-Variable.ttf", style: "normal" },
    { path: "../fonts/Sora-VariableItalic.ttf", style: "italic" },
  ],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivianne, one AI for every task on your computer",
  description:
    "Vivianne is a desktop AI agent for coding today, and science and office work next. A real terminal, a persistent memory, and dozens of connected model providers, moving toward a fully local architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
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
