import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const ScanningDefenders = () => (
  <>
    <SEO
      title="Defenders Scanning Plan — Scanning Accelerator"
      description="The 4-step scanning order for defenders: stay calm under pressure, read the game and dominate your line in 30 days or less."
      path="/scanning-defenders"
    />
    <ScanningPage
      preHeadline="Attention Defenders Who Freeze Under Pressure"
      headline={<>The 4-Step Scanning Order That Makes The Game <span className="text-gradient-yellow">Slow Down</span>, Accelerates Your Football Growth and Makes You <span className="text-gradient-yellow">Stand Out</span> on the Pitch in 30 Days or Less!</>}
      description={'Most defenders are told to "scan more" but nobody teaches them what to scan for or in what order. Watch the full scanning breakdown below.'}
      videoUrl="https://youtu.be/z2BjXg0zbGg?si=JPHH-a_dMoqgfYvf"
      ctaText="Become the best defender in your team"
    />
  </>
);

export default ScanningDefenders;
