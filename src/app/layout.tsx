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
  title: "Vivianne, the AI workspace that does the work",
  description:
    "Vivianne is a desktop AI agent that writes code, runs commands, drives a browser and produces finished documents, with the model you choose and every change shown to you for review.",
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
