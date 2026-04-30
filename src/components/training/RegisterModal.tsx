import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useRegisterModal } from "./RegisterModalContext";
import { toast } from "@/hooks/use-toast";

const EVENT_LINE = "LIVE · MAY 30TH, 2026 · 7:00 PM EST";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
});

const RegisterModal = () => {
  const { open, closeModal } = useRegisterModal();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, email, phone });
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "Check your details",
        description: first?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("register-training", {
        body: {
          firstName: parsed.data.firstName,
          email: parsed.data.email,
          phone: parsed.data.phone || undefined,
        },
      });

      if (error || (data && (data as { error?: string }).error)) {
        const msg =
          (data as { error?: string })?.error ||
          error?.message ||
          "Could not register. Please try again.";
        toast({
          title: "Registration failed",
          description: msg,
          variant: "destructive",
        });
        return;
      }

      closeModal();
      navigate("/training/confirmed");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Registration failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? closeModal() : null)}>
      <DialogContent
        className="max-w-md p-0 border-white/10 bg-[#0a0a0c] [&>button]:hidden overflow-hidden"
      >
        <div className="relative p-6 md:p-8">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="absolute top-4 right-4 h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="font-space-grotesk font-black uppercase tracking-tight text-2xl md:text-3xl text-foreground">
            Save Your Free Spot
          </h2>
          <p className="font-inter mt-2 text-sm md:text-base text-foreground/70">
            Enter your details to register for the free training.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="font-manrope flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-foreground/70 mb-2">
                First Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your name"
                required
                maxLength={100}
                className="w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            <div>
              <label className="font-manrope flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-foreground/70 mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                maxLength={255}
                className="w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            <div>
              <label className="font-manrope flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/70 mb-2">
                Phone <span className="text-foreground/40 normal-case tracking-normal text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                maxLength={32}
                className="w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            <p className="font-inter text-[11px] leading-relaxed text-foreground/50 text-center px-2">
              By submitting, I consent to receive emails and SMS messages from Football Accelerator.
              Reply STOP to opt out. Msg &amp; data rates may apply. View our{" "}
              <a href="/privacy" className="underline hover:text-foreground/80">Privacy Policy</a> and{" "}
              <a href="/terms" className="underline hover:text-foreground/80">Terms</a>.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="font-manrope w-full bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary))] text-primary-foreground rounded-md py-4 font-bold uppercase tracking-[0.2em] text-sm glow-yellow transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? "Saving..." : "Save My Free Spot →"}
            </button>

            <p className="font-manrope text-center text-[11px] uppercase tracking-[0.25em] text-foreground/45 pt-1">
              {EVENT_LINE}
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
