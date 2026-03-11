import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Play } from "lucide-react";
import vslThumbnail from "@/assets/vsl-thumbnail.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <div className="w-full max-w-3xl lg:max-w-5xl flex flex-col items-center">

        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-2 fade-in">
          Free Personalised Training Plan
        </p>

        <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-center leading-tight mb-3 fade-in text-foreground drop-shadow-lg">
          Take a 2-Question Quiz to Get a{" "}
          <span className="text-gradient-yellow">Custom Training Plan</span>{" "}
          for Your Position
        </h1>

        <p className="text-center text-foreground/80 text-sm md:text-base mb-4 max-w-2xl mx-auto fade-in">
          Tell us your position and your biggest area to improve, and we'll show you exactly what to train next.
        </p>

        <div
          className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden mb-4 glow-yellow fade-in border border-border relative cursor-pointer group"
          onClick={() => navigate("/quiz")}
        >
          <img
            src={vslThumbnail}
            alt="Training video preview"
            className="w-full h-full object-cover blur-md scale-105 transition-all duration-300 group-hover:blur-lg"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" />
            </div>
          </div>
        </div>

        <div className="flex justify-center fade-in max-w-md mx-auto">
          <InteractiveHoverButton
            text="Get Your Free Training"
            onClick={() => navigate("/quiz")}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
