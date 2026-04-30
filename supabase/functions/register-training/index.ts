const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RegisterPayload {
  firstName: string;
  email: string;
  phone?: string;
}

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

    const body = (await req.json()) as RegisterPayload;

    // Basic validation
    const firstName = (body.firstName || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();

    if (!firstName || firstName.length > 100) {
      return new Response(
        JSON.stringify({ error: "First name is required (max 100 chars)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (phone && phone.length > 32) {
      return new Response(
        JSON.stringify({ error: "Invalid phone" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // GoHighLevel - Create or update contact
    // https://highlevel.stoplight.io/docs/integrations/00c5ff21f0030-create-contact
    const ghlPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      email,
      source: "Free Training Registration",
      tags: ["free-training", "smart-player-blueprint"],
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
        JSON.stringify({
          error: "Registration failed",
          status: ghlResp.status,
          details: ghlData,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, contact: ghlData?.contact ?? null }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("register-training error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
