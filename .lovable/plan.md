
# Native Application Form for /apply

Replace the current iframe booking embed with a two-step native experience: a Typeform-style application form followed by the booking calendar.

## Step 1 -- Native multi-step form (new component)

Create `src/components/ApplicationForm.tsx` -- a full-screen-feel, one-question-at-a-time form with smooth transitions between steps:

1. **First Name** (text, required)
2. **Email** (email, required)
3. **Phone** (tel, optional)
4. **Position** (single-select: Attacker / Midfielder / Defender / Goalkeeper)
5. **Age** (number input, required)
6. **Goals / Message** ("What do you want to achieve?" -- textarea, required)

Each step shows one field at a time with a progress indicator, Enter/button to advance, and a subtle slide-up animation. Matches the existing dark glassmorphism style (frosted card, cool yellow accents, Sansation font). Mobile-first since 75% of traffic is mobile.

On final submit, calls a new edge function to push the data to GHL.

## Step 2 -- New edge function `apply-discovery`

Create `supabase/functions/apply-discovery/index.ts`:
- Validates all fields server-side (zod)
- Upserts contact to GHL via `services.leadconnectorhq.com/contacts/upsert` using existing `GHL_API_KEY` and `GHL_LOCATION_ID` secrets
- Sends: firstName, email, phone, source ("Website Application Form"), tags (position, "pbcoaching", "applied"), and stores position/age/goals in GHL custom fields or the `notes` field if custom fields aren't set up
- Returns success/contact data

## Step 3 -- Show booking calendar after submission

After form submission succeeds, transition the view to show the existing LeadConnector booking widget (same widget ID `LPjvAbKiuIWkr1tCSHPo`) so the applicant can immediately pick a call time. The postMessage redirect to `/thank-you` stays intact.

## Step 4 -- Update `/apply` page

Replace the current `TallyEmbed` with the new `ApplicationForm` component. Update the hero copy to be warmer and conversion-focused:
- Headline: "Let's Get You on the Pitch"
- Subtext: "Answer a few quick questions so we can tailor your free discovery call."

## Technical details

- Form validation: zod on client + server
- Animations: CSS transitions (transform + opacity) for step transitions, no extra dependencies
- CTA button: InteractiveHoverButton per project rules
- Progress: thin accent-colored bar at top of the form card
- The existing `TallyEmbed.tsx` file stays untouched (used nowhere else after this change, can be cleaned up later)
