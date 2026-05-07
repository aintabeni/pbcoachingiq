const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
    const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      throw new Error("GHL credentials not configured");
    }

    const fieldsToCreate = [
      { name: "Application Budget", dataType: "TEXT" },
      { name: "Application Position", dataType: "TEXT" },
      { name: "Application Age", dataType: "TEXT" },
      { name: "Application Goals", dataType: "TEXT" },
    ];

    const results: Record<string, unknown>[] = [];

    for (const field of fieldsToCreate) {
      const resp = await fetch(
        `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/customFields`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            name: field.name,
            dataType: field.dataType,
            model: "contact",
          }),
        },
      );

      const data = await resp.json().catch(() => ({}));
      results.push({ field: field.name, status: resp.status, data });
    }

    return new Response(JSON.stringify({ results }, null, 2), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
