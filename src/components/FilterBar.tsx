import { FilterType } from "@/components/MapScreen";

interface Props {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

const filters: { key: FilterType; label: string; emoji: string }[] = [
  { key: "all", label: "Все", emoji: "🗺️" },
  { key: "my-ticket", label: "Мой билет", emoji: "🎫" },
  { key: "no-queue", label: "Без очереди", emoji: "⚡" },
];

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div
      className="flex rounded-2xl p-1 gap-0.5"
      style={{
        background: "hsl(220,18%,14%)",
        border: "1px solid hsl(220,15%,20%)",
      }}
    >
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all active:scale-95"
            style={{
              background: isActive ? "hsl(142,70%,50%)" : "transparent",
              color: isActive ? "hsl(220,20%,8%)" : "hsl(215,15%,55%)",
              boxShadow: isActive ? "0 2px 8px hsl(142,70%,50%,0.3)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <span className="text-sm leading-none">{f.emoji}</span>
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
