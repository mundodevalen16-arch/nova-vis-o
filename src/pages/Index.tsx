import { lazy, Suspense } from "react";

// ─── Critical path: carregados imediatamente ────────────────────────────────
import Hero from "@/components/Hero";

// ─── Below the fold / Backgrounds: lazy-loaded após o Hero ser pintado ────
const EnergyBackground = lazy(() => import("@/components/EnergyBackground"));
const ConstellationBackground = lazy(() => import("@/components/ConstellationBackground"));
const MouseGlow        = lazy(() => import("@/components/MouseGlow"));
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
    {/* Hero carrega imediatamente — first paint instantâneo absoluto */}
    <Hero />

    {/* Fundos e restante da página lazy-loaded sem bloquear a renderização inicial */}
    <Suspense fallback={null}>
      <EnergyBackground />
      <ConstellationBackground />
      <MouseGlow />
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
