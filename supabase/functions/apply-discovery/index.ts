import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  position: z.enum(["Attacker", "Midfielder", "Defender", "Goalkeeper"]),
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

    const { firstName, email, phone, position, age, goals, budget } = parsed.data;

    const ghlPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      email,
      source: "Website Application Form",
      tags: [
        "pbcoaching",
        "applied",
        position.toLowerCase(),
        `budget-${budget}`,
      ],
      customFields: [
        { key: "contact.position", field_value: position },
        { key: "contact.age", field_value: String(age) },
        { key: "contact.goals", field_value: goals },
        { key: "contact.budget", field_value: budget },
      ],
    };
    if (phone) ghlPayload.phone = phone;

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
