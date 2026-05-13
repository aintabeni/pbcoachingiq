import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const TechniqueMidfielders = () => (
  <>
    <SEO
      title="Midfielders Technique Plan — Scanning Accelerator"
      description="Technique system for midfielders: receive under pressure, pass on both feet and become impossible to press in 30 days or less."
      path="/technique-midfielders"
    />
    <ScanningPage
      preHeadline="Attention Midfielders Who Keep Losing the Ball Under Pressure"
      headline={<>The Technique System That Fixes Your <span className="text-gradient-yellow">Receiving Under Pressure</span>, Sharpens Your Passing on Both Feet and Makes You <span className="text-gradient-yellow">Impossible to Press</span> in 30 Days or Less!</>}
      description="Most midfielders know they need better technique but nobody breaks it down step by step. Watch the full technique breakdown below."
      videoUrl="https://youtu.be/uCA-4FOz5Vs?si=f5nSt7S2IkMrX7q9"
      ctaText="Become the best midfielder in your team"
    />
  </>
);

export default TechniqueMidfielders;
