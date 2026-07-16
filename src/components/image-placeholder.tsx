import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

export function ImagePlaceholder({
  label,
  className,
  aspect = "aspect-video",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-inner)] border border-dashed border-hairline-strong bg-surface-soft text-mute ${className ?? ""}`}
    >
      <ImageSquare size={28} weight="light" />
      <span className="text-xs font-medium tracking-wide">{label}</span>
    </div>
  );
}
