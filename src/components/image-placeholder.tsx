import { Image01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";

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
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-hairline-strong bg-surface-soft text-mute ${className ?? ""}`}
    >
      <Icon icon={Image01Icon} size={24} strokeWidth={1.5} />
      <span className="text-xs font-medium tracking-wide">{label}</span>
    </div>
  );
}
