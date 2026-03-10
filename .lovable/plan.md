

# Add Testimonials, Social Proof, and CTA Sections

## Overview
Port the **Testimonials** (circular carousel), **SocialProof** (feedback screenshots masonry grid), and **FinalCTA** sections from the [mind-game-dynamics](/projects/86828de2-0db5-4c36-bfd8-ee70b5617c22) project into this quiz funnel. These will be added below the video on the ScanningPage layout so every training plan page gets social proof + a CTA.

---

## What Gets Added

1. **Circular Testimonials Carousel** -- rotating player photos with quotes (11 players: Ahmed, Henrik, Erik-Aksel, Elias, Matheo, Filip, Ary, Emilie & Hannah, Anmar, Phillip, Muhammed)
2. **Social Proof Grid** -- masonry layout of 23 feedback screenshots from parents/players/coaches with a "Load More" button
3. **Final CTA** -- motivational closing copy with the InteractiveHoverButton (per project style guide)

---

## Technical Steps

### 1. Install dependencies
- `framer-motion` -- animations for testimonials and social proof
- `react-intersection-observer` -- scroll-triggered animations

### 2. Copy all assets from the other project
- 11 player avatar images (ahmed-ibrahim.png, henrik-hatlen.jpg, etc.)
- 23 feedback screenshot images (feedback-1.jpg through feedback-23.png)

### 3. Create components

**`src/components/ui/circular-testimonials.tsx`**
- Port the CircularTestimonials component from the other project
- Replace `react-icons` arrow icons with `lucide-react` (ArrowLeft/ArrowRight) since it's already installed

**`src/components/Testimonials.tsx`**
- Port the testimonials section with all 11 player entries
- Swap the CTA button from ButtonColorful to InteractiveHoverButton linking to `/apply`

**`src/components/SocialProof.tsx`**
- Port the feedback screenshot masonry grid
- Shows 6 initially with "Load More" to reveal all 23

**`src/components/FinalCTA.tsx`**
- Motivational closing copy ("Take Control of the Game")
- InteractiveHoverButton linking to `/apply`

### 4. Add circular testimonials CSS to `src/index.css`
- Add the `.circular-testimonial-*` styles needed for the carousel layout

### 5. Update `src/components/ScanningPage.tsx`
- Import and render Testimonials, SocialProof, and FinalCTA sections below the video and existing CTA
- This means all position-specific pages (scanning, technique, conditioning) automatically get these sections

