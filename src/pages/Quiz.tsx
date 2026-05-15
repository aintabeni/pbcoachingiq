import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SEO from "@/components/SEO";


const pitchPositions = [
  { label: "ST", x: 50, y: 5, scanningRoute: "/scanning-attackers", techniqueRoute: "/technique-attackers", conditioningRoute: "/conditioning" },
  { label: "CAM", x: 50, y: 18, scanningRoute: "/scanning-midfielders", techniqueRoute: "/technique-midfielders", conditioningRoute: "/conditioning" },
  { label: "LW", x: 22, y: 25, scanningRoute: "/scanning-attackers", techniqueRoute: "/technique-attackers", conditioningRoute: "/conditioning" },
  { label: "RW", x: 78, y: 25, scanningRoute: "/scanning-attackers", techniqueRoute: "/technique-attackers", conditioningRoute: "/conditioning" },
  { label: "CM", x: 50, y: 38, scanningRoute: "/scanning-midfielders", techniqueRoute: "/technique-midfielders", conditioningRoute: "/conditioning" },
  { label: "DM", x: 50, y: 52, scanningRoute: "/scanning-midfielders", techniqueRoute: "/technique-midfielders", conditioningRoute: "/conditioning" },
  { label: "LB", x: 15, y: 68, scanningRoute: "/scanning-defenders", techniqueRoute: "/technique-defenders", conditioningRoute: "/conditioning" },
  { label: "CB", x: 38, y: 68, scanningRoute: "/scanning-defenders", techniqueRoute: "/technique-defenders", conditioningRoute: "/conditioning" },
  { label: "CB", x: 62, y: 68, scanningRoute: "/scanning-defenders", techniqueRoute: "/technique-defenders", conditioningRoute: "/conditioning" },
  { label: "RB", x: 85, y: 68, scanningRoute: "/scanning-defenders", techniqueRoute: "/technique-defenders", conditioningRoute: "/conditioning" },
  { label: "GK", x: 50, y: 88, scanningRoute: "/scanning-defenders", techniqueRoute: "/technique-defenders", conditioningRoute: "/conditioning" },
];

const struggles = [
  "Scanning",
  "Technique",
  "Conditioning",
];

const CheckBadge = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="animate-confirm-pop"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="11" fill="hsl(var(--primary))" />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="28"
      strokeDashoffset="28"
      className="animate-check-draw"
    />
  </svg>
);

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [selectedStruggle, setSelectedStruggle] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPositions.length > 0) return;
    const interval = setInterval(() => {
      setHighlightedIndex(Math.floor(Math.random() * pitchPositions.length));
    }, 1500);
    return () => clearInterval(interval);
  }, [selectedPositions.length]);

  const selectPosition = (index: number) => {
    if (confirming) return;
    setSelectedPositions([index]);
    const label = pitchPositions[index]?.label ?? "";
    const category = label === "GK" ? "Goalkeeper"
      : ["LB", "CB", "RB"].includes(label) ? "Defender"
      : ["CM", "DM", "CAM"].includes(label) ? "Midfielder"
      : "Attacker";
    try { localStorage.setItem("pb_position", category); } catch {}
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setStep(2);
    }, 400);
  };

  const selectStruggle = (s: string) => {
    if (confirming) return;
    setSelectedStruggle(s);
  };

  const handleFinish = () => {
    if (!selectedStruggle || confirming) return;
    const firstPos = pitchPositions[selectedPositions[0]];
    if (!firstPos) return;
    setConfirming(true);
    setTimeout(() => {
      if (selectedStruggle === "Technique") navigate(firstPos.techniqueRoute);
      else if (selectedStruggle === "Conditioning") navigate(firstPos.conditioningRoute);
      else navigate(firstPos.scanningRoute);
    }, 400);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <SEO
        title="Football Position Quiz — Scanning Accelerator"
        description="Take the 2-question quiz to get a custom football training plan based on your position and biggest area to improve."
        path="/quiz"
      />
      <div className="w-full max-w-lg">

        {/* Progress Bar */}
        <div className="mb-6 fade-in">
          <p className="text-sm text-muted-foreground text-center mb-2">
            Step {step} of 2
          </p>
          <div className="flex gap-1 w-full">
            <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 1 || (step === 1 && confirming) ? "bg-primary" : "bg-secondary"}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 2 || (step === 1 && confirming) ? "bg-primary" : "bg-secondary"}`} />
          </div>
        </div>

        {step === 1 && (
          <div className={`fade-in transition-opacity duration-300 ${confirming ? "opacity-95" : ""}`}>
            <h1 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
              Click the position you most play in
            </h1>

            <div className={`flex items-center justify-center gap-2 mb-4 text-muted-foreground transition-opacity duration-300 ${confirming ? "opacity-0" : ""}`}>
              <span className="text-lg">👆</span>
              <span className="text-xs tracking-wide">Tap a position on the pitch below</span>
            </div>

            {/* Pitch Formation */}
            <div className="relative w-full aspect-[4/5] max-w-xs mx-auto mb-4">
              {pitchPositions.map((pos, i) => {
                const isSelected = selectedPositions.includes(i);
                const dimmed = confirming && !isSelected;
                return (
                  <button
                    key={`${pos.label}-${i}`}
                    onClick={() => selectPosition(i)}
                    disabled={confirming}
                    className={`absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                      dimmed ? "opacity-25 grayscale" : "opacity-100"
                    }`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {pos.label}
                    </span>
                    <div className="relative">
                      {i === highlightedIndex && selectedPositions.length === 0 && (
                        <span className="absolute inset-0 -m-1.5 rounded-full animate-ping bg-primary opacity-50" />
                      )}
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          isSelected
                            ? "bg-primary shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] animate-lockin-pulse"
                            : "bg-destructive shadow-[0_0_8px_2px_hsl(var(--destructive)/0.5)] group-hover:shadow-[0_0_12px_3px_hsl(var(--destructive)/0.7)]"
                        }`}
                      />
                      {isSelected && confirming && (
                        <span className="absolute -top-2 -right-2 z-10">
                          <CheckBadge size={16} />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {step === 2 && (
          <div className="slide-in-right">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
              What's your biggest challenge on the pitch right now?
            </h1>
            <div className="flex flex-col gap-2">
              {struggles.map((s) => {
                const isSelected = selectedStruggle === s;
                const dimmed = confirming && !isSelected;
                return (
                  <button
                    key={s}
                    onClick={() => selectStruggle(s)}
                    disabled={confirming}
                    className={`relative w-full py-3 px-5 rounded-lg text-base font-semibold transition-all duration-300 border-2 ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary glow-yellow"
                        : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                    } ${dimmed ? "opacity-25 grayscale" : "opacity-100"} ${
                      isSelected && confirming ? "animate-lockin-pulse" : ""
                    }`}
                  >
                    {s}
                    {isSelected && confirming && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckBadge size={20} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <InteractiveHoverButton
              text="Get My Custom Solution"
              onClick={handleFinish}
              disabled={!selectedStruggle || confirming}
              className="mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
