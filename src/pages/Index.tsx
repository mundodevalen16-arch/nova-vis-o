import { lazy, Suspense } from "react";

// ─── Critical path: carregados imediatamente ────────────────────────────────
import MouseGlow from "@/components/MouseGlow";
import EnergyBackground from "@/components/EnergyBackground";
import ConstellationBackground from "@/components/ConstellationBackground";
import Hero from "@/components/Hero";

// ─── Below the fold: lazy-loaded após o Hero ser pintado ────────────────────
const FrameAnimation   = lazy(() => import("@/components/FrameAnimation"));
const SocialProof      = lazy(() => import("@/components/SocialProof"));
const ValueProp        = lazy(() => import("@/components/ValueProp"));
const TargetAudience   = lazy(() => import("@/components/TargetAudience"));
const Modules          = lazy(() => import("@/components/Modules"));
const BeforeAfterSlider= lazy(() => import("@/components/BeforeAfterSlider"));
const Transformation   = lazy(() => import("@/components/Transformation"));
const WhoIsBehind      = lazy(() => import("@/components/WhoIsBehind"));
const LifestyleGallery = lazy(() => import("@/components/LifestyleGallery"));
const Bonus            = lazy(() => import("@/components/Bonus"));
const Price            = lazy(() => import("@/components/Price"));
const FAQ              = lazy(() => import("@/components/FAQ"));
const Footer           = lazy(() => import("@/components/Footer"));
const BackgroundAudio  = lazy(() => import("@/components/BackgroundAudio"));
const Navbar           = lazy(() => import("@/components/Navbar"));

const Index = () => (
  <main className="min-h-screen bg-background text-foreground overflow-x-clip">
    {/* Backgrounds fixos — carregam imediatamente */}
    <EnergyBackground />
    <ConstellationBackground />
    <MouseGlow />

    {/* Hero carrega imediatamente — first paint instantâneo */}
    <Hero />

    {/* Tudo abaixo é lazy-loaded sem bloquear o Hero */}
    <Suspense fallback={null}>
      <Navbar />
      <FrameAnimation />
      <SocialProof />
      <ValueProp />
      <TargetAudience />
      <Modules />
      <BeforeAfterSlider />
      <Transformation />
      <WhoIsBehind />
      <LifestyleGallery />
      <Bonus />
      <Price />
      <FAQ />
      <Footer />
      <BackgroundAudio />
    </Suspense>
  </main>
);

export default Index;
