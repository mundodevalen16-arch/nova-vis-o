import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const MouseGlow = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useSpring(0, { stiffness: 60, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);

    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mq.removeEventListener("change", handler);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: "transparent",
      }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(328 100% 48% / 0.08) 0%, hsl(270 80% 55% / 0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
};

export default MouseGlow;
