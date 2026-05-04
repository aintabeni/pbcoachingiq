## Changes

### 1. Add budget question to ApplicationForm

Add a new step after "goals" (step 7 of 7):
- **Label:** "How much are you willing to invest in your development?"
- **Type:** Single-select buttons (same style as position picker)
- **Options:** `< $50`, `$50 - $100`, `$200 - $500`, `$500 - $1,000`, `$1,000+`
- Update the zod schema to include `budget` as a required enum field

### 2. Replace booking widget with Calendly redirect

After form submission succeeds, instead of showing the GHL booking iframe, redirect the user to `https://calendly.com/pbcoachingiq/30min` in the same tab.

Remove the entire "booking" phase from `Apply.tsx` -- no more iframe, no postMessage listener, no booking widget mounting. The page becomes form-only.

### 3. Update edge function

Add `budget` to the schema and include it in the GHL payload (as a custom field and tag).

### 4. Clean up unused files

- Delete `src/components/TallyEmbed.tsx` (no longer used anywhere)

### Technical details

- `ApplicationForm.tsx`: Add budget step to STEPS array, update schema, on submit success call `window.location.href = "https://calendly.com/pbcoachingiq/30min"` instead of `onComplete()`
- `Apply.tsx`: Remove booking phase, iframe logic, postMessage listener. Simplify to just render the form. Remove `onComplete` prop since form handles redirect internally.
- `supabase/functions/apply-discovery/index.ts`: Add budget to BodySchema and GHL payload
