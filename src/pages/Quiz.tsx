import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/pblogo.avif";

const positions = [
  { label: "Centre-Back", route: "/scanning-defenders" },
  { label: "Full-Back", route: "/scanning-defenders" },
  { label: "CDM", route: "/scanning-midfielders" },
  { label: "No.8", route: "/scanning-midfielders" },
  { label: "CAM (No.10)", route: "/scanning-midfielders" },
  { label: "Winger", route: "/scanning-attackers" },
  { label: "Striker", route: "/scanning-attackers" },
];

const struggles = [
  "Technique",
  "Tactics",
  "Confidence",
  "Technique + Tactics",
  "I struggle with all",
];

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedStruggle, setSelectedStruggle] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePosition = (label: string) => {
    setSelectedPositions((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const handleNext = () => {
    if (selectedPositions.length > 0) setStep(2);
  };

  const handleFinish = () => {
    if (!selectedStruggle) return;
    // Route based on first selected position
    const firstPos = positions.find((p) => selectedPositions.includes(p.label));
    if (firstPos) navigate(firstPos.route);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8 fade-in">
          <img src={logo} alt="PB Logo" className="h-16 w-auto" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 fade-in">
          <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
          <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
          <span className="ml-3 text-sm text-muted-foreground">{step} of 2</span>
        </div>

        {step === 1 && (
          <div className="fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              What position(s) do you play most?
            </h1>
            <div className="flex flex-col gap-3">
              {positions.map((pos) => (
                <button
                  key={pos.label}
                  onClick={() => togglePosition(pos.label)}
                  className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-200 border-2 ${
                    selectedPositions.includes(pos.label)
                      ? "bg-primary text-primary-foreground border-primary glow-yellow"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedPositions.length === 0}
              className="w-full mt-8 py-4 px-6 rounded-lg text-lg font-bold bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed glow-yellow"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="slide-in-right">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              What's your biggest challenge on the pitch right now?
            </h1>
            <div className="flex flex-col gap-3">
              {struggles.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStruggle(s)}
                  className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-200 border-2 ${
                    selectedStruggle === s
                      ? "bg-primary text-primary-foreground border-primary glow-yellow"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={handleFinish}
              disabled={!selectedStruggle}
              className="w-full mt-8 py-4 px-6 rounded-lg text-lg font-bold bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed glow-yellow"
            >
              Get My Custom Solution
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
