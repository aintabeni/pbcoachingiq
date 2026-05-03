## Update registration tags

Remove `free-training` and `smart-player-blueprint` from the tags array in the edge function, keeping only:
- `pbcoaching`
- `pbcoaching-webinar-registered`

### File to edit
- `supabase/functions/register-training/index.ts` — change the tags line to:
```ts
tags: ["pbcoaching", "pbcoaching-webinar-registered"],
```

No other data changes needed — the function already only sends firstName, email, phone (optional), locationId, source, and tags. No skill or investment data is included.

The edge function will be redeployed automatically.