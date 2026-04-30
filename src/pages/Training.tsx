import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import vslThumbnail from "@/assets/patrick-training.jpg";
import TrainingMarquee from "@/components/TrainingMarquee";
import TrainingDiscover from "@/components/TrainingDiscover";
import TrainingForYou from "@/components/TrainingForYou";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

const EVENT_DATE = "MAY 30TH, 2026 · 7:00 PM EST";
const SHORT_DATE = "LIVE · MAY 30";

const Training = () => {
  const navigate = useNavigate();
  const goRegister = () => navigate("/apply");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <InteractiveGridBackground />
      <div className="relative flex items-center px-4 py-12 md:py-20">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="fade-in">
          <p className="font-space-grotesk text-primary font-semibold text-sm md:text-base tracking-[0.25em] uppercase mb-6">
            The Smart Player Blueprint
          </p>

          <div className="font-manrope flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest text-foreground/70 mb-8">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Live Training
            </span>
            <span className="text-foreground/30">•</span>
            <span>{EVENT_DATE}</span>
          </div>

          <p className="font-space-grotesk text-gradient-yellow font-bold uppercase tracking-[0.15em] text-xs md:text-sm mb-4">
            In under 60 minutes I will give you the blueprint
          </p>
          <h1 className="font-space-grotesk text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase mb-8 text-foreground">
            How to stop being the{" "}
            <span className="text-gradient-yellow">"bad" player</span> who
            crumbles under pressure and become the{" "}
            <span className="text-gradient-yellow">star player</span> your team
            depends on.
          </h1>

          <p className="font-inter text-foreground/75 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            I went from the 9th division in Norway to a professional contract
            in Romania by changing how I think. I will show you how to do the
            same — without being the fastest player, the strongest kid, or a
            natural talent.
          </p>

          <button
            onClick={goRegister}
            className="font-manrope group bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary))] text-primary-foreground rounded-md border-0 cursor-pointer glow-yellow transition-transform hover:scale-[1.02]"
            style={{ padding: "18px 40px" }}
          >
            <span className="block font-bold uppercase" style={{ fontSize: "12px", letterSpacing: "0.2em" }}>
              Save My Free Spot →
            </span>
            <span className="block opacity-70" style={{ fontSize: "10px", letterSpacing: "0.1em", marginTop: "5px" }}>
              ↓ {EVENT_DATE}
            </span>
          </button>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {[
                { bg: "bg-primary", label: "JM" },
                { bg: "bg-accent", label: "AK" },
                { bg: "bg-secondary text-foreground", label: "RS" },
              ].map((a, i) => (
                <div
                  key={i}
                  className={`${a.bg} w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary-foreground`}
                >
                  {a.label}
                </div>
              ))}
            </div>
            <p className="font-inter text-sm text-foreground/70">
              <span className="font-semibold text-foreground">125+</span>{" "}
              already registered
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="fade-in relative">
          <div className="relative rounded-3xl overflow-hidden border border-border glow-yellow aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:ml-auto">
            <img
              src={vslThumbnail}
              alt="Smart Player Blueprint live training"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute top-4 left-4 font-manrope flex items-center gap-2 bg-background/70 backdrop-blur-md border border-border rounded-full px-3 py-1.5 text-xs uppercase tracking-widest text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              {SHORT_DATE}
            </div>
          </div>
        </div>
      </div>
      </div>
      <TrainingMarquee />
      <TrainingDiscover />
      <TrainingForYou />
    </div>
  );
};

export default Training;
