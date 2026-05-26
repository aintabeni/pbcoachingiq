## Goal

Stop the Calendly iframe from showing its own internal scrollbar on `/book-call` (and the `/thank-you` fallback section) by making the embed container tall enough to fit Calendly's full content at every step (intro, date/time, form).

## Why it's still scrolling

Calendly's inline widget renders inside an iframe whose height is controlled by the host container. Right now we set `minHeight: 760px` (BookCall) / `720px` (ThankYou). Calendly's booking form step needs ~1000–1150px on desktop and more on mobile, so the iframe content overflows and Calendly shows its own scrollbar.

There is no reliable public postMessage event for "page_height" on the standard inline widget, so the robust fix is to give the container a generous min-height that always fits the tallest Calendly step.

## Changes

### 1. `src/components/CalendlyEmbed.tsx`

- Replace the fixed pixel `minHeight` style with a responsive min-height that fits Calendly's tallest step:
  - Mobile: `min-h-[1400px]` (Calendly stacks vertically on narrow widths)
  - `md:min-h-[1100px]` desktop default
- Keep `height: auto`, `overflow: visible`.
- Keep the `minHeight` prop as an optional override (default raised so callers don't have to think about it), but apply it as a floor on top of the Tailwind classes.

### 2. `src/pages/BookCall.tsx`

- Drop the explicit `minHeight={760}` (let the new defaults apply).
- Keep `glass` container with `overflow-visible`; remove any height constraint.
- Make sure the outer page wrapper doesn't cap height (it already uses `min-h-screen`, no change needed).

### 3. `src/pages/ThankYou.tsx`

- Drop the explicit `minHeight={720}` on the fallback `CalendlyEmbed` so it uses the same generous defaults.

## Notes

- No backend changes. `mark-booked` flow and redirect logic stay exactly as they are.
- No new dependencies. Pure CSS/height fix.
