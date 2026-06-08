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
    <div className="min-h-screen bg-[hsl(220,20%,6%)] flex justify-center items-start">
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col overflow-hidden bg-background shadow-2xl">
        {screen === "map" && (
          <MapScreen onTicketOpen={() => setTicketOpen(true)} />
        )}
        {screen === "profile" && <ProfileScreen />}

        <BottomNav active={screen} onChange={setScreen} />

        {ticketOpen && (
          <TicketModal onClose={() => setTicketOpen(false)} />
        )}
      </div>
    </div>
  );
}
