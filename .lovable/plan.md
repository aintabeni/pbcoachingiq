

## Animated Position Guide on Quiz Pitch

Add a randomly cycling highlight/pulse effect that moves between pitch positions, visually demonstrating to users how to tap the circles.

### How it works

1. A `useEffect` sets up an interval (every 1.5s) that picks a random pitch position index and stores it as `highlightedIndex` state.
2. The highlighted position gets a special pulsing ring animation (similar to the existing ping effect) around its dot, drawing the user's eye.
3. When the user selects a position, the cycling animation stops (clear the interval) so it doesn't distract after they've understood the interaction.
4. The highlight is purely visual -- a scaling/pulsing ring behind the dot -- and doesn't interfere with selection state or styling.

### Technical Details

**File: `src/pages/Quiz.tsx`**

- Add `highlightedIndex` state and a `useEffect` with `setInterval` that randomly picks a position index every ~1.5 seconds.
- Clear the interval when `selectedPositions.length > 0` (user has tapped).
- On each position dot, if `i === highlightedIndex` and nothing is selected yet, render an extra pulsing ring element (using `animate-ping` with primary/destructive color) behind the dot to guide attention.
- Remove the static pulsing dot from the tap-hint text area since the pitch itself now demonstrates the interaction.

