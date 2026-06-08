import Icon from "@/components/ui/icon";

type Screen = "map" | "profile";

interface Props {
  active: Screen;
  onChange: (s: Screen) => void;
}

const tabs: { key: Screen; icon: string; label: string }[] = [
  { key: "map", icon: "Map", label: "Карта" },
  { key: "profile", icon: "User", label: "Профиль" },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        background: "hsl(220,18%,10%,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid hsl(220,15%,18%)",
      }}
    >
      <div className="flex items-center justify-around px-6 py-3 pb-5">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className="flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl transition-all active:scale-95"
              style={{
                background: isActive ? "hsl(142,70%,50%,0.12)" : "transparent",
              }}
            >
              <Icon
                name={t.icon}
                size={20}
                style={{ color: isActive ? "hsl(142,70%,50%)" : "hsl(215,15%,50%)" }}
              />
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? "hsl(142,70%,50%)" : "hsl(215,15%,50%)" }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}