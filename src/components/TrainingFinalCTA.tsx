import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const TrainingFinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-[2] px-4 md:px-8 py-32 md:py-40">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-space-grotesk font-black uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
          <span className="text-foreground block">Register Before</span>
          <span className="text-gradient-yellow block mt-2">Spots Fill Up</span>
        </h2>

        <div className="mt-10 md:mt-14 w-full max-w-sm">
          <InteractiveHoverButton
            text="Join The Free Training"
            onClick={() => navigate("/apply")}
          />
        </div>

        <p className="font-manrope mt-6 text-xs md:text-sm uppercase tracking-[0.25em] text-foreground/50">
          Limited Access — Register Now
        </p>
      </div>
    </section>
  );
};

export default TrainingFinalCTA;
