import { useEffect, useRef } from "react";

const TallyEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Tally widget script if not already loaded
    const scriptSrc = "https://tally.so/widgets/embed.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    const loadEmbeds = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        // Fallback: set src on iframes manually
        containerRef.current
          ?.querySelectorAll("iframe[data-tally-src]:not([src])")
          .forEach((iframe) => {
            (iframe as HTMLIFrameElement).src =
              (iframe as HTMLIFrameElement).dataset.tallySrc || "";
          });
      }
    };

    if (typeof (window as any).Tally !== "undefined") {
      loadEmbeds();
    } else if (!existingScript) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.onload = loadEmbeds;
      s.onerror = loadEmbeds;
      document.body.appendChild(s);
    } else {
      loadEmbeds();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <iframe
        data-tally-src="https://tally.so/embed/MezQ4Y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&redirectUrl=/thank-you"
        loading="lazy"
        width="100%"
        height="200"
        frameBorder="0"
        title="Application to the Accelerator"
      />
    </div>
  );
};

export default TallyEmbed;
