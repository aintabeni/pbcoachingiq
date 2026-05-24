The previous edit didn't take effect — phone is still enforced in three places. Make it truly optional.

## Changes

1. **src/components/ApplicationForm.tsx**
   - Zod schema: change `phone: z.string().trim().min(1, "Phone number is required").max(32)` to `phone: z.string().trim().max(32).optional().or(z.literal(""))`.
   - In the `questions` array, set `required: false` on the `phone` step so the per-step "This field is required" guard skips it and users can press OK with an empty value.
   - Update the label to "Phone number (optional)" so users know they can skip.

2. **supabase/functions/apply-discovery/index.ts**
   - Change `phone: z.string().trim().min(1).max(32)` to `phone: z.string().trim().max(32).optional()` so submissions without a phone aren't rejected server-side.
   - When building the GHL payload, only include `phone` if it's a non-empty string.

No other fields or UI affected.