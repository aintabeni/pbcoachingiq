import { useState, useRef, useEffect, useCallback } from "react";
import ApplicationForm from "@/components/ApplicationForm";

const BOOKING_WIDGET_ID = "LPjvAbKiuIWkr1tCSHPo";

const Apply = () => {
  const [phase, setPhase] = useState<"form" | "booking">("form");
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.type === "pb-booking-complete") {
      window.location.href = "/thank-you";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  // Mount booking widget when phase switches
  useEffect(() => {
    if (phase !== "booking") return;
    const container = bookingRef.current;
    if (!container) return;

    const iframe = document.createElement("iframe");
    iframe.src = `https://api.leadconnectorhq.com/widget/booking/${BOOKING_WIDGET_ID}`;
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.minHeight = "700px";
    iframe.scrolling = "no";
    iframe.title = "Book Your Free Discovery Call";
    container.appendChild(iframe);

    const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.type = "text/javascript";
      document.body.appendChild(s);
    }

    return () => {
      if (container.contains(iframe)) container.removeChild(iframe);
    };
  }, [phase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl lg:max-w-5xl">
        {phase === "form" && (
          <div className="animate-step-in">
            <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              You're One Step Away
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-3 text-foreground drop-shadow-lg">
              Let's Get You on the Pitch
            </h1>
            <p className="text-center text-foreground/60 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Answer a few quick questions so we can tailor your free discovery call.
            </p>

            <div className="glass rounded-2xl p-6 md:p-10">
              <ApplicationForm onComplete={() => setPhase("booking")} />
            </div>
          </div>
        )}

        {phase === "booking" && (
          <div className="animate-step-in">
            <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Application Received ✓
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-3 text-foreground drop-shadow-lg">
              Now Pick Your Call Time
            </h1>
            <p className="text-center text-foreground/60 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Choose a time that works for you. We'll discuss your goals and how we can help.
            </p>

            <div className="glass rounded-2xl p-6 md:p-8">
              <div ref={bookingRef} className="w-full min-h-[700px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;
