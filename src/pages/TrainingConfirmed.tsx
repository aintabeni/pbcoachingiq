import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import DotBackground from "@/components/DotBackground";
import { Calendar, ArrowLeft, Play } from "lucide-react";
import SEO from "@/components/SEO";

const EVENT_LINE = "LIVE · MAY 30TH, 2026 · 7:00 PM EST";
const EVENT_TITLE = "The Smart Player Blueprint · Live Training with Patrick";
const EVENT_DETAILS =
  "How to stop being the player who crumbles under pressure and become the star your team depends on. Show up live, replays are not guaranteed.";
// May 30th 2026, 7:00 PM EDT (UTC-4) = 23:00 UTC. 60 minute event.
const START_UTC = "20260530T230000Z";
const END_UTC = "20260531T000000Z";

const buildGoogleUrl = () => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${START_UTC}/${END_UTC}`,
    details: EVENT_DETAILS,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
};

const buildOutlookUrl = () => {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: EVENT_TITLE,
    startdt: "2026-05-30T23:00:00Z",
    enddt: "2026-05-31T00:00:00Z",
    body: EVENT_DETAILS,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

const buildIcs = () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Football Accelerator//Smart Player Blueprint//EN",
    "BEGIN:VEVENT",
    "UID:smart-player-blueprint-2026-05-30@pbcoachingiq.com",
    `DTSTAMP:${START_UTC}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:${EVENT_DETAILS}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};

const STEPS = [
  {
    n: "01",
    title: "Check your inbox",
    body: "We sent you an email with your training link and reminders. Check spam if you don't see it.",
  },
  {
    n: "02",
    title: "Block your calendar",
    body: "May 30th at 7PM EST. Set an alarm. This is live, one shot only, replays are not guaranteed.",
  },
  {
    n: "03",
    title: "Pick your moment",
    body: "Before the training, think of one match where pressure got the best of you. We're going to break it down on the live.",
  },
];

const TrainingConfirmed = () => {
  useEffect(() => {
    document.title = "You're In · Smart Player Blueprint";
  }, []);

  const googleUrl = useMemo(buildGoogleUrl, []);
  const outlookUrl = useMemo(buildOutlookUrl, []);
  const icsUrl = useMemo(buildIcs, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SEO
        title="Training Confirmed — Football Accelerator"
        description="You're registered for the Smart Player Blueprint live training on May 30, 2026. Add it to your calendar and prepare to show up live."
        path="/training/confirmed"
      />
      <DotBackground />
      <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto fade-in">
          {/* Eyebrow */}
          <p className="font-space-grotesk text-gradient-yellow font-bold uppercase tracking-[0.25em] text-xs md:text-sm text-center">
            The Smart Player Blueprint
          </p>

          <div className="mt-5 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="font-manrope text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/80">
                {EVENT_LINE}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-space-grotesk mt-10 text-center font-black uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-foreground">
            You're In.
            <br />
            Here's What To Do{" "}
            <span className="text-gradient-yellow">Next.</span>
          </h1>

          {/* Intro */}
          <p className="font-inter mt-8 text-center text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            I recorded a short video walking you through exactly what we're covering on May 30th at 7PM EST. Most people will skim the reminder emails and forget. Don't. The players who watch this before the live get way more out of it.
          </p>

          {/* Video placeholder */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-white/[0.04] to-transparent">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="group relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-primary/15 border border-primary/40 backdrop-blur-sm transition-transform hover:scale-105 glow-yellow"
                  >
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <Play className="relative h-8 w-8 md:h-10 md:w-10 text-primary fill-primary ml-1" strokeWidth={1.5} />
                  </button>
                  <p className="font-space-grotesk uppercase tracking-[0.25em] text-xs md:text-sm text-foreground/60 font-semibold">
                    Watch this first · 3 min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Calendar card */}
          <div className="mt-12 max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 glow-yellow">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="h-5 w-5 text-primary" strokeWidth={2.25} />
              <p className="font-space-grotesk uppercase tracking-[0.2em] text-sm md:text-base font-bold text-foreground">
                Add to Calendar
                <span className="text-foreground/50"> · May 30th · 7PM EST</span>
              </p>
            </div>
            <div className="font-manrope mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs md:text-sm uppercase tracking-[0.2em]">
              <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                Google
              </a>
              <span className="text-foreground/20">·</span>
              <a href={icsUrl} download="smart-player-blueprint.ics" className="text-foreground/80 hover:text-primary transition-colors">
                Apple
              </a>
              <span className="text-foreground/20">·</span>
              <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                Outlook
              </a>
              <span className="text-foreground/20">·</span>
              <a href={icsUrl} download="smart-player-blueprint.ics" className="text-foreground/80 hover:text-primary transition-colors">
                All Calendars
              </a>
            </div>
          </div>

          {/* What to do next */}
          <div className="mt-20">
            <p className="font-space-grotesk text-center uppercase tracking-[0.25em] text-xs md:text-sm text-foreground/60 font-semibold">
              What to do next
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 flex flex-col"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-space-grotesk inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/30 text-sm font-black text-gradient-yellow">
                      {s.n}
                    </span>
                    <p className="font-manrope text-[10px] uppercase tracking-[0.25em] text-foreground/50 font-semibold">
                      Step {s.n}
                    </p>
                  </div>
                  <h3 className="font-space-grotesk mt-5 text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="font-inter mt-3 text-sm text-foreground/70 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Personal sign-off */}
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <p className="font-inter italic text-base md:text-lg text-foreground/75 leading-relaxed">
              can't wait to show you the blueprint. this is the same system that took me from the 9th division to a pro contract. show up live, that's where the real breakthroughs happen.
            </p>
            <p className="font-space-grotesk mt-6 uppercase tracking-[0.3em] text-sm text-gradient-yellow font-bold">
              — Patrick
            </p>
          </div>

          {/* Back link */}
          <div className="mt-16 text-center">
            <Link
              to="/training"
              className="font-manrope inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to registration
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="font-manrope text-center text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/40">
              © 2026 Football Accelerator ·{" "}
              <a href="/privacy" className="hover:text-foreground/70 transition-colors">Privacy</a>
              {" · "}
              <a href="/terms" className="hover:text-foreground/70 transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingConfirmed;
