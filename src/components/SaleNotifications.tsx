import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const notifications = [
  { flag: "🇧🇷", value: "R$397,00" },
  { flag: "🇧🇷", value: "R$397,00" },
  { flag: "🇵🇹", value: "€72,00" },
  { flag: "🇧🇷", value: "R$397,00" },
  { flag: "🇪🇸", value: "€72,00" },
  { flag: "🇧🇷", value: "R$397,00" },
  { flag: "🇺🇸", value: "$79,00" },
  { flag: "🇧🇷", value: "R$397,00" },
];

const PhoneNotifications = () => {
  const [items, setItems] = useState<{ id: number; flag: string; value: string }[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const add = () => {
      const n = notifications[counter % notifications.length];
      const id = counter;
      setItems((prev) => [{ id, ...n }, ...prev].slice(0, 6));
      setCounter((c) => c + 1);
    };

    // First after 1s, then every 2.5s
    const t = setTimeout(add, 1000);
    const iv = setInterval(add, 2500);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [counter]);

  return (
    <div className="absolute inset-2 rounded-[2rem] overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, hsl(270 50% 15%), hsl(328 40% 12%) 50%, hsl(0 0% 5%))",
    }}>
      {/* Status bar */}
      <div className="px-3 pt-8 pb-1 flex items-center justify-between">
        <span className="text-[8px] text-foreground/40 font-medium">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-1.5 rounded-sm border border-foreground/30" />
        </div>
      </div>

      {/* App header */}
      <div className="px-3 pb-2 flex items-center justify-between">
        <span className="text-[9px] font-bold text-foreground/60 tracking-wide">360 Digital</span>
        <span className="text-[8px] text-foreground/30">agora</span>
      </div>

      {/* Notifications stream */}
      <div className="flex-1 px-1.5 space-y-1.5 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="rounded-xl px-2 py-1.5 flex items-center gap-1.5"
              style={{
                background: "hsl(0 0% 100% / 0.06)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Icon */}
              <div className="w-5 h-5 rounded-md bg-gradient-pink flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-black text-primary-foreground">3</span>
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-semibold text-foreground/80 truncate">
                  Venda aprovada! | {item.flag}
                </p>
                <p className="text-[7px] text-foreground/40">
                  Valor: {item.value}
                </p>
              </div>
              <span className="text-[7px] text-foreground/25 flex-shrink-0">agora</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhoneNotifications;
