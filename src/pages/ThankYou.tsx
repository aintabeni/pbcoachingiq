import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { SocialProof } from "@/components/SocialProof";
import testimonialDM from "@/assets/testimonial-dm-inspirational.jpeg";

const ThankYou = () => {
  useEffect(() => {
    if (window.self !== window.top) {
      window.parent.postMessage({ type: "pb-booking-complete" }, "*");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 gap-10">
      {/* Hero message */}
      <div className="glass rounded-2xl p-10 md:p-14 max-w-2xl w-full fade-in flex flex-col items-center gap-5 text-center">
        <AlertTriangle className="w-14 h-14 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
          Your Call Isn't Confirmed Yet
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-lg">
          Before your discovery call is locked in, complete the steps below. Show your parent or guardian the video so they know exactly what to expect.
        </p>
      </div>

      {/* Step 1 — Parent VSL */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-black text-sm shrink-0">
            1
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Show This to Your Parents
          </h2>
        </div>
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.youtube.com/embed/T1i5IrKLWQw"
            title="Message for Parents"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Step 2 — Coaching Philosophy */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-black text-sm shrink-0">
            2
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Watch the PB Coaching Philosophy
          </h2>
        </div>
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.youtube.com/embed/yeUIlHmsMRE"
            title="PB Coaching Philosophy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
        <img
          src={testimonialDM}
          alt="Message from a viewer saying the videos are inspirational and helpful"
          className="w-full rounded-xl border border-white/10"
          loading="lazy"
        />
      </div>

      <Testimonials showCTA={false} />
      <SocialProof />
    </div>
  );
};

export default ThankYou;
