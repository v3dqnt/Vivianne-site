import { Link } from "@heroui/react";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/downloads", label: "Downloads" },
      { href: "/changelog", label: "Changelog" },
      { href: "/#harness", label: "Features" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Use it for",
    links: [
      { href: "/#coding", label: "Agentic coding" },
      { href: "/#science", label: "Science and maths" },
      { href: "/#local", label: "Local models" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "https://github.com/v3dqnt/vivianne", label: "GitHub" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "mailto:hello@vivianne.dev", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-chrome">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={16} />
            <span className="text-[15px] font-medium tracking-tight">Vivianne</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-body">
            A desktop AI agent harness for coding, science and maths. It runs
            on your machine and works with the model you choose.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-ink">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-body no-underline transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
