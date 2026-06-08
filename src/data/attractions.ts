export type AttractionStatus = "open" | "closed" | "maintenance";
export type TicketType = "standard" | "vip" | "kids";

export interface Attraction {
  id: string;
  name: string;
  emoji: string;
  status: AttractionStatus;
  maintenanceUntil?: string;
  waitMinutes: number | null;
  x: number;
  y: number;
  ticketTypes: TicketType[];
  description: string;
  minHeight?: number;
  maxWeight?: number;
  photo?: string;
}

export const attractions: Attraction[] = [
  {
    id: "1",
    name: "Американские горки",
    emoji: "🎢",
    status: "open",
    waitMinutes: 35,
    x: 28,
    y: 22,
    ticketTypes: ["standard", "vip"],
    description: "Экстремальный аттракцион с крутыми виражами на скорости 90 км/ч",
    minHeight: 120,
    maxWeight: 120,
    photo: "https://cdn.poehali.dev/projects/3ce02da2-35a1-4399-b7c6-09377941fdd5/files/f029e3ab-5594-46ae-ad70-dea9f0850b0c.jpg",
  },
  {
    id: "2",
    name: "Колесо обозрения",
    emoji: "🎡",
    status: "open",
    waitMinutes: 10,
    x: 68,
    y: 18,
    ticketTypes: ["standard", "vip", "kids"],
    description: "Панорамный вид на весь парк",
  },
  {
    id: "3",
    name: "Карусель",
    emoji: "🎠",
    status: "open",
    waitMinutes: 5,
    x: 55,
    y: 52,
    ticketTypes: ["standard", "vip", "kids"],
    description: "Классическая карусель для всей семьи",
  },
  {
    id: "4",
    name: "Лабиринт страха",
    emoji: "👻",
    status: "maintenance",
    waitMinutes: null,
    x: 22,
    y: 62,
    ticketTypes: ["standard", "vip"],
    description: "Захватывающий лабиринт с неожиданными поворотами",
    minHeight: 110,
  },
  {
    id: "5",
    name: "Водные горки",
    emoji: "💦",
    status: "open",
    waitMinutes: 20,
    x: 78,
    y: 58,
    ticketTypes: ["vip"],
    description: "Освежающие горки с бассейном внизу",
    minHeight: 115,
  },
  {
    id: "6",
    name: "Детская площадка",
    emoji: "🪀",
    status: "open",
    waitMinutes: 0,
    x: 42,
    y: 78,
    ticketTypes: ["standard", "vip", "kids"],
    description: "Безопасная зона для маленьких посетителей",
  },
  {
    id: "7",
    name: "Батутный центр",
    emoji: "🤸",
    status: "closed",
    waitMinutes: null,
    x: 15,
    y: 40,
    ticketTypes: ["standard", "vip", "kids"],
    description: "Закрыт на сегодня",
  },
  {
    id: "8",
    name: "Автодром",
    emoji: "🏎️",
    status: "open",
    waitMinutes: 15,
    x: 83,
    y: 35,
    ticketTypes: ["standard", "vip"],
    description: "Гонки на электромобилях",
    minHeight: 105,
  },
];