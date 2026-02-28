import TallyEmbed from "@/components/TallyEmbed";

const Apply = () => (
  <div className="min-h-screen flex flex-col items-center px-4 py-12">
    <div className="w-full max-w-3xl lg:max-w-5xl">
      <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4 fade-in">
        You're One Step Away
      </p>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-6 fade-in text-foreground drop-shadow-lg">
        Apply Now
      </h1>
      <p className="text-center text-foreground/80 text-base md:text-lg mb-10 max-w-2xl mx-auto fade-in">
        Fill in the form below and we'll contact you to schedule a free discovery call about where you are in your football journey and how we can help you improve.
      </p>
      <div className="fade-in glass rounded-2xl p-6 md:p-8">
        <TallyEmbed />
      </div>
    </div>
  </div>
);

export default Apply;
