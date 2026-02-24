import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animateIn?: boolean;
}

const SpotlightCard = ({ children, className = "", delay = 0, animateIn = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={animateIn ? { opacity: 0, y: 40 } : false}
      whileInView={animateIn ? { opacity: 1, y: 0 } : undefined}
      viewport={animateIn ? { margin: "-60px" } : undefined}
      transition={animateIn ? { type: "spring", stiffness: 50, damping: 20, mass: 1, delay } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`premium-card border-gradient relative group ${className}`}
    >
      {/* Spotlight follow */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--pink-hot) / 0.07), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
