import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/audio_site.mp3");
    audio.volume = 0.15;
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const timer = setTimeout(() => {
      audio.play().catch(() => {});
      setVisible(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => setMuted((m) => !m)}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-primary/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/30 transition-colors shadow-lg"
          aria-label={muted ? "Ativar som" : "Silenciar"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackgroundMusic;
