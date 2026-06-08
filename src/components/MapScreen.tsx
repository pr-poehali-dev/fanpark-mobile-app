import { useState } from "react";
import { attractions, Attraction } from "@/data/attractions";
import AttractionPin from "@/components/AttractionPin";
import AttractionSheet from "@/components/AttractionSheet";
import FilterBar from "@/components/FilterBar";
import Icon from "@/components/ui/icon";

export type FilterType = "all" | "my-ticket" | "no-queue";

const MY_TICKET = "vip" as const;

interface Props {
  onTicketOpen: () => void;
}

export default function MapScreen({ onTicketOpen }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selected, setSelected] = useState<Attraction | null>(null);

  const filtered = attractions.filter((a) => {
    if (filter === "my-ticket") return a.ticketTypes.includes(MY_TICKET);
    if (filter === "no-queue") return a.status === "open" && (a.waitMinutes ?? 99) <= 10;
    return true;
  });

  const dimmed = (a: Attraction) => !filtered.find((f) => f.id === a.id);

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header */}
      <div className="glass px-5 pt-16 pb-4 z-20 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Добро пожаловать</p>
            <h1 className="text-2xl font-black tracking-tight text-foreground">ФанПарк</h1>
          </div>
          <button
            onClick={onTicketOpen}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all active:scale-95 hover:opacity-90 shadow-lg shadow-primary/25"
          >
            <Icon name="QrCode" size={16} />
            Мой билет
          </button>
        </div>

        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {/* Map */}
      <div className="relative flex-1 overflow-hidden park-map">
        {/* Decorative paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,50 Q30,20 50,50 Q70,80 90,50" stroke="hsl(142,50%,60%)" strokeWidth="0.8" fill="none" className="park-path" />
          <path d="M20,80 Q45,60 55,40 Q65,20 85,30" stroke="hsl(220,50%,60%)" strokeWidth="0.8" fill="none" className="park-path" />
          <path d="M5,30 Q25,45 50,35 Q75,25 95,40" stroke="hsl(36,80%,60%)" strokeWidth="0.6" fill="none" className="park-path" />
          <circle cx="50" cy="50" r="38" stroke="hsl(220,40%,50%)" strokeWidth="0.5" fill="none" opacity="0.5" strokeDasharray="3 5" />
        </svg>


        {/* Attraction pins */}
        {attractions.map((a, i) => (
          <AttractionPin
            key={a.id}
            attraction={a}
            dimmed={dimmed(a)}
            onClick={() => setSelected(a)}
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass rounded-2xl px-3 py-2.5 flex flex-col gap-1.5">
          <LegendItem color="hsl(142,70%,50%)" label="Работает" />
          <LegendItem color="hsl(36,100%,55%)" label="Техобслуживание" />
          <LegendItem color="hsl(0,75%,55%)" label="Закрыт" />
        </div>

        {/* Stats badge */}
        <div className="absolute bottom-4 right-4 glass rounded-2xl px-3 py-2.5 text-center">
          <p className="text-xl font-black text-primary leading-none">
            {attractions.filter(a => a.status === "open").length}
          </p>
          <p className="text-[9px] text-muted-foreground font-medium mt-0.5">работает</p>
        </div>
      </div>

      {/* Attraction Detail Sheet */}
      {selected && (
        <AttractionSheet
          attraction={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
    </div>
  );
}