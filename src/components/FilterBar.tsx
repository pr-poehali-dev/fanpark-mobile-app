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
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{
            background: active === f.key
              ? "hsl(142,70%,50%)"
              : "hsl(220,15%,18%)",
            color: active === f.key
              ? "hsl(220,20%,8%)"
              : "hsl(215,15%,65%)",
            border: active === f.key
              ? "1.5px solid hsl(142,70%,50%)"
              : "1.5px solid hsl(220,15%,24%)",
          }}
        >
          <span className="text-sm leading-none">{f.emoji}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
}
