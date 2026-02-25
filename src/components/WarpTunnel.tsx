import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINES = 24;

const WarpTunnel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const tunnelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.8, 3]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0.6, 0.6, 0]);

  return (
    <div ref={ref} className="relative h-[60vh] overflow-hidden z-10">
      {/* Central vanishing point glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: tunnelOpacity }}
      >
        <motion.div
          className="rounded-full"
          style={{
            scale: tunnelScale,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, hsl(328 100% 48% / 0.4) 0%, hsl(270 80% 55% / 0.15) 40%, transparent 70%)",
            boxShadow:
              "0 0 80px 30px hsl(328 100% 48% / 0.2), 0 0 160px 60px hsl(270 80% 55% / 0.1)",
          }}
        />
      </motion.div>

      {/* Speed lines radiating from center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: tunnelOpacity }}
      >
        {Array.from({ length: LINES }).map((_, i) => {
          const angle = (360 / LINES) * i;
          const len = 40 + (i % 3) * 20;
          const delay = i * 0.04;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: len,
                background: `linear-gradient(to bottom, ${
                  i % 2 === 0
                    ? "hsl(328 100% 48% / 0.7)"
                    : "hsl(270 80% 55% / 0.6)"
                }, transparent)`,
                transformOrigin: "center 300px",
                rotate: `${angle}deg`,
                boxShadow: `0 0 6px ${
                  i % 2 === 0
                    ? "hsl(328 100% 48% / 0.3)"
                    : "hsl(270 80% 55% / 0.2)"
                }`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{
                delay,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            />
          );
        })}
      </motion.div>

      {/* Concentric rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: ring * 160,
            height: ring * 160,
            borderColor: `hsl(328 100% 48% / ${0.15 / ring})`,
            opacity: ringOpacity,
            scale: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.5, 0.8 + ring * 0.3, 1.5 + ring * 0.5]
            ),
          }}
        />
      ))}
    </div>
  );
};

export default WarpTunnel;
