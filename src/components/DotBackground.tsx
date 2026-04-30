import { cn } from "@/lib/utils";

/**
 * Full-bleed dot pattern background.
 * Uses theme tokens so it adapts to light/dark.
 */
const DotBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none bg-background"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(hsl(var(--foreground)/0.18)_1px,transparent_1px)]"
        )}
      />
      {/* Radial fade so the dots melt into the background at the edges */}
      <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_85%)]" />
    </div>
  );
};

export default DotBackground;
