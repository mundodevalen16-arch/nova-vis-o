import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import notifIcon from "@/assets/notif-icon.png";

const saleTypes = [
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇧🇷", value: "R$ 197,00" },
  { type: "aprovada", flag: "🇵🇹", value: "€72,00" },
  { type: "aprovada", flag: "🇺🇸", value: "$79,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 597,00" },
  { type: "aprovada", flag: "🇪🇸", value: "€72,00" },
  { type: "aprovada", flag: "🇬🇧", value: "£62,00" },
  { type: "aprovada", flag: "🇩🇪", value: "€72,00" },
  { type: "pendente", flag: "🇺🇸", value: "$79,00" },
  { type: "aprovada", flag: "🇫🇷", value: "€72,00" },
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇦🇷", value: "$79,00" },
  { type: "aprovada", flag: "🇮🇹", value: "€72,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 297,00" },
  { type: "aprovada", flag: "🇯🇵", value: "¥11.800" },
  { type: "aprovada", flag: "🇲🇽", value: "$1.390,00" },
  { type: "aprovada", flag: "🇨🇦", value: "CA$105,00" },
  { type: "pendente", flag: "🇵🇹", value: "€72,00" },
  { type: "aprovada", flag: "🇦🇺", value: "A$119,00" },
];

const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

interface Notif {
  id: number;
  type: string;
  flag: string;
  value: string;
}

const PhoneNotifications = () => {
  const [items, setItems] = useState<Notif[]>([]);
  const [now, setNow] = useState(new Date());
  const counterRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);
  
  

  // Update clock every minute
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(iv);
  }, []);

  // Unlock audio on first user interaction (required by browsers)
  useEffect(() => {
    const unlock = () => {
      if (!audioUnlockedRef.current) {
        // Create and init audio on first interaction to ensure browser allows it
        if (!audioRef.current) {
          audioRef.current = new Audio("/sounds/shopify-notification.mp3");
          audioRef.current.volume = 0.3;
          audioRef.current.preload = "auto";
        }
        const a = audioRef.current;
        a.muted = true;
        a.play().then(() => {
          a.pause();
          a.currentTime = 0;
          a.muted = false;
          audioUnlockedRef.current = true;
        }).catch(() => {});
      }
    };
    const events = ["click", "touchstart", "scroll", "keydown", "mousemove", "pointerdown"] as const;
    events.forEach(e => document.addEventListener(e, unlock, { once: false, passive: true }));
    return () => {
      events.forEach(e => document.removeEventListener(e, unlock));
    };
  }, []);

  const addNotification = useCallback(() => {
    const sale = saleTypes[Math.floor(Math.random() * saleTypes.length)];
    const id = Date.now() + counterRef.current;
    counterRef.current += 1;

    setItems((prev) => [{ id, ...sale }, ...prev].slice(0, 6));

    // Play sound for all notifications
    if (audioRef.current && audioUnlockedRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    // Audio is now created in the unlock handler above
    // Just set up notification timers
    const delays = [800, 3000, 6000, 9000, 13000, 17000, 21000];
    const timers = delays.map((d) => setTimeout(addNotification, d));
    const interval = setInterval(addNotification, 10000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [addNotification]);

  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const dateStr = `${weekdays[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`;

  return (
    <div className="absolute inset-2 rounded-[2rem] overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, hsl(0 0% 8%), hsl(0 0% 5%) 40%, hsl(0 0% 3%))",
    }}>
      {/* iOS Status Bar */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <span className="text-[7px] text-foreground/50 font-semibold">Claro BR</span>
        <div className="flex gap-1 items-center">
          <span className="text-[7px] text-foreground/40">📶</span>
          <span className="text-[7px] text-foreground/40">🔋</span>
        </div>
      </div>

      {/* Lock Screen - Real Date & Time */}
      <div className="text-center pt-4 pb-3">
        <p className="text-[8px] text-foreground/50 font-medium">{dateStr}</p>
        <p className="text-[28px] font-bold text-foreground/90 leading-none tracking-tight mt-0.5" style={{ fontVariantNumeric: "tabular-nums" }}>
          {timeStr}
        </p>
      </div>

      {/* App header */}
      <div className="px-3 pb-1.5 flex items-center justify-between">
        <span className="text-[8px] font-semibold text-foreground/70">360 Digital</span>
        <div className="flex items-center gap-1">
          <span className="text-[7px] text-foreground/30">Mostrar menos</span>
          <span className="text-[7px] text-foreground/30">✕</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 px-1.5 space-y-[3px] overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl px-2 py-2 flex items-center gap-2"
              style={{
                background: "hsl(0 0% 100% / 0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <img src={notifIcon} alt="App" className="w-6 h-6 rounded-lg flex-shrink-0 object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-bold text-foreground/90 truncate">
                  Venda {item.type}! | {item.flag}
                </p>
                <p className="text-[7px] text-foreground/50 mt-[1px]">
                  Valor: {item.value}
                </p>
              </div>
              <span className="text-[7px] text-foreground/30 flex-shrink-0">agora</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="px-8 py-2 flex items-center justify-between">
        <span className="text-[10px]">🔦</span>
        <div className="w-8 h-1 rounded-full bg-foreground/20" />
        <span className="text-[10px]">📷</span>
      </div>
    </div>
  );
};

export default PhoneNotifications;
