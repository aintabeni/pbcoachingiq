import SEO from "@/components/SEO";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const BookCall = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <SEO
        title="Book Your Discovery Call — PB Coaching"
        description="Book your free 30-minute discovery call with PB Coaching."
        path="/book-call"
      />
      <div className="w-full max-w-4xl animate-step-in">
        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
          Final Step
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-3 text-foreground drop-shadow-lg">
          Book Your Free Discovery Call
        </h1>
        <p className="text-center text-foreground/60 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Pick a time that works for you. We'll meet for 30 minutes to build your personalised plan.
        </p>

        <div className="glass rounded-2xl p-2 md:p-4 overflow-visible">
          <CalendlyEmbed redirectOnBook="/thank-you" minHeight={760} />
        </div>
      </div>
    </div>
  );
};

export default BookCall;
