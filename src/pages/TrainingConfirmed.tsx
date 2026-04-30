import { useEffect } from "react";
import DotBackground from "@/components/DotBackground";
import { CheckCircle2 } from "lucide-react";

const EVENT_LINE = "LIVE · MAY 30TH, 2026 · 7:00 PM EST";

const TrainingConfirmed = () => {
  useEffect(() => {
    document.title = "You're Registered · Free Training";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DotBackground />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto fade-in">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center glow-yellow">
              <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={2.25} />
            </div>
          </div>

          <p className="font-space-grotesk text-gradient-yellow font-bold uppercase tracking-[0.25em] text-xs md:text-sm mb-4">
            You're In
          </p>

          <h1 className="font-space-grotesk font-black uppercase tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
            Your Spot Is{" "}
            <span className="text-gradient-yellow">Confirmed</span>
          </h1>

          <p className="font-inter mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl mx-auto">
            Check your inbox for the training details and calendar invite.
            Add it to your calendar so you don't miss it, spots fill up fast and replays are not guaranteed.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="font-manrope text-xs md:text-sm uppercase tracking-[0.25em] text-foreground/80">
              {EVENT_LINE}
            </span>
          </div>

          <p className="font-inter mt-12 text-sm text-foreground/50 max-w-md mx-auto">
            Didn't get the email? Check your spam folder or contact{" "}
            <a href="mailto:contact@pbcoachingiq.com" className="text-foreground/80 underline hover:text-foreground">
              contact@pbcoachingiq.com
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TrainingConfirmed;
