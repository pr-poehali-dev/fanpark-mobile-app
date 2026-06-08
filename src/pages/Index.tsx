import { useState } from "react";
import MapScreen from "@/components/MapScreen";
import TicketModal from "@/components/TicketModal";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNav from "@/components/BottomNav";

type Screen = "map" | "profile";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("map");
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "hsl(220,25%,5%)" }}
    >
      {/* iPhone 17 Pro shell */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 402,
          height: 874,
          borderRadius: 54,
          background: "hsl(220,15%,9%)",
          boxShadow:
            "0 0 0 1.5px hsl(220,15%,22%), 0 0 0 3px hsl(220,15%,14%), 0 60px 120px -20px rgba(0,0,0,0.9), 0 0 80px -10px hsl(142,60%,30%,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Side buttons */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 140,
            width: 3,
            height: 36,
            background: "hsl(220,15%,20%)",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: -3,
            top: 188,
            width: 3,
            height: 64,
            background: "hsl(220,15%,20%)",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: -3,
            top: 262,
            width: 3,
            height: 64,
            background: "hsl(220,15%,20%)",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          className="absolute"
          style={{
            right: -3,
            top: 200,
            width: 3,
            height: 88,
            background: "hsl(220,15%,20%)",
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Screen inner */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: 52 }}
        >
          {/* Screen content */}
          <div
            className="relative w-full h-full overflow-hidden bg-background flex flex-col"
          >
            {/* Dynamic Island */}
            <div
              className="absolute z-50 flex items-center justify-center"
              style={{
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 36,
                borderRadius: 20,
                background: "#000",
                boxShadow: "0 0 0 1px hsl(220,15%,18%)",
              }}
            >
              {/* Camera dot */}
              <div
                className="absolute"
                style={{
                  right: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "hsl(220,15%,12%)",
                  boxShadow: "inset 0 0 0 2px hsl(220,15%,18%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 3,
                    borderRadius: "50%",
                    background: "hsl(220,50%,25%)",
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>

            {/* Status bar */}
            <div
              className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6"
              style={{ height: 56, paddingTop: 4 }}
            >
              <span className="text-[12px] font-semibold text-foreground/70">9:41</span>
              <div className="flex items-center gap-1.5">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            {/* App content */}
            <div className="flex-1 overflow-hidden relative">
              {screen === "map" && (
                <MapScreen onTicketOpen={() => setTicketOpen(true)} />
              )}
              {screen === "profile" && <ProfileScreen />}
            </div>

            <BottomNav active={screen} onChange={setScreen} />

            {ticketOpen && (
              <TicketModal onClose={() => setTicketOpen(false)} />
            )}

            {/* Home indicator */}
            <div
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50"
              style={{
                width: 130,
                height: 5,
                borderRadius: 3,
                background: "hsl(210,20%,85%,0.35)",
              }}
            />
          </div>
        </div>

        {/* Screen glare */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 52,
            background:
              "linear-gradient(135deg, hsl(0,0%,100%,0.04) 0%, transparent 40%)",
          }}
        />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" className="text-foreground/70" />
      <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" className="text-foreground/70" />
      <rect x="9" y="3" width="3" height="9" rx="0.8" fill="currentColor" className="text-foreground/70" />
      <rect x="13.5" y="0" width="2.5" height="12" rx="0.8" fill="currentColor" className="text-foreground/70" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor" className="text-foreground/70" />
      <path d="M4.2 7.3a5.4 5.4 0 017.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-foreground/70" />
      <path d="M1.5 4.6a9.2 9.2 0 0113 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-foreground/70" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.5" className="text-foreground" />
      <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" className="text-foreground/80" />
      <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" className="text-foreground/50" />
    </svg>
  );
}