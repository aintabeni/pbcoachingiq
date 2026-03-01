import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="glass rounded-2xl p-10 md:p-14 max-w-xl w-full fade-in flex flex-col items-center gap-6">
        <CheckCircle className="w-16 h-16 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground">
          Application Received!
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-md">
          Thanks for applying. We'll be in touch shortly to schedule your free discovery call and discuss how we can help you level up.
        </p>
        <Button onClick={() => navigate("/")} size="lg" className="mt-4">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
