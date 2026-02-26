import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";


const pitchPositions = [
  { label: "ST", x: 50, y: 5, route: "/scanning-attackers" },
  { label: "CAM", x: 50, y: 18, route: "/scanning-midfielders" },
  { label: "LW", x: 22, y: 25, route: "/scanning-attackers" },
  { label: "RW", x: 78, y: 25, route: "/scanning-attackers" },
  { label: "CM", x: 50, y: 38, route: "/scanning-midfielders" },
  { label: "DM", x: 50, y: 52, route: "/scanning-midfielders" },
  { label: "LB", x: 15, y: 68, route: "/scanning-defenders" },
  { label: "CB", x: 38, y: 68, route: "/scanning-defenders" },
  { label: "CB", x: 62, y: 68, route: "/scanning-defenders" },
  { label: "RB", x: 85, y: 68, route: "/scanning-defenders" },
  { label: "GK", x: 50, y: 88, route: "/scanning-defenders" },
];

const struggles = [
  "Technique",
  "Physicality/Conditioning",
  "Confidence",
  "Scanning",
  "I struggle with all",
];

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [selectedStruggle, setSelectedStruggle] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectPosition = (index: number) => {
    setSelectedPositions([index]);
  };

  const handleNext = () => {
    if (selectedPositions.length > 0) setStep(2);
  };

  const handleFinish = () => {
    if (!selectedStruggle) return;
    const firstPos = pitchPositions[selectedPositions[0]];
    if (firstPos) navigate(firstPos.route);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <div className="w-full max-w-lg">

        {/* Progress Bar */}
        <div className="mb-6 fade-in">
          <p className="text-sm text-muted-foreground text-center mb-2">
            Step {step} of 2
          </p>
          <div className="flex gap-1 w-full">
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
          </div>
        </div>

        {step === 1 && (
          <div className="fade-in">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-foreground">
              What position do you play most?
            </h1>

            {/* Pitch Formation */}
            <div className="relative w-full aspect-[4/5] max-w-xs mx-auto mb-4">
              {pitchPositions.map((pos, i) => {
                const isSelected = selectedPositions.includes(i);
                return (
                  <button
                    key={`${pos.label}-${i}`}
                    onClick={() => selectPosition(i)}
                    className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {pos.label}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        isSelected
                          ? "bg-primary shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)]"
                          : "bg-destructive shadow-[0_0_8px_2px_hsl(var(--destructive)/0.5)] group-hover:shadow-[0_0_12px_3px_hsl(var(--destructive)/0.7)]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <InteractiveHoverButton
              text="Next"
              onClick={handleNext}
              disabled={selectedPositions.length === 0}
              className="disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        )}

        {step === 2 && (
          <div className="slide-in-right">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
              What's your biggest challenge on the pitch right now?
            </h1>
            <div className="flex flex-col gap-2">
              {struggles.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStruggle(s)}
                  className={`w-full py-3 px-5 rounded-lg text-base font-semibold transition-all duration-200 border-2 ${
                    selectedStruggle === s
                      ? "bg-primary text-primary-foreground border-primary glow-yellow"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <InteractiveHoverButton
              text="Get My Custom Solution"
              onClick={handleFinish}
              disabled={!selectedStruggle}
              className="mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
