const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

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
        name: "Application Instagram",
        dataType: "TEXT",
        model: "contact",
      }),
    }
  );

  const data = await resp.json();
  return new Response(JSON.stringify(data, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
