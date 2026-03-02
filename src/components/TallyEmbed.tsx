import { useEffect } from "react";

const LeadConnectorEmbed = () => {
  useEffect(() => {
    const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <iframe
      src="https://api.leadconnectorhq.com/widget/form/NLMAcB93KCiyb5gArZRZ"
      style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
      id="inline-NLMAcB93KCiyb5gArZRZ"
      data-layout='{"id":"INLINE"}'
      data-trigger-type="alwaysShow"
      data-activation-type="alwaysActivated"
      data-deactivation-type="neverDeactivate"
      data-form-name="PB Coaching Form"
      data-height="1567"
      data-layout-iframe-id="inline-NLMAcB93KCiyb5gArZRZ"
      data-form-id="NLMAcB93KCiyb5gArZRZ"
      title="PB Coaching Form"
      className="min-h-[1567px]"
    />
  );
};

export default LeadConnectorEmbed;
