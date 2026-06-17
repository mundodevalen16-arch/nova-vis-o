import { useEffect, useRef } from "react";

interface Vector2D {
  x: number;
  y: number;
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;

  startColor = { r: 0, g: 0, b: 0 };
  targetColor = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(
      (this.pos.x - this.target.x) ** 2 + (this.pos.y - this.target.y) ** 2
    );
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const toTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };
    const mag = Math.sqrt(toTarget.x ** 2 + toTarget.y ** 2);
    if (mag > 0) {
      toTarget.x = (toTarget.x / mag) * this.maxSpeed * proximityMult;
      toTarget.y = (toTarget.y / mag) * this.maxSpeed * proximityMult;
    }

    const steer = { x: toTarget.x - this.vel.x, y: toTarget.y - this.vel.y };
    const sm = Math.sqrt(steer.x ** 2 + steer.y ** 2);
    if (sm > 0) {
      steer.x = (steer.x / sm) * this.maxForce;
      steer.y = (steer.y / sm) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight);
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight);
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2;
      const dist = (width + height) / 2;
      this.target.x = width / 2 + Math.cos(angle) * dist;
      this.target.y = height / 2 + Math.sin(angle) * dist;
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 0, g: 0, b: 0 };
      this.colorWeight = 0;
      this.isKilled = true;
    }
  }
}

// Paleta rosa/roxo do site
const COLORS = [
  { r: 240, g: 10, b: 120 },   // Rosa
  { r: 168, g: 85, b: 247 },   // Roxo
  { r: 220, g: 38, b: 150 },   // Magenta
  { r: 192, g: 100, b: 255 },  // Lilás
  { r: 255, g: 60, b: 180 },   // Rosa brilhante
];

interface Props {
  words: string[];
  /** ms entre cada palavra (padrão 3000) */
  wordInterval?: number;
  onComplete?: () => void;
}

export default function ParticleSplash({ words, wordInterval = 3000, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>();
  const wordIdx = useRef(0);
  const frameCount = useRef(0);
  const colorIdx = useRef(0);
  const completeCalled = useRef(false);

  // Frames entre cada troca de palavra (60fps)
  const framesPerWord = Math.round((wordInterval / 1000) * 60);

  const spawnWord = (word: string, w: number, h: number) => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d")!;

    // Fonte adaptativa: menor no mobile
    const isMobile = w < 800;
    const fontSize = isMobile ? Math.min(w * 0.1, 52) : Math.min(w * 0.08, 100);
    ctx.fillStyle = "white";
    ctx.font = `900 ${fontSize}px 'Impact', 'Arial Black', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(word, w / 2, h / 2);

    const data = ctx.getImageData(0, 0, w, h).data;
    const color = COLORS[colorIdx.current % COLORS.length];
    colorIdx.current++;

    const ps = particles.current;
    let pi = 0;
    const step = isMobile ? 8 : 6;

    const coords: number[] = [];
    for (let i = 0; i < data.length; i += step * 4) coords.push(i);
    // Shuffle
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coords[i], coords[j]] = [coords[j], coords[i]];
    }

    for (const ci of coords) {
      if (data[ci + 3] > 0) {
        const x = (ci / 4) % w;
        const y = Math.floor(ci / 4 / w);
        let p: Particle;
        if (pi < ps.length) {
          p = ps[pi];
          p.isKilled = false;
          pi++;
        } else {
          p = new Particle();
          const angle = Math.random() * Math.PI * 2;
          const dist = (w + h) / 2;
          p.pos.x = w / 2 + Math.cos(angle) * dist;
          p.pos.y = h / 2 + Math.sin(angle) * dist;
          p.maxSpeed = Math.random() * 6 + 4;
          p.maxForce = p.maxSpeed * 0.05;
          p.particleSize = Math.random() * 6 + 6;
          p.colorBlendRate = Math.random() * 0.025 + 0.005;
          ps.push(p);
        }
        p.startColor = {
          r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
          g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
          b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
        };
        p.targetColor = color;
        p.colorWeight = 0;
        p.target.x = x;
        p.target.y = y;
      }
    }

    for (let i = pi; i < ps.length; i++) ps[i].kill(w, h);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn primeira palavra
    spawnWord(words[0], canvas.width, canvas.height);

    const loop = () => {
      const ctx = canvas.getContext("2d")!;
      const ps = particles.current;

      // Fundo preto com motion blur sutil
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = ps.length - 1; i >= 0; i--) {
        ps[i].move();
        ps[i].draw(ctx);
        if (ps[i].isKilled) {
          const { x, y } = ps[i].pos;
          if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) {
            ps.splice(i, 1);
          }
        }
      }

      frameCount.current++;
      if (frameCount.current % framesPerWord === 0) {
        wordIdx.current++;
        if (wordIdx.current < words.length) {
          spawnWord(words[wordIdx.current], canvas.width, canvas.height);
        } else if (wordIdx.current === words.length) {
          // Kill all — dissolve final
          for (const p of ps) p.kill(canvas.width, canvas.height);
        } else if (!completeCalled.current && ps.length < 20) {
          // Quando quase todas se dissolveram, avisar
          completeCalled.current = true;
          onComplete?.();
        }
      }

      // Safety: se já passou todas as palavras + 2s e não chamou onComplete
      if (
        wordIdx.current > words.length &&
        frameCount.current > (words.length + 1) * framesPerWord + 120 &&
        !completeCalled.current
      ) {
        completeCalled.current = true;
        onComplete?.();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: 99999,
        display: "block",
      }}
    />
  );
}
