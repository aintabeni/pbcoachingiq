## Add `pbcoaching-webinar-registered` tag to training registrations

### What's happening today
When a user signs up via the training registration form, `supabase/functions/register-training/index.ts` upserts the contact into GoHighLevel with these tags:
- `free-training`
- `smart-player-blueprint`

### Change
Add a third tag `pbcoaching-webinar-registered` so every new/updated contact from this flow is tagged with it in GHL.

Updated array:
```ts
tags: ["free-training", "smart-player-blueprint", "pbcoaching-webinar-registered"],
```

### Files to edit
- `supabase/functions/register-training/index.ts` — append the new tag

### Deploy
The edge function will be redeployed automatically after the change. New registrations from `/training` will carry all three tags in GHL going forward (existing contacts won't be retroactively tagged).