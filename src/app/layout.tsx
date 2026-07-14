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
  title: "Vivianne, one local AI for every task on your computer",
  description:
    "Vivianne runs a full AI system on your own hardware, for coding today and science and office work next, with nothing leaving your machine.",
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
