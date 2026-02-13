import logo from "@/assets/pblogo.avif";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import TallyEmbed from "@/components/TallyEmbed";

interface ScanningPageProps {
  preHeadline: string;
  headline: string;
  description: string;
  videoUrl?: string;
  ctaText: string;
}

const ScanningPage = ({ preHeadline, headline, description, videoUrl, ctaText }: ScanningPageProps) => {
  // Convert YouTube URL to embed
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Logo */}
        <div className="flex justify-center mb-10 fade-in">
          <img src={logo} alt="PB Logo" className="h-14 w-auto" />
        </div>

        {/* Pre-headline */}
        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4 fade-in">
          {preHeadline}
        </p>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-6 fade-in text-foreground">
          The 4-Step Scanning Order That Makes The Game{" "}
          <span className="text-gradient-yellow">Slow Down</span>, Accelerates Your Football Growth and Makes You{" "}
          <span className="text-gradient-yellow">Stand Out</span> on the Pitch in 30 Days or Less!
        </h1>

        {/* Description */}
        <p className="text-center text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto fade-in">
          {description}
        </p>

        {/* Video */}
        {embedUrl && (
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 glow-yellow fade-in border border-border">
            <iframe
              src={embedUrl}
              title="Scanning Breakdown"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!embedUrl && (
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 bg-secondary flex items-center justify-center fade-in border border-border">
            <p className="text-muted-foreground text-lg">Video Coming Soon</p>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center fade-in max-w-md mx-auto">
          <InteractiveHoverButton text={ctaText} />
        </div>

        {/* Tally Form */}
        <div className="mt-12 fade-in">
          <TallyEmbed />
        </div>
      </div>
    </div>
  );
};

export default ScanningPage;
