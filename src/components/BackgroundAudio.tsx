import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const startAudio = () => {
      if (hasInteracted.current) return;
      
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
            ['click', 'scroll', 'touchstart', 'keydown'].forEach(event => {
              document.removeEventListener(event, startAudio);
            });
          }).catch(error => {
            console.log("Autoplay prevented", error);
          });
        }
      }
    };

    // Attempt auto-play immediately (some browsers allow it)
    startAudio();

    // Listen for any user interaction to unlock audio
    ['click', 'scroll', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, startAudio, { passive: true });
    });

    return () => {
      ['click', 'scroll', 'touchstart', 'keydown'].forEach(event => {
        document.removeEventListener(event, startAudio);
      });
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src="/audiosite.mp3" loop preload="none" />
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleAudio}
        className="rounded-full bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary/20 hover:text-primary transition-all duration-300"
        aria-label="Toggle background audio"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
    </div>
  );
}
