import { useEffect, useRef, useCallback } from "react";

const BookingEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.type === "pb-booking-complete") {
      window.location.href = "/thank-you";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (!container) return;

    // Create iframe imperatively so React doesn't track it
    const iframe = document.createElement("iframe");
    iframe.src = "https://api.leadconnectorhq.com/widget/booking/LPjvAbKiuIWkr1tCSHPo";
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.minHeight = "700px";
    iframe.scrolling = "no";
    iframe.id = "sZUJa02r2TC0pWs4KWIl_1773170425261";
    iframe.title = "PB Coaching Booking";
    container.appendChild(iframe);

    // Load script
    const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.type = "text/javascript";
      document.body.appendChild(s);
    }

    return () => {
      // Clean up only what we added
      if (container.contains(iframe)) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full min-h-[700px]" />;
};

export default BookingEmbed;
