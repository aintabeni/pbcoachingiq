## Goal
Add visible vertical margin between the hero section and the scrolling marquee strip on `/training`.

## Problem
`TrainingMarquee` currently uses `marginTop: -60` which pulls the strip up into the hero. On desktop (with the hero now sized to `lg:min-h-screen`), this causes the marquee to crowd the hero's CTA area.

## Change
In `src/components/TrainingMarquee.tsx` (line 95), update the wrapper's `marginTop` from `-60` to `40` (and keep `marginBottom: 60`).

This gives ~40px of clean space between the hero CTA/image and the rotated marquee strip, without affecting the rest of the page rhythm.

## Files
- `src/components/TrainingMarquee.tsx` — update one inline style value
