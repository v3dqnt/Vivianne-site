import ReflectiveCard from "@/components/reflective-card/ReflectiveCard";
import { cn } from "@/lib/cn";

/**
 * A plate of brushed dark metal (React Bits ReflectiveCard): it tilts toward
 * the pointer and catches a highlight. Its contents use the ink tokens, so
 * anything inside reads as it would on the dark sections of the site.
 */
export function MetalCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-shimmer className={cn("h-full", className)}>
      <ReflectiveCard theme="dark" width="100%" height="100%" radius={16} roughness={0.42} shine={0.5} tiltStrength={5} intro={false}>
        <div className="ink-tokens h-full p-1.5">{children}</div>
      </ReflectiveCard>
    </div>
  );
}
