import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SEO from "@/components/SEO";

const OfferReapply = () => {
  const navigate = useNavigate();

  const handleReapply = () => {
    try {
      localStorage.removeItem("pb_position");
    } catch {}
    navigate("/apply");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="glass rounded-2xl p-10 md:p-14 max-w-2xl w-full fade-in flex flex-col items-center gap-6 text-center">
        <AlertTriangle className="w-14 h-14 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
          We Only Work With Players Ready to Invest
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-lg">
          Real progress takes a real commitment. Our coaching, programs, and resources are built for players and families willing to put something on the line for their development.
        </p>
        <p className="text-foreground/60 text-base max-w-lg">
          If that's you, retake the application with a budget that reflects how serious you are about leveling up. If not, we appreciate your time.
        </p>

        <div className="w-full max-w-md mt-2">
          <InteractiveHoverButton text="Reapply With a Real Budget" onClick={handleReapply} />
        </div>
      </div>
    </div>
  );
};

export default OfferReapply;
