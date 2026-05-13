import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const ScanningMidfielders = () => (
  <>
    <SEO
      title="Midfielders Scanning Plan — Scanning Accelerator"
      description="The 4-step scanning order for midfielders: slow the game down, beat pressure and dictate play in 30 days or less."
      path="/scanning-midfielders"
    />
    <ScanningPage
      preHeadline="Attention Midfielders Who Freeze Under Pressure"
      headline={<>The 4-Step Scanning Order That Makes The Game <span className="text-gradient-yellow">Slow Down</span>, Accelerates Your Football Growth and Makes You <span className="text-gradient-yellow">Stand Out</span> on the Pitch in 30 Days or Less!</>}
      description={'Most midfielders are told to "scan more" but nobody teaches them what to scan for or in what order. Watch the full scanning breakdown below.'}
      videoUrl="https://youtu.be/88A8zbs1-zw?si=QC0zAJ4clxR3ezAm"
      ctaText="Become the best midfielder in your team"
    />
  </>
);

export default ScanningMidfielders;
