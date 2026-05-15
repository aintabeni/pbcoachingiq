# Quiz Step Completion Animation

Add a brief (~600ms), creative confirmation moment after the user makes a choice on each `/quiz` step, before the progress bar updates and the next step renders.

## The animation concept: "Lock-in pulse"

A two-beat micro-interaction that feels native to the football/precision theme:

1. **Beat 1 (0–250ms)** — The selected element ignites:
   - Selected pitch dot (Step 1) or option button (Step 2) scales up to ~1.15x with a yellow `glow-yellow` halo expanding outward (radial ring fading to 0 opacity).
   - All non-selected options fade to ~30% opacity and slightly desaturate.

2. **Beat 2 (250–500ms)** — Confirmation mark:
   - A small yellow checkmark (SVG) draws in over the selected element using `stroke-dasharray` animation.
   - Subtle haptic-style "tick" via a quick 1px translate-y bounce.

3. **Beat 3 (500–600ms)** — Handoff:
   - Selected element settles back to 1.0x as the whole step content fades out (`fade-out`), then progress bar animates and Step 2 slides in.

## Implementation

**File:** `src/pages/Quiz.tsx`

- Add a `confirming` state (`boolean`) plus `confirmedIndex` / `confirmedStruggle` so we know what to highlight during the animation.
- On `selectPosition(i)`: set `confirmedIndex=i` + `confirming=true`, wait 600ms via `setTimeout`, then advance `setStep(2)` and reset.
- On `selectStruggle(s)` (new auto-advance behavior on Step 2 click — currently requires CTA): same flow, then call `handleFinish` after 600ms. Keep the CTA as fallback but trigger animation on selection.
  - *Alternative:* keep the CTA-driven flow and only run the animation on CTA click. Default to auto-advance on selection for consistency with Step 1.
- Apply conditional classes during `confirming`:
  - Selected element: `scale-110 animate-[lockin-pulse_500ms_ease-out]` + checkmark overlay.
  - Others: `opacity-30 grayscale transition-all duration-300`.
- Render a small absolutely-positioned SVG checkmark over the selected element with a `stroke-dashoffset` keyframe.

**File:** `tailwind.config.ts`

Add keyframes + animation utilities:

```ts
keyframes: {
  "lockin-pulse": {
    "0%":   { transform: "scale(1)",    boxShadow: "0 0 0 0 hsl(var(--primary) / 0.6)" },
    "40%":  { transform: "scale(1.18)", boxShadow: "0 0 0 14px hsl(var(--primary) / 0)" },
    "100%": { transform: "scale(1.08)", boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
  },
  "check-draw": {
    "0%":   { strokeDashoffset: "24" },
    "100%": { strokeDashoffset: "0" },
  },
},
animation: {
  "lockin-pulse": "lockin-pulse 500ms ease-out forwards",
  "check-draw":   "check-draw 350ms ease-out 200ms forwards",
},
```

## Notes

- Total budget 600ms matches the requested "brief pause" feel without making the funnel feel sluggish.
- Reuses existing `--primary` (yellow) and `glow-yellow` tokens — no new colors.
- No new dependencies; pure Tailwind keyframes + React state.
- Respects the project rule that the brand logo stays off `/quiz`; we only touch interaction feedback.
