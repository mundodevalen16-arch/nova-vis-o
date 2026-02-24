import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const saleTypes = [
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇵🇹", value: "€72,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇪🇸", value: "€72,00" },
  { type: "pendente", flag: "🇧🇷", value: "R$ 397,00" },
  { type: "aprovada", flag: "🇺🇸", value: "$79,00" },
  { type: "aprovada", flag: "🇧🇷", value: "R$ 397,00" },
];

interface Notif {
  id: number;
  type: string;
  flag: string;
  value: string;
}

// Generate a simple notification beep using Web Audio API
const playBeep = (audioCtxRef: React.MutableRefObject<AudioContext | null>) => {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // silently fail
  }
};

const PhoneNotifications = () => {
  const [items, setItems] = useState<Notif[]>([]);
  const counterRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const addNotification = useCallback(() => {
    const idx = counterRef.current % saleTypes.length;
    const sale = saleTypes[idx];
    const id = Date.now() + counterRef.current;
    counterRef.current += 1;

    setItems((prev) => [{ id, ...sale }, ...prev].slice(0, 6));
    playBeep(audioCtxRef);
  }, []);

  useEffect(() => {
    // Add notifications at staggered intervals for realism
    const delays = [1500, 4000, 6500, 10000, 14000, 18500];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        addNotification();
      }, d)
    );

    // Then continue every 6s
    const interval = setInterval(addNotification, 6000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [addNotification]);

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

      {/* Lock Screen - Date & Time */}
      <div className="text-center pt-4 pb-3">
        <p className="text-[8px] text-foreground/50 font-medium">Segunda-feira, 24 de fevereiro</p>
        <p className="text-[28px] font-bold text-foreground/90 leading-none tracking-tight mt-0.5" style={{ fontVariantNumeric: "tabular-nums" }}>
          11:39
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
              layout
              initial={{ opacity: 0, y: -24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="rounded-2xl px-2 py-2 flex items-center gap-2"
              style={{
                background: "hsl(0 0% 100% / 0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* App icon */}
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                background: "linear-gradient(135deg, hsl(230 40% 20%), hsl(230 50% 30%))",
              }}>
                <span className="text-[9px] font-black text-foreground">3</span>
              </div>
              {/* Content */}
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
