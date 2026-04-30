const TrainingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] mt-12 bg-black/80 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
        <p className="font-space-grotesk text-gradient-yellow font-black uppercase tracking-[0.2em] text-xl md:text-2xl">
          Football Accelerator
        </p>

        <div className="font-manrope flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-xs md:text-sm uppercase tracking-[0.2em] text-foreground/60">
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <span className="text-foreground/20">|</span>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
          <span className="text-foreground/20">|</span>
          <a href="mailto:contact@pbcoachingiq.com" className="hover:text-foreground transition-colors">Contact</a>
        </div>

        <p className="font-manrope mt-6 text-xs uppercase tracking-[0.25em] text-foreground/40">
          © {year} Football Accelerator · All Rights Reserved
        </p>

        <div className="mt-12 pt-10 border-t border-white/5">
          <p className="font-space-grotesk uppercase tracking-[0.2em] text-xs md:text-sm text-primary/90 font-semibold">
            ⚡ Don't Waste Another Season on the Bench
          </p>
          <p className="font-inter mt-3 text-xs md:text-sm text-foreground/50 max-w-xl mx-auto leading-relaxed">
            Every week without a system is a week your competition gets ahead. Spots are limited — claim yours before registration closes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TrainingFooter;
