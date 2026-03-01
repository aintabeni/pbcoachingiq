import { CheckCircle, Youtube } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { SocialProof } from "@/components/SocialProof";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="glass rounded-2xl p-10 md:p-14 max-w-xl w-full fade-in flex flex-col items-center gap-6 text-center">
        <CheckCircle className="w-16 h-16 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground">
          Application Received!
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-md">
          Thanks for applying. We'll be in touch shortly to schedule your free discovery call and discuss how we can help you level up.
        </p>
        <div className="flex justify-center max-w-md w-full mt-4">
          <InteractiveHoverButton
            text="Watch Free Content on YouTube"
            onClick={() => window.open("https://www.youtube.com/@pbcoaching", "_blank")}
          />
        </div>
      </div>

      <Testimonials showCTA={false} />
      <SocialProof />
    </div>
  );
};

export default ThankYou;
