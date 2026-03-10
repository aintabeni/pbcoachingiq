import { CheckCircle, Calendar, Clock, Video, Mail } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { SocialProof } from "@/components/SocialProof";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useSearchParams } from "react-router-dom";

const ThankYou = () => {
  const [searchParams] = useSearchParams();

  const calendarLinks = [
    {
      label: "Google Calendar",
      icon: Calendar,
      url: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=PB+Coaching+Discovery+Call&details=Join+Zoom:+https://us05web.zoom.us/j/87824578273?pwd=FxMwrDWhaDbSxMattkrn7lRVpEqA3C.1&sf=true",
    },
    {
      label: "Outlook Calendar",
      icon: Calendar,
      url: "https://outlook.live.com/calendar/0/action/compose?subject=PB+Coaching+Discovery+Call&body=Join+Zoom:+https://us05web.zoom.us/j/87824578273?pwd=FxMwrDWhaDbSxMattkrn7lRVpEqA3C.1",
    },
    {
      label: "iCloud Calendar",
      icon: Calendar,
      url: "webcal://",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Meeting Confirmed Section */}
      <div className="glass rounded-2xl p-10 md:p-14 max-w-xl w-full fade-in flex flex-col items-center gap-6 text-center mb-10">
        <CheckCircle className="w-16 h-16 text-primary" />
        <h1 className="text-3xl md:text-4xl font-black text-foreground">
          Your Meeting has been Scheduled
        </h1>
        <p className="text-foreground/80 text-base md:text-lg max-w-md">
          Thank you for your appointment request. You will be contacted shortly to confirm your request. Please email me at{" "}
          <a href="mailto:contact@pbcoachingiq.com" className="text-primary hover:underline">
            contact@pbcoachingiq.com
          </a>{" "}
          if you have any questions.
        </p>

        {/* Meeting Details Card */}
        <div className="w-full mt-4 rounded-xl border border-border/40 bg-card/50 p-6 text-left space-y-4">
          <div className="flex items-center gap-3 text-foreground/90">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <span className="font-semibold">30 Mins</span>
          </div>
          <div className="flex items-center gap-3 text-foreground/90">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <span>Check your email for the confirmed date & time</span>
          </div>
          <div className="flex items-center gap-3 text-foreground/90">
            <Video className="w-5 h-5 text-primary shrink-0" />
            <a
              href="https://us05web.zoom.us/j/87824578273?pwd=FxMwrDWhaDbSxMattkrn7lRVpEqA3C.1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all text-sm"
            >
              Join via Zoom
            </a>
          </div>
          <div className="flex items-center gap-3 text-foreground/90">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <a href="mailto:contact@pbcoachingiq.com" className="text-primary hover:underline text-sm">
              contact@pbcoachingiq.com
            </a>
          </div>
        </div>

        {/* Calendar Links */}
        <div className="w-full mt-2">
          <p className="text-sm text-foreground/60 mb-3">Add to your calendar:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {calendarLinks.map((cal) => (
              <a
                key={cal.label}
                href={cal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 bg-card/30 hover:bg-primary/10 hover:border-primary/40 transition-all text-sm text-foreground/80 hover:text-primary"
              >
                <cal.icon className="w-4 h-4" />
                {cal.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube CTA */}
      <div className="glass rounded-2xl p-8 md:p-10 max-w-xl w-full fade-in flex flex-col items-center gap-4 text-center mb-10">
        <p className="text-foreground/80 text-base">
          While you wait, check out free training content:
        </p>
        <InteractiveHoverButton
          text="Watch Free Content on YouTube"
          onClick={() => window.open("https://www.youtube.com/@pb_coaching_iq", "_blank")}
        />
      </div>

      <Testimonials showCTA={false} />
      <SocialProof />
    </div>
  );
};

export default ThankYou;
