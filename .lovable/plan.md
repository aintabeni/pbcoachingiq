Move the "Get Your Free Training" InteractiveHoverButton from below the video thumbnail to above it on the Landing page (`src/pages/Landing.tsx`).

Current order:
1. Pre-headline
2. Headline
3. Description
4. Video thumbnail (clickable)
5. CTA button

New order:
1. Pre-headline
2. Headline
3. Description
4. CTA button
5. Video thumbnail (clickable)

Also adjust spacing (`mb-`) so the layout feels balanced — the CTA should sit between the description and the thumbnail with appropriate margins.