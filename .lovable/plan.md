## Goal

After submitting the application, route the user based on the **budget** they selected:

| Budget answer | Destination | Offer |
|---|---|---|
| `$500 - $1,000` and `$1,000+` | `/thank-you` (unchanged) | Discovery call booking (current LeadConnector flow) |
| `$200 - $500` | new `/offer/course` page | Whop **8-Week Scanning Program** ($199) — `https://whop.com/joined/pb-coaching/products/8-week-scanning-program/` |
| `$50 - $100` | new `/offer/ebook` page | Whop **Master Your Scanning** ebook (€57) — `https://whop.com/joined/pb-coaching/products/scanning-mastery-playbook/` |
| `< $50` | new `/offer/reapply` page | "If you're not willing to invest, we can't work with you" + button to retake the application |

Note: there's no `$100 - $200` bucket in the form today, so the mapping above covers every option.

## Pages

### 1. `/offer/course` — Mid-budget ($200-$500)
- Headline: explain they're a strong fit but the 1-on-1 program is outside their stated budget.
- Pitch the **8-Week Scanning Program** ($199): the same scanning system Patrick uses with private clients, self-paced.
- Single `InteractiveHoverButton` → opens Whop course URL in a new tab.
- Reuse glassmorphism layout from `ThankYou`. No nav, no internal links.
- Below CTA: trimmed `SocialProof` grid for trust.

### 2. `/offer/ebook` — Low-budget ($50-$100)
- Same layout pattern. Pitch the **Master Your Scanning Playbook** (€57) as the entry point.
- Single CTA → Whop ebook URL in a new tab.
- Light social proof underneath.

### 3. `/offer/reapply` — Very low-budget (<$50)
- Direct message: PB Coaching only works with players ready to invest in their development. If they're serious, they can reapply with a realistic budget.
- Single CTA → navigates back to `/apply` (clearing saved state so they restart).
- No external offer, no social proof — keep it short.

## Routing change in `ApplicationForm.tsx`

Replace the hard-coded `navigate("/thank-you")` after a successful `apply-discovery` call with:

```ts
const budget = parsed.data.budget;
if (budget === "$500 - $1,000" || budget === "$1,000+") navigate("/thank-you");
else if (budget === "$200 - $500") navigate("/offer/course");
else if (budget === "$50 - $100") navigate("/offer/ebook");
else navigate("/offer/reapply"); // "< $50"
```

The CRM submission (`apply-discovery` edge function) still runs for every applicant — only the post-submit destination changes. No backend changes needed.

## App.tsx

Register three new routes:
```
/offer/course   → OfferCourse
/offer/ebook    → OfferEbook
/offer/reapply  → OfferReapply
```

## Files

**New:**
- `src/pages/OfferCourse.tsx`
- `src/pages/OfferEbook.tsx`
- `src/pages/OfferReapply.tsx`

**Edited:**
- `src/App.tsx` — add 3 routes
- `src/components/ApplicationForm.tsx` — branch navigation by budget

## Out of scope

- No payment integration in-app — Whop handles checkout via external link, as you confirmed.
- `/thank-you` flow stays exactly as it is.
- No tracking of which offer each applicant saw (can be added later as a custom field in GHL if you want).
