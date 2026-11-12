import type { Metadata, Viewport } from "next";
import "@/lab/index.css";

const description =
  "Nine Superintelligence (09) is an independent lab experimenting at the edge of AI: faster inference, cheaper compute, smarter models, and what comes after the LLM.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninesi.xyz"),
  title: "Nine Superintelligence",
  description,
  icons: { icon: "/nine-favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Nine Superintelligence", title: "Nine Superintelligence", description },
};

export const viewport: Viewport = { themeColor: "#05060a" };

export default function LabLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@300..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
