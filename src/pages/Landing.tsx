import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <div className="w-full max-w-lg text-center fade-in">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
          Free Personalised Training Plan
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
          Take a 2-Question Quiz to Get a{" "}
          <span className="text-gradient-yellow">Custom Training Plan</span>{" "}
          for Your Position
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto">
          Tell us your position and your biggest area to improve, and we'll show you exactly what to train next.
        </p>

        <InteractiveHoverButton
          text="Take the Quiz"
          onClick={() => navigate("/quiz")}
        />
      </div>
    </div>
  );
};

export default Landing;
