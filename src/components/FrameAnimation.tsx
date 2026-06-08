import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 60;

export default function FrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);
  const [currentFrame, setCurrentFrame] = useState(1);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    setCurrentFrame(Math.round(latest));
  });

  // Preload images to prevent flickering
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/frame/ezgif-frame-${num}.jpg`;
    }
  }, []);

  const imageNumber = currentFrame.toString().padStart(3, '0');

  return (
    <section ref={containerRef} className="h-[200vh] bg-background relative z-10 w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <img 
            src={`/frame/ezgif-frame-${imageNumber}.jpg`}
            alt={`Frame animation`}
            className="w-full h-full object-cover"
          />
          {/* Gradients to blend smoothly with sections above and below */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Optional text overlaid on the animation */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
          >
            A Nova Visão
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg md:text-xl text-zinc-300 drop-shadow-md"
          >
            Acompanhe a transformação em cada detalhe.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
