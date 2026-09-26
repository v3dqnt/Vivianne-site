import { Link } from "@heroui/react";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#capabilities", label: "Capabilities" },
      { href: "/#providers", label: "Models & providers" },
      { href: "/downloads", label: "Download" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/security", label: "Security" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "mailto:hello@vivianne.dev", label: "Contact" },
      { href: "mailto:security@v3dqnt.com", label: "Report a vulnerability" },
      { href: "https://github.com/v3dqnt/vivianne/releases", label: "Releases" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-alt">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="text-[15px] font-semibold tracking-tight">Vivianne</span>
            </div>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-body">
              The AI workspace that does the work, on your machine. Real tools, your choice of
              model, and every change put in front of you for review.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-mute">{c.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-body no-underline hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-mute sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Vivianne. All rights reserved.</span>
          <span>Made for Windows. Updates signed and delivered automatically.</span>
        </div>
      </div>
    </footer>
  );
}
