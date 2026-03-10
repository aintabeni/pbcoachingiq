import { useEffect } from "react";

const BookingEmbed = () => {
  useEffect(() => {
    const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.type = "text/javascript";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <iframe
      src="https://api.leadconnectorhq.com/widget/booking/LPjvAbKiuIWkr1tCSHPo"
      style={{ width: "100%", border: "none", overflow: "hidden" }}
      scrolling="no"
      id="sZUJa02r2TC0pWs4KWIl_1773170425261"
      title="PB Coaching Booking"
      className="min-h-[700px]"
    />
  );
};

export default BookingEmbed;
