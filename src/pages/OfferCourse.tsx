import { Sparkles } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SocialProof } from "@/components/SocialProof";

const COURSE_URL = "https://whop.com/joined/pb-coaching/products/8-week-scanning-program/";

const OfferCourse = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 gap-10">
      <div className="glass rounded-2xl p-10 md:p-14 max-w-2xl w-full fade-in flex flex-col items-center gap-6 text-center">
        <Sparkles className="w-14 h-14 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
          You're a Strong Fit, But Our 1-on-1 Mentorship Is Outside Your Budget
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-lg">
          Based on what you shared, our private mentorship isn't the right starting point for you yet. The good news: the same scanning system Patrick teaches his private clients is available as a self-paced 8-week program.
        </p>

        <div className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-6 flex flex-col gap-3 text-left">
          <p className="text-sm uppercase tracking-wider text-primary font-bold">Recommended for you</p>
          <h2 className="text-2xl font-black text-foreground">8-Week Scanning Program</h2>
          <p className="text-foreground/70">
            The exact framework used to drill scanning, awareness, and decision-making under pressure. Self-paced, with weekly sessions you can run on your own.
          </p>
          <p className="text-3xl font-black text-foreground mt-2">$199</p>
        </div>

        <a href={COURSE_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-md">
          <InteractiveHoverButton text="Get the Program" />
        </a>
      </div>

      <SocialProof />
    </div>
  );
};

export default OfferCourse;
