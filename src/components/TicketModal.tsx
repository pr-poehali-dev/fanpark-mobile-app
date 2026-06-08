import Icon from "@/components/ui/icon";

interface Props {
  onClose: () => void;
}

export default function TicketModal({ onClose }: Props) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-50 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 animate-slide-up">
        <div
          className="w-full max-w-[430px] rounded-3xl overflow-hidden"
          style={{ background: "hsl(220,18%,11%)", border: "1px solid hsl(220,15%,22%)" }}
        >
          {/* Top gradient band */}
          <div
            className="px-6 pt-6 pb-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(142,60%,25%) 0%, hsl(220,40%,20%) 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: "hsl(142,70%,60%)", transform: "translate(30%, -30%)" }} />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "hsl(220,20%,8%,0.5)" }}
            >
              <Icon name="X" size={14} />
            </button>

            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(142,70%,70%)] mb-1">ФанПарк</p>
            <h2 className="text-2xl font-black text-white mb-0.5">VIP Билет</h2>
            <p className="text-sm text-white/60">Иванов Иван · Сегодня, 8 июня 2026</p>
          </div>

          {/* QR Code area */}
          <div className="px-6 py-6 flex flex-col items-center">
            <div
              className="w-52 h-52 rounded-2xl flex items-center justify-center mb-4 relative"
              style={{ background: "white" }}
            >
              <QRCodeSVG />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 3px hsl(142,70%,50%)" }}
              />
            </div>

            <p className="text-xs text-muted-foreground mb-1 tracking-widest font-mono uppercase">
              FP-2026-VIP-00142
            </p>
            <p className="text-[10px] text-muted-foreground/60 text-center max-w-[220px]">
              Покажите QR-код на входе или у кассы аттракциона
            </p>
          </div>

          {/* Perks */}
          <div className="px-6 pb-6 grid grid-cols-3 gap-2">
            {[
              { icon: "Star", label: "Все аттракционы" },
              { icon: "Zap", label: "Без очереди" },
              { icon: "Coffee", label: "Кафе -15%" },
            ].map((p) => (
              <div
                key={p.label}
                className="rounded-2xl p-3 flex flex-col items-center gap-2 text-center"
                style={{ background: "hsl(220,15%,16%)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(142,70%,50%,0.15)" }}
                >
                  <Icon name={p.icon} size={16} className="text-primary" />
                </div>
                <p className="text-[10px] font-semibold text-muted-foreground leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function QRCodeSVG() {
  const size = 180;
  const cells = 21;
  const cellSize = size / cells;

  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,0,0,1,1,1,0,1,1,0,1,0,1,0],
    [0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0],
    [1,0,0,1,0,1,1,0,1,1,0,1,1,0,0,1,0,1,0,0,1],
    [0,1,0,0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,0,1,0],
    [1,1,1,0,1,1,1,0,0,1,0,1,1,0,1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,0,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="hsl(220,20%,8%)"
            />
          ) : null
        )
      )}
    </svg>
  );
}
