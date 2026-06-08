import { CSSProperties } from "react";
import { Attraction } from "@/data/attractions";

interface Props {
  attraction: Attraction;
  dimmed: boolean;
  onClick: () => void;
  style?: CSSProperties;
}

const statusColors = {
  open: {
    bg: "hsl(142,70%,50%)",
    ring: "hsl(142,70%,50%)",
    pinClass: "attraction-pin-green",
  },
  maintenance: {
    bg: "hsl(36,100%,55%)",
    ring: "hsl(36,100%,55%)",
    pinClass: "attraction-pin-orange",
  },
  closed: {
    bg: "hsl(0,75%,55%)",
    ring: "hsl(0,75%,55%)",
    pinClass: "attraction-pin-red",
  },
};

export default function AttractionPin({ attraction, dimmed, onClick, style }: Props) {
  const colors = statusColors[attraction.status];

  return (
    <button
      onClick={onClick}
      className="absolute animate-fade-in"
      style={{
        left: `${attraction.x}%`,
        top: `${attraction.y}%`,
        transform: "translate(-50%, -50%)",
        opacity: dimmed ? 0.25 : 1,
        transition: "opacity 0.3s ease",
        zIndex: dimmed ? 1 : 10,
        ...style,
      }}
    >
      <div className="flex flex-col items-center gap-1">
        {/* Pin */}
        <div
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg attraction-pin"
          style={{
            background: `hsl(220,18%,14%)`,
            border: `2.5px solid ${colors.bg}`,
            boxShadow: `0 0 12px ${colors.ring}55`,
          }}
        >
          <span className={`relative z-10 attraction-pin ${colors.pinClass}`}>
            {attraction.emoji}
          </span>
        </div>

        {/* Wait badge */}
        {attraction.status === "open" && attraction.waitMinutes !== null && (
          <div
            className="px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap shadow-md"
            style={{
              background: attraction.waitMinutes <= 10
                ? "hsl(142,70%,50%)"
                : attraction.waitMinutes <= 25
                ? "hsl(36,100%,55%)"
                : "hsl(0,75%,55%)",
              color: "hsl(220,20%,8%)",
            }}
          >
            {attraction.waitMinutes === 0 ? "Без очереди" : `~${attraction.waitMinutes} мин`}
          </div>
        )}

        {attraction.status === "maintenance" && (
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap bg-[hsl(36,100%,55%)] text-[hsl(220,20%,8%)] shadow-md">
            Техобслуж.
          </div>
        )}

        {attraction.status === "closed" && (
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap bg-[hsl(0,75%,55%)] text-white shadow-md">
            Закрыт
          </div>
        )}
      </div>
    </button>
  );
}
