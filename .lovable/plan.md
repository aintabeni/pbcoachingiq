

## Add Technique Pages + Update Quiz Flow

### Overview
Create 3 new technique-specific VSL pages (defenders, attackers, midfielders) and update the quiz so that step 2 only shows "Scanning" and "Technique" as options. When "Technique" is selected, the user is routed to the corresponding technique page based on their position from step 1.

### Changes

#### 1. Create 3 new technique pages
Each reuses the existing `ScanningPage` component with technique-focused copy:

- **`src/pages/TechniqueDefenders.tsx`** -- Video: `https://youtu.be/-rzdFQy2WEY?si=N1P3BT2iazU_G--c`, headline tailored for defenders struggling with technique.
- **`src/pages/TechniqueAttackers.tsx`** -- Video: `https://youtu.be/CDW8epyV4y8?si=f2wHO0ThTxudQ6LY`, headline tailored for attackers.
- **`src/pages/TechniqueMidfielders.tsx`** -- Video: `https://youtu.be/uCA-4FOz5Vs?si=f5nSt7S2IkMrX7q9`, headline tailored for midfielders.

The headline in `ScanningPage` is currently hardcoded. The component already accepts `preHeadline`, `headline`, `description`, and `ctaText` props but the `h1` content is hardcoded and ignores the `headline` prop. This will be fixed so the headline is dynamic.

#### 2. Fix ScanningPage to use the `headline` prop
Currently the h1 text is hardcoded. Update it to render the passed `headline` prop so each page can have its own headline.

#### 3. Update Quiz step 2 options
Reduce the `struggles` array to only two options:
- "Technique"  
- "Scanning"

#### 4. Update Quiz routing logic
Add technique routes to `pitchPositions` and update `handleFinish`:
- If "Scanning" is selected, navigate to the existing scanning route (based on position).
- If "Technique" is selected, navigate to the corresponding technique route (`/technique-attackers`, `/technique-midfielders`, `/technique-defenders`).

Each pitch position entry will store both a `scanningRoute` and a `techniqueRoute`.

#### 5. Register new routes in App.tsx
Add 3 new routes:
- `/technique-attackers` renders `TechniqueAttackers`
- `/technique-midfielders` renders `TechniqueMidfielders`
- `/technique-defenders` renders `TechniqueDefenders`

### Technical Details

**Files created:** `src/pages/TechniqueDefenders.tsx`, `src/pages/TechniqueAttackers.tsx`, `src/pages/TechniqueMidfielders.tsx`

**Files modified:**
- `src/components/ScanningPage.tsx` -- Replace hardcoded h1 with `{headline}` prop usage
- `src/pages/Quiz.tsx` -- Update `pitchPositions` to include `techniqueRoute`, reduce struggles to 2 options, update `handleFinish` to route based on selected struggle
- `src/App.tsx` -- Add 3 new route entries
