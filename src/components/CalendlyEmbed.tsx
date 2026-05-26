import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const CALENDLY_URL = "https://calendly.com/pbcoachingiq/30min";
const SCRIPT_ID = "calendly-widget-script";

interface CalendlyEmbedProps {
  redirectOnBook?: string;
  minHeight?: number;
}

const CalendlyEmbed = ({ redirectOnBook, minHeight = 720 }: CalendlyEmbedProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      const data = e.data;
      if (
        data &&
        typeof data === "object" &&
        typeof data.event === "string" &&
        data.event === "calendly.event_scheduled"
      ) {
        // Tag the lead as "booked" in the CRM
        try {
          const email = localStorage.getItem("pb_email");
          if (email) {
            await supabase.functions.invoke("mark-booked", { body: { email } });
          }
        } catch (err) {
          console.error("mark-booked invoke failed", err);
        }

        if (redirectOnBook) navigate(redirectOnBook);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [redirectOnBook, navigate]);

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: `${minHeight}px` }}
    />
  );
};

export default CalendlyEmbed;
