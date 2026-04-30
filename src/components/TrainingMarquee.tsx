const ITEMS = [
  "STOP CRUMBLING UNDER PRESSURE",
  "BECOME THE STAR PLAYER",
  "THE SMART PLAYER BLUEPRINT",
  "60 MINUTES · FREE LIVE TRAINING",
  "MAY 30 · 7PM EST",
  "9TH DIVISION TO PRO",
  "THINK FASTER · PLAY SMARTER",
  "LIMITED SEATS",
];

const Star = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z"
      fill={color}
    />
  </svg>
);

const Row = ({
  reverse,
  bg,
  textColor,
  starColor,
}: {
  reverse?: boolean;
  bg: string;
  textColor: string;
  starColor: string;
}) => {
  // duplicate items so the -50% translate creates a seamless loop
  const items = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      style={{
        position: "absolute",
        left: "-12%",
        right: "-12%",
        top: reverse ? 150 : 70,
        transform: `rotate(${reverse ? 4 : -4}deg)`,
        transformOrigin: "center",
        background: bg,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.35)",
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.45), 0 -2px 0 rgba(255,255,255,0.06) inset",
        padding: "16px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "tnw-marquee 55s linear infinite",
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {items.map((label, i) => (
          <span
            key={i}
            className="font-space-grotesk"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 22,
              paddingRight: 22,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: textColor,
            }}
          >
            {label}
            <Star color={starColor} />
          </span>
        ))}
      </div>
    </div>
  );
};

const TrainingMarquee = () => {
  // Yellow theme: primary #facc15-ish derived from --primary 50 95% 58%
  const yellow = "hsl(50 95% 58%)";
  const yellowDark = "hsl(50 60% 15%)";
  return (
    <div
      style={{
        position: "relative",
        height: 280,
        marginTop: -60,
        marginBottom: 60,
        overflow: "visible",
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <Row
        bg={`linear-gradient(135deg, ${yellow} 0%, hsl(45 100% 65%) 50%, ${yellow} 100%)`}
        textColor={yellowDark}
        starColor={yellowDark}
      />
      <Row reverse bg="#131313" textColor="#e5e2e1" starColor="#e5e2e1" />
    </div>
  );
};

export default TrainingMarquee;
