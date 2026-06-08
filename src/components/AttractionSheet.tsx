import { useState } from "react";
import { Attraction } from "@/data/attractions";
import Icon from "@/components/ui/icon";

interface Props {
  attraction: Attraction;
  onClose: () => void;
  onShowOnMap?: () => void;
}

const MY_TICKET = "vip" as const;

const statusConfig = {
  open: {
    label: "Работает",
    color: "hsl(142,70%,50%)",
    bg: "hsl(142,70%,50%,0.12)",
    icon: "CheckCircle",
  },
  maintenance: {
    label: "На техобслуживании до 14:00",
    color: "hsl(36,100%,55%)",
    bg: "hsl(36,100%,55%,0.12)",
    icon: "Wrench",
  },
  closed: {
    label: "Закрыт",
    color: "hsl(0,75%,55%)",
    bg: "hsl(0,75%,55%,0.12)",
    icon: "XCircle",
  },
};

export default function AttractionSheet({ attraction, onClose, onShowOnMap }: Props) {
  const [booked, setBooked] = useState(false);
  const status = statusConfig[attraction.status];
  const hasAccess = attraction.ticketTypes.includes(MY_TICKET);
  const canBook = attraction.status === "open" && hasAccess;

  return (
    <>
      <div
        className="absolute inset-0 bg-black/60 z-30 animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute bottom-0 left-0 right-0 z-40 animate-slide-up">
        <div
          className="rounded-t-[32px] overflow-hidden"
          style={{ background: "hsl(220,20%,10%)", border: "1px solid hsl(220,15%,20%)" }}
        >
          {/* Photo */}
          <div className="relative h-52 overflow-hidden">
            {attraction.photo ? (
              <img
                src={attraction.photo}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: "hsl(220,18%,14%)" }}
              >
                {attraction.emoji}
              </div>
            )}
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(220,20%,10%) 0%, transparent 50%)",
              }}
            />
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "hsl(220,20%,8%,0.7)", backdropFilter: "blur(8px)" }}
            >
              <Icon name="X" size={16} />
            </button>
            {/* Handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/30" />
            {/* Wait badge on photo */}
            {attraction.status === "open" && attraction.waitMinutes !== null && (
              <div
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
                style={{ background: "hsl(220,20%,8%,0.75)", backdropFilter: "blur(10px)", border: "1px solid hsl(220,15%,25%)" }}
              >
                <Icon name="Clock" size={12} style={{ color: "hsl(142,70%,50%)" }} />
                <span className="text-xs font-bold text-foreground">
                  {attraction.waitMinutes === 0 ? "Без очереди" : `~${attraction.waitMinutes} мин`}
                </span>
              </div>
            )}
          </div>

          <div className="px-5 pt-3 pb-5 space-y-4">
            {/* Title & status */}
            <div>
              <h2 className="text-xl font-black text-foreground leading-tight mb-2">
                {attraction.name}
              </h2>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{ background: status.bg }}
              >
                <Icon name={status.icon} size={13} style={{ color: status.color }} />
                <span className="text-xs font-semibold" style={{ color: status.color }}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Restrictions */}
            {(attraction.minHeight || attraction.maxWeight) && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "hsl(220,18%,14%)", border: "1px solid hsl(220,15%,20%)" }}
              >
                <Icon name="AlertCircle" size={16} className="text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">
                    Ограничения
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {[
                      attraction.minHeight && `Рост от ${attraction.minHeight} см`,
                      attraction.maxWeight && `вес до ${attraction.maxWeight} кг`,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>
            )}

            {/* Ticket access */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: hasAccess ? "hsl(142,70%,50%,0.08)" : "hsl(36,100%,55%,0.08)",
                border: `1px solid ${hasAccess ? "hsl(142,70%,50%,0.25)" : "hsl(36,100%,55%,0.25)"}`,
              }}
            >
              <Icon
                name={hasAccess ? "Ticket" : "TicketX"}
                size={16}
                style={{ color: hasAccess ? "hsl(142,70%,50%)" : "hsl(36,100%,55%)", flexShrink: 0 }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold leading-tight"
                  style={{ color: hasAccess ? "hsl(142,70%,60%)" : "hsl(36,100%,65%)" }}
                >
                  {hasAccess
                    ? "Входит в ваш Premium-билет"
                    : "Не входит в ваш билет"}
                </p>
                {!hasAccess && (
                  <button className="text-xs font-bold underline mt-0.5" style={{ color: "hsl(36,100%,55%)" }}>
                    Доплатить?
                  </button>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => canBook && setBooked(!booked)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{
                  background: canBook
                    ? booked
                      ? "hsl(142,70%,40%)"
                      : "hsl(142,70%,50%)"
                    : "hsl(220,15%,18%)",
                  color: canBook ? "hsl(220,20%,8%)" : "hsl(215,15%,45%)",
                  cursor: canBook ? "pointer" : "not-allowed",
                  boxShadow: canBook ? "0 4px 16px hsl(142,70%,50%,0.3)" : "none",
                }}
              >
                <Icon name={booked ? "CheckCheck" : "CalendarCheck"} size={16} />
                {booked ? "Забронировано!" : "Забронировать время"}
              </button>

              <button
                onClick={onShowOnMap ?? onClose}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                style={{
                  background: "hsl(220,15%,18%)",
                  color: "hsl(210,20%,80%)",
                  border: "1px solid hsl(220,15%,24%)",
                }}
              >
                <Icon name="MapPin" size={16} />
                На карте
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
