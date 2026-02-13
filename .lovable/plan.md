

## Visual Football Pitch Position Selector

Replace the current list-based position selector in the quiz with an interactive football pitch formation layout, matching the reference image.

### What Changes

**Step 1 of the quiz** will show a top-down football pitch formation with clickable position dots arranged in a realistic 4-1-2-1-2 / 4-3-3 hybrid layout. Each position is a glowing dot with a label (ST, CAM, LW, RW, CM, DM, LB, CB, CB, RB, GK). Clicking a dot selects it (yellow glow instead of red). Multi-select stays supported.

**Step 2** remains the same (biggest struggle question).

The progress bar at the top will change from small pill indicators to a full-width segmented bar (yellow for completed, grey for remaining), with "Step 1 of 2" text above it.

### Layout

The positions will be placed using absolute/relative positioning within a container to mirror a real pitch formation:

```text
                    ST
                   CAM
            LW             RW
                    CM
                    DM
         LB    CB    CB    RB
                    GK
```

### Position Mapping (preserved from current logic)

- ST, LW, RW --> /scanning-attackers
- CAM, CM, DM --> /scanning-midfielders  
- CB, LB, RB, GK --> /scanning-defenders

### Visual Details

- Each position: a glowing red/coral dot (~12px) with label text above it
- Selected state: dot turns yellow with a yellow glow effect
- Dark background (already handled by the app theme)
- No pitch lines needed -- just the dots on the dark background like the reference
- Responsive: scales down on mobile while maintaining formation shape

### Technical Details

All changes are in `src/pages/Quiz.tsx` only:
- Replace the positions array with pitch-coordinate data (percentage-based x/y positioning)
- Replace the list rendering with an absolutely-positioned container
- Update the progress bar UI to a full-width segmented bar
- Map new position labels (ST, CAM, LW, RW, CM, DM, LB, CB, RB, GK) to the existing route logic

