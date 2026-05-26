## Goal

Send applicants with budget **$500 - $1,000**, or **$1,000+** to a new `/book-call` page that embeds Calendly. After they book, auto-redirect them to `/thank-you`. Also add a "Book Your Call" section at the very top of `/thank-you` as a fallback.

## Changes

### 1. New page `src/pages/BookCall.tsx` (route `/book-call`)

- Project theme + glass styling, no brand logo (funnel page rule).
- Headline: "Book Your Free Discovery Call" + short subheadline.
- Calendly inline embed:
  - Load `https://assets.calendly.com/assets/external/widget.js` once via `useEffect`.
  - Render `<div className="calendly-inline-widget" data-url="https://calendly.com/pbcoachingiq/30min" />` (min-height ~720px desktop, full width mobile).
- **Auto-redirect on booking**: add a `window` `message` listener that checks `event.data.event === "calendly.event_scheduled"` and calls `navigate("/thank-you")`. This is Calendly's documented postMessage event, so the listener approach works — the fallback section is still added per your request.
- `SEO` tags (noindex).

### 2. Register route in `src/App.tsx`

- Add `<Route path="/book-call" element={<BookCall />} />`.

### 3. Update routing in `src/components/ApplicationForm.tsx` (lines 144–154)

- `$1,000+` → `/book-call`
- `$500 - $1,000` → `/book-call`
- `$200 - $500` → `/offer/course (unchanged)`
- `$50 - $100` → `/offer/ebook` (unchanged)
- `< $50` → `/offer/reapply` (unchanged)

### 4. Add "Book Your Call" section to `src/pages/ThankYou.tsx`

- New section at the very top (above all existing content):
  - Headline: "Book Your Free Discovery Call"
  - Short copy
  - Calendly inline embed (same script + widget div as `/book-call`)
- Existing ThankYou content (social proof + single YouTube CTA) stays below, per the Thank You page memory rule.

## Notes

- Calendly script is loaded idempotently (guard with an `id` check) so it's safe to mount on both pages.
- No backend changes; no new dependencies.