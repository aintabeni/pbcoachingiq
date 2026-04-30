## Add `/training` Landing Page

A new standalone landing page for an upcoming live training event, themed with the existing yellow brand color and using three Google fonts (Space Grotesk, Inter, Manrope).

### What it looks like

Two-column hero (stacks on mobile), matching the reference layout but recolored from blue → yellow:

- Left column:
  - Eyebrow: "THE SMART PLAYER BLUEPRINT" (yellow, Space Grotesk, uppercase, tracked)
  - Meta row: red live dot + "LIVE TRAINING" · "MAY 30TH, 2026 · 7:00 PM EST" (Manrope, muted)
  - Headline (Space Grotesk, black weight, large, mixed white + yellow):
    "How to stop being the BAD PLAYER who crumbles under pressure and become the STAR PLAYER your team depends on. IN UNDER 60 MINUTES I WILL GIVE YOU THE BLUEPRINT."
    (the highlighted phrases rendered in yellow)
  - Sub-headline (Inter): "I went from the 9th division in Norway to a professional contract in Romania by changing how I think. I will show you how to do the same without being the fastest player, the strongest kid, or a natural talent."
  - CTA button (Manrope, yellow filled, rounded): "SAVE MY FREE SPOT →" with small caption beneath "↓ MAY 30TH, 2026 · 7:00 PM EST"
  - Social proof row: small avatar stack + "125+ already registered" (Inter)
- Right column:
  - Decorative card with a "LIVE · MAY 30" pill in the top-left. Uses a placeholder image (existing `vsl-thumbnail.png`) inside a rounded, subtly bordered card with yellow glow — keeps the same compositional weight as the reference image without needing a new asset.

Background uses the existing dark theme (no grid overlay needed; the existing `cool-yellow-gradient.avif` body bg already provides depth).

### Files

1. **`src/index.css`** — extend the Google Fonts `@import` to also load Space Grotesk (400–800) and Manrope (400–800). Add three utility classes: `.font-space-grotesk`, `.font-inter`, `.font-manrope`.

2. **`src/pages/Training.tsx`** (new) — the page component described above. CTA links to `/apply` (consistent with other VSL pages per the existing pattern). Uses Tailwind + the new font utility classes. Reuses `glass`, `text-gradient-yellow`, `glow-yellow`, and `fade-in` utilities already in the project.

3. **`src/App.tsx`** — register the new route:
   ```tsx
   <Route path="/training" element={<Training />} />
   ```

### Notes / decisions

- CTA destination: routes to `/apply` (the booking widget), matching every other VSL/landing CTA in the codebase. If you'd rather it scroll to an on-page registration form or open a different URL, say the word.
- Avatars in the social-proof row will use 3 small colored circles with initials (no new image assets needed).
- The right-side "person" image from your reference is replaced with the existing `vsl-thumbnail.png` placeholder so we don't need to source a new photo. Easy to swap later by uploading a new image.
- Date is hard-coded to **May 30, 2026 · 7:00 PM EST** as requested.
