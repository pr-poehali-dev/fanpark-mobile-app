import { Attraction } from "@/data/attractions";
import Icon from "@/components/ui/icon";

interface Props {
  attraction: Attraction;
  onClose: () => void;
}

const statusLabel = {
  open: { text: "Работает", color: "hsl(142,70%,50%)" },
  maintenance: { text: "Техобслуживание", color: "hsl(36,100%,55%)" },
  closed: { text: "Закрыт", color: "hsl(0,75%,55%)" },
};

const ticketLabels: Record<string, string> = {
  standard: "Стандарт",
  vip: "VIP",
  kids: "Детский",
};

export default function AttractionSheet({ attraction, onClose }: Props) {
  const status = statusLabel[attraction.status];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-30 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 animate-slide-up">
        <div
          className="rounded-3xl p-5"
          style={{ background: "hsl(220,18%,13%)", border: "1px solid hsl(220,15%,22%)" }}
        >
          {/* Handle */}
          <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "hsl(220,18%,18%)" }}
              >
                {attraction.emoji}
              </div>
              <div>
                <h2 className="text-lg font-black text-foreground leading-tight">{attraction.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{attraction.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(220,15%,20%)" }}
            >
              <Icon name="X" size={14} />
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <StatCard
              icon="Circle"
              label="Статус"
              value={status.text}
              valueColor={status.color}
            />
            <StatCard
              icon="Clock"
              label="Ожидание"
              value={
                attraction.status === "open" && attraction.waitMinutes !== null
                  ? attraction.waitMinutes === 0
                    ? "Нет"
                    : `~${attraction.waitMinutes} мин`
                  : "—"
              }
            />
            <StatCard
              icon="Ruler"
              label="Рост от"
              value={attraction.minHeight ? `${attraction.minHeight} см` : "Любой"}
            />
          </div>

          {/* Ticket types */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2">
              Билеты
            </p>
            <div className="flex gap-2 flex-wrap">
              {attraction.ticketTypes.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-xl text-xs font-semibold"
                  style={{
                    background: t === "vip"
                      ? "hsl(142,70%,50%)"
                      : t === "kids"
                      ? "hsl(220,80%,65%)"
                      : "hsl(220,15%,22%)",
                    color: t === "vip" || t === "kids"
                      ? "hsl(220,20%,8%)"
                      : "hsl(210,20%,85%)",
                  }}
                >
                  {ticketLabels[t]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 flex flex-col gap-1"
      style={{ background: "hsl(220,18%,17%)" }}
    >
      <Icon name={icon} size={12} className="text-muted-foreground" />
      <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
      <p className="text-sm font-bold leading-tight" style={{ color: valueColor || "hsl(210,20%,90%)" }}>
        {value}
      </p>
    </div>
  );
}