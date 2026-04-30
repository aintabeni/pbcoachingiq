import patrickImg from "@/assets/patrick-training.jpg";

const TrainingHost = () => {
  return (
    <section className="relative z-[2] px-4 md:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="rounded-lg overflow-hidden aspect-[3/4] bg-muted border border-border shadow-2xl">
            <img
              src={patrickImg}
              alt="Patrick — your host"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div>
            <p className="font-manrope text-primary font-semibold text-xs tracking-[0.4em] uppercase mb-4">
              Your Host
            </p>
            <h2 className="font-space-grotesk font-black uppercase text-gradient-yellow text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-8">
              Patrick
            </h2>
            <div className="flex flex-col gap-4 font-inter text-[15px] leading-relaxed text-foreground/75">
              <p>
                My name is Patrick. I am a professional football player. Over the last 20 years,
                I played in four different countries and went on trials in even more. My parents
                and I spent a lot of money on elite coaches. I worked with a Premier League
                nutritionist, former Cristiano Ronaldo's coach, and England's national team
                psychologist.
              </p>
              <p>
                But the game of football has changed. Hard work and basic drills are not enough.
                My career took off not because I got faster or stronger, but because I learned
                how to think. I went from the 9th division in Norway to the professional leagues
                in just one season. I went from a player who panicked under pressure to a player
                the game is built around. I have coached over 30 players in person using these
                exact steps to help them sign for elite academies.
              </p>
              <p className="text-foreground font-medium">
                On this live class I'm going to show you how to stop being the player who crumbles
                under pressure and become the star your team depends on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHost;
