import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EnergyBackground = () => {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const noiseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.07, 0.04]);
  const bloomScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.15, 1.05, 0.95]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const mouseOffsetX = (mousePos.x - 0.5) * 40;
  const mouseOffsetY = (mousePos.y - 0.5) * 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* === LEFT ENERGY: Deep blue/purple spatial distortion === */}
      <motion.div
        className="absolute energy-blob-left"
        style={{
          y: leftY,
          left: `calc(-10% + ${mouseOffsetX * 0.3}px)`,
          top: `calc(5% + ${mouseOffsetY * 0.4}px)`,
          width: "60vw",
          height: "90vh",
        }}
      />

      {/* === RIGHT ENERGY: Intense magenta/purple fracture === */}
      <motion.div
        className="absolute energy-blob-right"
        style={{
          y: rightY,
          right: `calc(-10% + ${-mouseOffsetX * 0.3}px)`,
          top: `calc(0% + ${mouseOffsetY * 0.3}px)`,
          width: "55vw",
          height: "90vh",
        }}
      />

      {/* === CENTRAL VORTEX: Intense purple core === */}
      <motion.div
        className="absolute bloom-core"
        style={{
          scale: bloomScale,
          left: `calc(45% + ${mouseOffsetX * 0.5}px)`,
          top: `calc(30% + ${mouseOffsetY * 0.5}px)`,
        }}
      />

      {/* === SECONDARY BLOOM === */}
      <div
        className="absolute bloom-accent"
        style={{
          left: `calc(25% + ${mouseOffsetX * 0.2}px)`,
          top: `calc(55% + ${mouseOffsetY * 0.2}px)`,
        }}
      />

      {/* === LIGHTNING STREAKS === */}
      <div className="absolute inset-0 lightning-container">
        {[...Array(5)].map((_, i) => (
          <div
            key={`lightning-${i}`}
            className="absolute lightning-bolt"
            style={{
              left: `${10 + i * 18}%`,
              top: `${5 + (i % 3) * 20}%`,
              width: `${120 + i * 40}px`,
              height: '2px',
              transform: `rotate(${-30 + i * 15}deg)`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* === FRACTURE SHARDS / DEBRIS === */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`shard-${i}`}
          className="absolute energy-shard"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* === FLOATING ORBS === */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full energy-orb"
          style={{
            width: `${2 + i * 1.5}px`,
            height: `${2 + i * 1.5}px`,
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + i * 1.5}s`,
          }}
        />
      ))}

      {/* === NOISE TEXTURE === */}
      <motion.div
        className="absolute inset-0 noise-overlay"
        style={{ opacity: noiseOpacity }}
      />

      {/* === SCAN LINES === */}
      <div className="absolute inset-0 scan-lines" />
    </div>
  );
};

export default EnergyBackground;
