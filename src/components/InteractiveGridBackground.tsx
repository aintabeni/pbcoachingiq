import { useEffect, useRef } from "react";

/**
 * Full-bleed interactive grid background.
 * Cells near the cursor light up with the yellow accent.
 */
const CELL = 48; // px
const RADIUS = 140; // px — glow radius around cursor

const InteractiveGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;

      // Base grid lines
      ctx.strokeStyle = "hsla(60, 10%, 95%, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = i * CELL + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let j = 0; j <= rows; j++) {
        const y = j * CELL + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Highlight cells near cursor
      if (mouse.current.active) {
        const mx = mouse.current.x;
        const my = mouse.current.y;
        const cellRange = Math.ceil(RADIUS / CELL) + 1;
        const startCol = Math.max(0, Math.floor(mx / CELL) - cellRange);
        const endCol = Math.min(cols, Math.floor(mx / CELL) + cellRange);
        const startRow = Math.max(0, Math.floor(my / CELL) - cellRange);
        const endRow = Math.min(rows, Math.floor(my / CELL) + cellRange);

        for (let i = startCol; i <= endCol; i++) {
          for (let j = startRow; j <= endRow; j++) {
            const cx = i * CELL + CELL / 2;
            const cy = j * CELL + CELL / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > RADIUS) continue;
            const alpha = (1 - dist / RADIUS) * 0.35;
            ctx.fillStyle = `hsla(50, 95%, 58%, ${alpha})`;
            ctx.fillRect(i * CELL + 1, j * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Soft vignette so grid fades at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_85%)]" />
    </div>
  );
};

export default InteractiveGridBackground;
