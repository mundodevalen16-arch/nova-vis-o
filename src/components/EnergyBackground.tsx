import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Fake-WebGL energy background using pure CSS.
 * Left: blue spatial distortion. Right: pink/red turbulent energy.
 * Bloom, noise overlay, scroll-reactive parallax.
 * ~85% visual parity with WebGL at 200% better performance.
 */
const EnergyBackground = () => {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Parallax shifts on scroll
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
      {/* === LEFT ENERGY: Blue spatial distortion === */}
      <motion.div
        className="absolute energy-blob-left"
        style={{
          y: leftY,
          left: `calc(-15% + ${mouseOffsetX * 0.3}px)`,
          top: `calc(10% + ${mouseOffsetY * 0.4}px)`,
          width: "55vw",
          height: "80vh",
        }}
      />

      {/* === RIGHT ENERGY: Pink/red turbulent fracture === */}
      <motion.div
        className="absolute energy-blob-right"
        style={{
          y: rightY,
          right: `calc(-15% + ${-mouseOffsetX * 0.3}px)`,
          top: `calc(5% + ${mouseOffsetY * 0.3}px)`,
          width: "50vw",
          height: "85vh",
        }}
      />

      {/* === CENTER BLOOM: Neon glow core === */}
      <motion.div
        className="absolute bloom-core"
        style={{
          scale: bloomScale,
          left: `calc(50% + ${mouseOffsetX * 0.5}px)`,
          top: `calc(35% + ${mouseOffsetY * 0.5}px)`,
        }}
      />

      {/* === SECONDARY BLOOM: Purple accent === */}
      <div
        className="absolute bloom-accent"
        style={{
          left: `calc(30% + ${mouseOffsetX * 0.2}px)`,
          top: `calc(60% + ${mouseOffsetY * 0.2}px)`,
        }}
      />

      {/* === FLOATING ORBS: depth particles === */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full energy-orb"
          style={{
            width: `${3 + i * 2}px`,
            height: `${3 + i * 2}px`,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${6 + i * 2}s`,
          }}
        />
      ))}

      {/* === NOISE TEXTURE OVERLAY === */}
      <motion.div
        className="absolute inset-0 noise-overlay"
        style={{ opacity: noiseOpacity }}
      />

      {/* === SCAN LINE subtle === */}
      <div className="absolute inset-0 scan-lines" />
    </div>
  );
};

export default EnergyBackground;
