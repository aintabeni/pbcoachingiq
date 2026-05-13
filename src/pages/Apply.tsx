import ApplicationForm from "@/components/ApplicationForm";
import SEO from "@/components/SEO";

const Apply = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <SEO
        title="Apply for a Discovery Call — Scanning Accelerator"
        description="Answer a few quick questions to apply for a free discovery call with PB Coaching and tailor your training plan."
        path="/apply"
      />
      <div className="w-full max-w-3xl lg:max-w-5xl animate-step-in">
        <p className="text-center text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
          You're One Step Away
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-3 text-foreground drop-shadow-lg">
          Let's Get You on the Pitch
        </h1>
        <p className="text-center text-foreground/60 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Answer a few quick questions so we can tailor your free discovery call.
        </p>

        <div className="glass rounded-2xl p-6 md:p-10">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
};

export default Apply;
