import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

// Frase dividida conforme marcações:
//  Linha 1: "Não existe"
//  Linha 2: "vitória"
//  Linha 3: "sem sacrifício"
// No canvas aparecem como palavras sequenciais com partículas
const SPLASH_WORDS = [
  "Não existe",
  "vitória",
  "sem sacrifício",
];

// Quantas palavras existem (para calcular quando a sequência termina)
const TOTAL_WORDS = SPLASH_WORDS.length;
// Cada palavra fica ~3s (180 frames). Saímos logo após a última aparecer (+ 2.5s para contemplar)
const SPLASH_DURATION_MS = TOTAL_WORDS * 3000 + 2500;

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Garante que o site carrega em background. Após SPLASH_DURATION_MS inicia a saída.
    const timer = setTimeout(() => {
      setVisible(false);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(270 30% 4%)" }}
        >
          {/* Glow de fundo — roxo/rosa ambiance */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(328 100% 48% / 0.12) 0%, transparent 70%)",
            }}
          />

          {/* Canvas de partículas ocupa toda a área central */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center">
            <div className="w-full" style={{ height: "55vmin", maxHeight: 400 }}>
              <ParticleTextEffect
                words={SPLASH_WORDS}
                onWordCycle={(idx) => setWordIndex(idx)}
              />
            </div>

            {/* Indicador de qual frase está sendo exibida — bolinhas de progresso */}
            <div className="flex items-center gap-3 mt-6">
              {SPLASH_WORDS.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    width: wordIndex === i ? 28 : 8,
                    opacity: wordIndex === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    height: 8,
                    borderRadius: 9999,
                    background:
                      "linear-gradient(90deg, hsl(328 100% 55%), hsl(270 80% 65%))",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Logo e tagline na parte inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pb-10 text-center select-none"
          >
            <p
              className="text-lg font-black tracking-wider italic"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                background:
                  "linear-gradient(135deg, hsl(328 100% 60%), hsl(270 80% 70%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              iBielZz
            </p>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mt-1 font-light">
              360 Digital
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
