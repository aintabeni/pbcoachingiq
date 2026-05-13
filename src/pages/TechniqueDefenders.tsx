import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const TechniqueDefenders = () => (
  <>
    <SEO
      title="Defenders Technique Plan — Scanning Accelerator"
      description="Technique system for defenders: composure in the build-up, pass out of pressure and stop opponents pressing you in 30 days or less."
      path="/technique-defenders"
    />
    <ScanningPage
      preHeadline="Attention Defenders Who Panic When Pressed on the Ball"
      headline={<>The Technique System That Fixes Your <span className="text-gradient-yellow">Composure in the Build-Up</span>, Sharpens Your Passing Out of Pressure and Makes Opponents <span className="text-gradient-yellow">Stop Pressing You</span> in 30 Days or Less!</>}
      description="Most defenders know they need better technique but nobody breaks it down step by step. Watch the full technique breakdown below."
      videoUrl="https://youtu.be/-rzdFQy2WEY?si=N1P3BT2iazU_G--c"
      ctaText="Become the best defender in your team"
    />
  </>
);

export default TechniqueDefenders;
