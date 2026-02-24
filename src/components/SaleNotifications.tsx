import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const names = [
  "Lucas S.", "Maria F.", "João P.", "Ana C.", "Pedro H.",
  "Camila R.", "Rafael M.", "Juliana L.", "Bruno A.", "Fernanda T.",
  "Gabriel O.", "Larissa B.", "Thiago N.", "Beatriz K.", "Diego V.",
  "Isabela G.", "Matheus D.", "Carolina E.", "Felipe W.", "Amanda Z.",
];

const cities = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador",
  "Fortaleza", "Brasília", "Recife", "Porto Alegre", "Manaus",
  "Goiânia", "Florianópolis", "Campinas", "Vitória", "Natal",
];

const timeAgo = () => {
  const mins = Math.floor(Math.random() * 15) + 1;
  return `há ${mins} min`;
};

interface Notification {
  id: number;
  name: string;
  city: string;
  time: string;
}

const SaleNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [counter, setCounter] = useState(0);

  const addNotification = useCallback(() => {
    const notif: Notification = {
      id: counter,
      name: names[Math.floor(Math.random() * names.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      time: timeAgo(),
    };
    setCounter((c) => c + 1);
    setNotifications((prev) => [notif, ...prev].slice(0, 3));

    // Remove after 3.5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    }, 3500);
  }, [counter]);

  useEffect(() => {
    // First one after 2s
    const first = setTimeout(addNotification, 2000);
    // Then every 4-7s
    const interval = setInterval(() => {
      addNotification();
    }, 4000 + Math.random() * 3000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [addNotification]);

  return (
    <div className="fixed top-16 left-4 right-4 md:left-auto md:right-6 md:w-72 z-40 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: -40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-strong rounded-xl px-3 py-2.5 flex items-center gap-3 pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-pink flex items-center justify-center flex-shrink-0">
              <span className="text-xs">🔥</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-foreground truncate">
                {notif.name} <span className="text-foreground/40 font-normal">comprou</span>
              </p>
              <p className="text-[10px] text-foreground/50">
                {notif.city} · {notif.time}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SaleNotifications;
