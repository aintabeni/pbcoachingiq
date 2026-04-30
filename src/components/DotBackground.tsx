import { cn } from "@/lib/utils";

/**
 * Full-bleed dot pattern background.
 * Uses theme tokens so it adapts to light/dark.
 */
const DotBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none bg-background"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:22px_22px]",
          "[background-image:radial-gradient(hsl(var(--foreground)/0.22)_1.2px,transparent_1.2px)]",
          "[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
        )}
      />
    </div>
  );
};

export default DotBackground;
