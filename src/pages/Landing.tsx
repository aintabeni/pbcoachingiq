import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Play } from "lucide-react";
import vslThumbnail from "@/assets/vsl-thumbnail.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl lg:max-w-5xl">

        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4 fade-in">
          Free Personalised Training Plan
        </p>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-6 fade-in text-foreground drop-shadow-lg">
          Take a 2-Question Quiz to Get a{" "}
          <span className="text-gradient-yellow">Custom Training Plan</span>{" "}
          for Your Position
        </h1>

        <p className="text-center text-foreground/80 text-base md:text-lg mb-8 max-w-2xl mx-auto fade-in">
          Tell us your position and your biggest area to improve, and we'll show you exactly what to train next.
        </p>

        <div className="flex justify-center fade-in max-w-md mx-auto mb-10">
          <InteractiveHoverButton
            text="Get Your Free Training"
            onClick={() => navigate("/quiz")}
          />
        </div>

        <div
          className="w-full aspect-video rounded-xl overflow-hidden glow-yellow fade-in border border-border relative cursor-pointer group"
          onClick={() => navigate("/quiz")}
        >
          <img
            src={vslThumbnail}
            alt="Training video preview"
            className="w-full h-full object-cover blur-md scale-105 transition-all duration-300 group-hover:blur-lg"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground ml-1" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;
