import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const TechniqueAttackers = () => (
  <>
    <SEO
      title="Attackers Technique Plan — Scanning Accelerator"
      description="Technique system for attackers: fix your first touch, sharpen finishing on both feet and beat defenders in 30 days or less."
      path="/technique-attackers"
    />
    <ScanningPage
      preHeadline="Attention Attackers Who Are Tired of Being Predictable"
      headline={<>The Technique System That Fixes Your <span className="text-gradient-yellow">First Touch Under Pressure</span>, Sharpens Your Finishing on Both Feet and Makes Defenders <span className="text-gradient-yellow">Hate Playing Against You</span> in 30 Days or Less!</>}
      description="Most attackers know they need better technique but nobody breaks it down step by step. Watch the full technique breakdown below."
      videoUrl="https://youtu.be/CDW8epyV4y8?si=f2wHO0ThTxudQ6LY"
      ctaText="Become the best attacker in your team"
    />
  </>
);

export default TechniqueAttackers;
