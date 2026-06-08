import Icon from "@/components/ui/icon";

const visits = [
  { date: "15 мая 2026", ticket: "VIP", attractions: 7, emoji: "🌟" },
  { date: "2 апреля 2026", ticket: "Стандарт", attractions: 4, emoji: "🎢" },
  { date: "14 февраля 2026", ticket: "VIP", attractions: 9, emoji: "❤️" },
  { date: "1 января 2026", ticket: "Стандарт", attractions: 3, emoji: "🎆" },
];

const savedTickets = [
  { type: "VIP", date: "8 июня 2026", code: "FP-2026-VIP-00142", active: true },
  { type: "Стандарт", date: "15 мая 2026", code: "FP-2026-STD-00087", active: false },
];

export default function ProfileScreen() {
  return (
    <div className="flex flex-col pb-20 min-h-full overflow-y-auto">
      {/* Header */}
      <div
        className="px-5 pt-16 pb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(220,30%,12%) 0%, hsl(220,20%,10%) 100%)",
        }}
      >
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
          style={{ background: "hsl(142,70%,50%)" }}
        />

        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
            style={{
              background: "linear-gradient(135deg, hsl(142,60%,35%), hsl(220,60%,40%))",
            }}
          >
            👤
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">Иванов Иван</h1>
            <p className="text-sm text-muted-foreground">ivan@example.com</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary">VIP гость</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "23", label: "Посещения" },
            { value: "142", label: "Аттракциона" },
            { value: "2 года", label: "С нами" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3 text-center"
              style={{ background: "hsl(220,18%,15%)" }}
            >
              <p className="text-xl font-black text-primary">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pt-5 space-y-5">
        {/* Saved tickets */}
        <section>
          <SectionHeader icon="Ticket" title="Сохранённые билеты" />
          <div className="space-y-2">
            {savedTickets.map((t) => (
              <div
                key={t.code}
                className="rounded-2xl p-4 flex items-center justify-between"
                style={{
                  background: "hsl(220,18%,12%)",
                  border: `1.5px solid ${t.active ? "hsl(142,70%,40%)" : "hsl(220,15%,20%)"}`,
                  opacity: t.active ? 1 : 0.65,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{
                      background: t.type === "VIP"
                        ? "hsl(142,70%,50%,0.15)"
                        : "hsl(220,15%,18%)",
                    }}
                  >
                    🎫
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.type} · {t.date}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{t.code}</p>
                  </div>
                </div>
                {t.active && (
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: "hsl(142,70%,50%)", color: "hsl(220,20%,8%)" }}
                  >
                    Активен
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Visit history */}
        <section>
          <SectionHeader icon="History" title="История посещений" />
          <div className="space-y-2">
            {visits.map((v) => (
              <div
                key={v.date}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: "hsl(220,18%,12%)", border: "1px solid hsl(220,15%,18%)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "hsl(220,15%,18%)" }}
                >
                  {v.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{v.date}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {v.ticket} · {v.attractions} аттракционов
                  </p>
                </div>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon name={icon} size={14} className="text-primary" />
      <h2 className="text-sm font-bold text-foreground tracking-tight">{title}</h2>
    </div>
  );
}