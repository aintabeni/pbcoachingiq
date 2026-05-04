import { useState, useCallback, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { z } from "zod";
import { ChevronUp, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { toast } from "@/hooks/use-toast";

/* ── Schema ── */
const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  position: z.enum(["Attacker", "Midfielder", "Defender", "Goalkeeper"], {
    errorMap: () => ({ message: "Pick your position" }),
  }),
  age: z.number({ invalid_type_error: "Enter your age" }).int().min(5, "Enter a valid age").max(99, "Enter a valid age"),
  goals: z.string().trim().min(1, "Tell us what you want to achieve").max(2000),
});

type FormData = z.infer<typeof schema>;

const POSITIONS = ["Attacker", "Midfielder", "Defender", "Goalkeeper"] as const;

/* ── Step definitions ── */
interface Step {
  key: keyof FormData;
  label: string;
  sublabel?: string;
  type: "text" | "email" | "tel" | "select" | "number" | "textarea";
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
];

interface ApplicationFormProps {
  onComplete: () => void;
}

const ApplicationForm = ({ onComplete }: ApplicationFormProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = ((step) / totalSteps) * 100;

  useEffect(() => {
    // Auto-focus the input on step change
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
      setError(key === "position" ? "Pick your position" : "This field is required");
      return false;
    }

    // Per-field validation
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

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (step < totalSteps - 1) {
      setDirection("up");
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }, [step, totalSteps, validateStep]);

  const goBack = () => {
    if (step > 0) {
      setDirection("down");
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

  const handleSubmit = async () => {
    // Coerce age to number before validation
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

      onComplete();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Couldn't submit", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render helpers ── */
  const renderInput = () => {
    const baseClass =
      "w-full bg-white/[0.04] border border-white/10 rounded-lg px-5 py-4 text-foreground text-lg placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors";

    if (current.type === "select") {
      return (
        <div className="grid grid-cols-2 gap-3">
          {POSITIONS.map((pos) => {
            const selected = value === pos;
            return (
              <button
                key={pos}
                type="button"
                onClick={() => { setValue(pos); setError(""); }}
                className={`rounded-lg border px-4 py-4 text-base font-medium transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-white/10 bg-white/[0.04] text-foreground/70 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                {pos}
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

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={current.type}
        value={String(value)}
        onChange={(e) => setValue(current.type === "number" ? e.target.value : e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={current.placeholder}
        maxLength={current.type === "tel" ? 32 : 255}
        className={baseClass}
        inputMode={current.type === "number" ? "numeric" : undefined}
      />
    );
  };

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
      <div
        key={step}
        className="animate-step-in"
      >
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
        {current.type === "select" || step === totalSteps - 1 ? (
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
      {current.type !== "select" && current.type !== "textarea" && (
        <p className="text-foreground/25 text-xs mt-4">
          press <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">Enter ↵</span>
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;
