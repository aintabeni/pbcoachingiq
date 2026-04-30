import { Check, X } from "lucide-react";

const FOR_YOU = [
  "You play competitive football (or want to play) and want to stand out on the pitch",
  "You feel you've got more in you but training drills aren't translating to games",
  "You want to think the game faster and play with more confidence under pressure",
  "You're ready to upgrade your football IQ, not just your physical stats",
];

const NOT_FOR_YOU = [
  "You're looking for a magic shortcut to becoming a pro overnight",
  "You blame coaches, teammates or referees for your performances",
  "You're not willing to rewire how you watch and read the game",
  "You only care about highlight-reel skills, not winning real matches",
];

const TrainingForYou = () => {
  return (
    <section className="relative z-[2] px-4 md:px-8 py-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="font-space-grotesk uppercase font-bold text-foreground tracking-tight text-xl md:text-[22px] mb-7">
            This is for you if…
          </h2>
          <ul className="flex flex-col gap-4">
            {FOR_YOU.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-inter text-[14.5px] leading-relaxed text-foreground/75"
              >
                <span className="w-5 h-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 inline-flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk uppercase font-bold text-foreground tracking-tight text-xl md:text-[22px] mb-7">
            This is not for you if…
          </h2>
          <ul className="flex flex-col gap-4">
            {NOT_FOR_YOU.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-inter text-[14.5px] leading-relaxed text-foreground/55"
              >
                <span className="w-5 h-5 rounded-full border border-red-500/30 bg-red-500/10 inline-flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-[11px] h-[11px] text-red-500" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrainingForYou;
