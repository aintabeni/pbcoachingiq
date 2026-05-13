import { BookOpen } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SocialProof } from "@/components/SocialProof";

const EBOOK_URL = "https://whop.com/joined/pb-coaching/products/scanning-mastery-playbook/";

const OfferEbook = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 gap-10">
      <div className="glass rounded-2xl p-10 md:p-14 max-w-2xl w-full fade-in flex flex-col items-center gap-6 text-center">
        <BookOpen className="w-14 h-14 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
          Start With the Playbook That Started It All
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-lg">
          Our mentorship and full program are outside your stated budget right now, but the foundation Patrick builds every player on is available as a downloadable playbook. Read it, drill it, and come back when you're ready for the next step.
        </p>

        <div className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-6 flex flex-col gap-3 text-left">
          <p className="text-sm uppercase tracking-wider text-primary font-bold">Recommended for you</p>
          <h2 className="text-2xl font-black text-foreground">Master Your Scanning Playbook</h2>
          <p className="text-foreground/70">
            The complete scanning framework, broken down into drills, habits, and in-game checkpoints. Built so any player can apply it the next time they step on the pitch.
          </p>
          <p className="text-3xl font-black text-foreground mt-2">€57</p>
        </div>

        <a href={EBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-md">
          <InteractiveHoverButton text="Get the Playbook" />
        </a>
      </div>

      <SocialProof />
    </div>
  );
};

export default OfferEbook;
