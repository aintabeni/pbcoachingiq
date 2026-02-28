import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import TallyEmbed from "@/components/TallyEmbed";

interface ScanningPageProps {
  preHeadline: string;
  headline: React.ReactNode;
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
      <div className="w-full max-w-3xl lg:max-w-5xl">

        {/* Pre-headline */}
        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4 fade-in">
          {preHeadline}
        </p>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-6 fade-in text-foreground drop-shadow-lg">
          {headline}
        </h1>

        {/* Description */}
        <p className="text-center text-foreground/80 text-base md:text-lg mb-10 max-w-2xl mx-auto fade-in">
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
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 glass-subtle flex items-center justify-center fade-in">
            <p className="text-foreground/60 text-lg">Video Coming Soon</p>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center fade-in max-w-md mx-auto">
          <InteractiveHoverButton
            text={ctaText}
            onClick={() => document.getElementById("tally-form")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>

        {/* Tally Form */}
        <div id="tally-form" className="mt-12 fade-in glass rounded-2xl p-6 md:p-8">
          <TallyEmbed />
        </div>
      </div>
    </div>
  );
};

export default ScanningPage;
