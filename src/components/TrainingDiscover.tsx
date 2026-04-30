import { Lock } from "lucide-react";

const ITEMS = [
  {
    n: "01",
    title: "The Panic Cure",
    desc: "How to shine when defenders close you down and the pressure is at its highest.",
  },
  {
    n: "02",
    title: "The 1-Second Scanning Rule",
    desc: "How to gain 2 to 3 extra seconds every time you receive the ball.",
  },
  {
    n: "03",
    title: "The Training Trap",
    desc: "Why Instagram drills are making you look like an amateur in real games.",
  },
  {
    n: "04",
    title: "First Touch Fix",
    desc: "How to stop losing the ball and play forward with control even under heavy pressure.",
  },
];

const TrainingDiscover = () => {
  return (
    <section className="relative z-[2] px-4 md:px-8 pt-10 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="font-manrope text-primary font-semibold text-xs tracking-[0.4em] uppercase">
            Inside the Masterclass
          </p>
          <h2 className="font-space-grotesk uppercase font-black text-foreground tracking-tight leading-none mt-4 text-3xl md:text-4xl lg:text-5xl">
            What You'll Learn
          </h2>
          <div className="h-[2px] w-24 mt-5 bg-gradient-to-r from-[hsl(50_100%_78%)] via-[hsl(45_100%_55%)] to-[hsl(50_100%_78%)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.n}
              className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-md p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-space-grotesk text-[56px] font-black leading-none opacity-60 text-gradient-yellow">
                  {item.n}
                </span>
                <Lock className="w-[18px] h-[18px] text-primary/50" />
              </div>
              <h3 className="font-space-grotesk uppercase font-bold text-lg tracking-tight text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-inter text-sm leading-relaxed text-foreground/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingDiscover;
