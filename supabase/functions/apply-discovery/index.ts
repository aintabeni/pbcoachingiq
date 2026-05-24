import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// GHL custom field IDs
const CF_BUDGET   = "3m1SQQ9BFTJT2UckwDqx";
const CF_POSITION = "8dGtm16U8kywBRWntj5g";
const CF_AGE      = "ZdgsCoRwll8qU4kWNZ7s";
const CF_GOALS    = "PRx9rYSQpJ8ewmdgf6ND";

const CF_INSTAGRAM = "GADax6CTpeOO4t5IsxSM";

const BodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional(),
  instagram: z.string().trim().min(1).max(100),
  position: z.enum(["Attacker", "Midfielder", "Defender", "Goalkeeper"]),
  detailedPosition: z.string().trim().min(1).max(100),
  age: z.number().int().min(5).max(99),
  goals: z.string().trim().min(1).max(2000),
  budget: z.enum(["< $50", "$50 - $100", "$200 - $500", "$500 - $1,000", "$1,000+"]),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
    const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      throw new Error("GHL credentials are not configured");
    }

    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { firstName, email, phone, instagram, position, detailedPosition, age, goals, budget } = parsed.data;

    const customFields = [
      { id: CF_BUDGET, field_value: budget },
      { id: CF_POSITION, field_value: detailedPosition },
      { id: CF_AGE, field_value: String(age) },
      { id: CF_GOALS, field_value: goals },
      { id: CF_INSTAGRAM, field_value: instagram },
    ];

    const ghlPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      email,
      source: "Website Application Form",
      tags: [
        "pbcoaching",
        "applied",
        position.toLowerCase(),
      ],
      customFields,
    };
    if (phone && phone.length > 0) {
      ghlPayload.phone = phone;
    }

    const ghlResp = await fetch(
      "https://services.leadconnectorhq.com/contacts/upsert",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(ghlPayload),
      },
    );

    const ghlData = await ghlResp.json().catch(() => ({}));

    if (!ghlResp.ok) {
      console.error("GHL upsert failed", ghlResp.status, ghlData);
      return new Response(
        JSON.stringify({ error: "Application failed", status: ghlResp.status, details: ghlData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, contact: ghlData?.contact ?? null }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("apply-discovery error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
