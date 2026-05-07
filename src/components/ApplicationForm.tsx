import { useState, useCallback, useRef, useEffect, KeyboardEvent, useMemo } from "react";
import { z } from "zod";
import { ChevronUp, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "@/hooks/use-toast";

const BUDGET_OPTIONS = ["< $50", "$50 - $100", "$200 - $500", "$500 - $1,000", "$1,000+"] as const;
const POSITIONS = ["Attacker", "Midfielder", "Defender", "Goalkeeper"] as const;

const PITCH_POSITIONS = [
  { label: "ST", x: 50, y: 5, category: "Attacker" as const },
  { label: "CAM", x: 50, y: 18, category: "Midfielder" as const },
  { label: "LW", x: 22, y: 25, category: "Attacker" as const },
  { label: "RW", x: 78, y: 25, category: "Attacker" as const },
  { label: "CM", x: 50, y: 38, category: "Midfielder" as const },
  { label: "DM", x: 50, y: 52, category: "Midfielder" as const },
  { label: "LB", x: 15, y: 68, category: "Defender" as const },
  { label: "CB", x: 38, y: 68, category: "Defender" as const },
  { label: "CB", x: 62, y: 68, category: "Defender" as const },
  { label: "RB", x: 85, y: 68, category: "Defender" as const },
  { label: "GK", x: 50, y: 88, category: "Goalkeeper" as const },
];

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  position: z.enum(["Attacker", "Midfielder", "Defender", "Goalkeeper"], {
    errorMap: () => ({ message: "Pick your position" }),
  }),
  age: z.number({ invalid_type_error: "Enter your age" }).int().min(5, "Enter a valid age").max(99, "Enter a valid age"),
  goals: z.string().trim().min(1, "Tell us what you want to achieve").max(2000),
  budget: z.enum(["< $50", "$50 - $100", "$200 - $500", "$500 - $1,000", "$1,000+"], {
    errorMap: () => ({ message: "Select your budget" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Step {
  key: keyof FormData;
  label: string;
  sublabel?: string;
  type: "text" | "email" | "tel" | "select" | "number" | "textarea" | "budget";
  placeholder?: string;
  required?: boolean;
}

const STEPS: Step[] = [
  { key: "firstName", label: "What's your first name?", type: "text", placeholder: "Your name", required: true },
  { key: "email", label: "What's your email?", sublabel: "We'll send your call confirmation here.", type: "email", placeholder: "you@example.com", required: true },
  { key: "phone", label: "Phone number", sublabel: "Optional — we'll text reminders if you'd like.", type: "tel", placeholder: "(555) 000-0000" },
  { key: "position", label: "What position do you play?", type: "select", required: true },
  { key: "age", label: "How old are you?", type: "number", placeholder: "e.g. 17", required: true },
  { key: "goals", label: "What do you want to achieve?", sublabel: "Be specific — it helps us prepare for your call.", type: "textarea", placeholder: "e.g. I want to improve my first touch and play at a higher level…", required: true },
  { key: "budget", label: "How much are you willing to invest in your development?", type: "budget", required: true },
];

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [selectedDotIndex, setSelectedDotIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<FormData>>(() => {
    try {
      const saved = localStorage.getItem("pb_position");
      if (saved && (POSITIONS as readonly string[]).includes(saved)) {
        return { position: saved as FormData["position"] };
      }
    } catch {}
    return {};
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [step]);

  const value = formData[current.key] ?? "";

  const setValue = (val: string | number) => {
    setFormData((prev) => ({ ...prev, [current.key]: val }));
    setError("");
  };

  const validateStep = useCallback((): boolean => {
    const key = current.key;
    const val = formData[key];

    if (current.required && (val === undefined || val === "")) {
      if (key === "position") { setError("Pick your position"); return false; }
      if (key === "budget") { setError("Select your budget"); return false; }
      setError("This field is required");
      return false;
    }

    if (key === "email") {
      const r = z.string().email().safeParse(val);
      if (!r.success) { setError("Enter a valid email"); return false; }
    }
    if (key === "age") {
      const n = Number(val);
      if (!Number.isInteger(n) || n < 5 || n > 99) { setError("Enter a valid age"); return false; }
    }

    setError("");
    return true;
  }, [current, formData]);

  const handleSubmit = async () => {
    const payload = { ...formData, age: Number(formData.age) };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      setError(first?.message ?? "Check your answers");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("apply-discovery", {
        body: parsed.data,
      });

      if (fnError || (data && (data as { error?: string }).error)) {
        const msg = (data as { error?: string })?.error || fnError?.message || "Something went wrong. Please try again.";
        toast({ title: "Couldn't submit", description: typeof msg === "string" ? msg : "Please try again.", variant: "destructive" });
        return;
      }

      // Redirect to Calendly
      window.location.href = CALENDLY_URL;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Couldn't submit", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }, [step, totalSteps, validateStep]);

  const goBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setError("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && current.type !== "textarea") {
      e.preventDefault();
      goNext();
    }
  };

  const renderInput = () => {
    const baseClass =
      "w-full bg-white/[0.04] border border-white/10 rounded-lg px-5 py-4 text-foreground text-lg placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors";

    if (current.type === "select") {
      return (
        <div className="relative w-full aspect-[4/5] max-w-xs mx-auto">
          {PITCH_POSITIONS.map((pos, i) => {
            const selected = value === pos.category;
            return (
              <button
                key={`${pos.label}-${i}`}
                type="button"
                onClick={() => { setValue(pos.category); setError(""); }}
                className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span
                  className={`text-xs font-bold transition-colors ${
                    selected ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {pos.label}
                </span>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    selected
                      ? "bg-primary shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)]"
                      : "bg-destructive shadow-[0_0_8px_2px_hsl(var(--destructive)/0.5)] group-hover:shadow-[0_0_12px_3px_hsl(var(--destructive)/0.7)]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      );
    }

    if (current.type === "budget") {
      return (
        <div className="grid grid-cols-1 gap-3">
          {BUDGET_OPTIONS.map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => { setValue(opt); setError(""); }}
                className={`rounded-lg border px-5 py-4 text-base font-medium transition-all duration-200 text-left ${
                  selected
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-white/10 bg-white/[0.04] text-foreground/70 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    if (current.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={String(value)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={current.placeholder}
          maxLength={2000}
          rows={4}
          className={`${baseClass} resize-none`}
        />
      );
    }

    if (current.type === "tel") {
      return (
        <PhoneInput
          value={String(value) as any}
          onChange={(val) => setValue(val || "")}
          defaultCountry="US"
          placeholder={current.placeholder}
          className="w-full"
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={current.type}
        value={String(value)}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={current.placeholder}
        maxLength={255}
        className={baseClass}
        inputMode={current.type === "number" ? "numeric" : undefined}
      />
    );
  };

  const showContinueButton = current.type === "select" || current.type === "budget" || step === totalSteps - 1;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <p className="text-foreground/40 text-sm font-medium mb-6 tracking-wide">
        {step + 1} → {totalSteps}
      </p>

      {/* Question */}
      <div key={step} className="animate-step-in">
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight">
          {current.label}
        </h2>
        {current.sublabel && (
          <p className="text-foreground/50 text-base mb-6">{current.sublabel}</p>
        )}
        {!current.sublabel && <div className="mb-6" />}

        {renderInput()}

        {error && (
          <p className="text-red-400 text-sm mt-2 animate-fade-in">{error}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3">
        {showContinueButton ? (
          <InteractiveHoverButton
            text={step === totalSteps - 1 ? (submitting ? "Submitting..." : "Submit Application") : "Continue"}
            onClick={goNext}
            disabled={submitting}
            className="border-primary/30 text-foreground"
          />
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-foreground rounded-lg px-6 py-3 text-base font-semibold transition-colors"
          >
            OK <Check className="w-4 h-4" />
          </button>
        )}

        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.04] text-foreground/50 hover:text-foreground hover:bg-white/[0.08] transition-colors"
            aria-label="Go back"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Press Enter hint */}
      {current.type !== "select" && current.type !== "textarea" && current.type !== "budget" && (
        <p className="text-foreground/25 text-xs mt-4">
          press <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">Enter ↵</span>
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;
