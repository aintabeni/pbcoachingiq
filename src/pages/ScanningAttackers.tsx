import ScanningPage from "@/components/ScanningPage";
import SEO from "@/components/SEO";

const ScanningAttackers = () => (
  <>
    <SEO
      title="Attackers Scanning Plan — Scanning Accelerator"
      description="The 4-step scanning order for attackers: slow the game down, beat pressure and stand out on the pitch in 30 days or less."
      path="/scanning-attackers"
    />
    <ScanningPage
      preHeadline="Attention Attackers Who Freeze Under Pressure"
      headline={<>The 4-Step Scanning Order That Makes The Game <span className="text-gradient-yellow">Slow Down</span>, Accelerates Your Football Growth and Makes You <span className="text-gradient-yellow">Stand Out</span> on the Pitch in 30 Days or Less!</>}
      description={'Most attackers are told to "scan more" but nobody teaches them what to scan for or in what order. Watch the full scanning breakdown below.'}
      videoUrl="https://youtu.be/JgqiE0zUd-g?si=G02on3EKPC6G22JV"
      ctaText="Become the best attacker in your team"
    />
  </>
);

export default ScanningAttackers;
