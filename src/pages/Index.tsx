import MouseGlow from "@/components/MouseGlow";
import EnergyBackground from "@/components/EnergyBackground";
import ConstellationBackground from "@/components/ConstellationBackground";
import Hero from "@/components/Hero";
import FrameAnimation from "@/components/FrameAnimation";
import SocialProof from "@/components/SocialProof";
import ValueProp from "@/components/ValueProp";
import TargetAudience from "@/components/TargetAudience";
import Modules from "@/components/Modules";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Transformation from "@/components/Transformation";
import WhoIsBehind from "@/components/WhoIsBehind";
import LifestyleGallery from "@/components/LifestyleGallery";
import Bonus from "@/components/Bonus";
import Price from "@/components/Price";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";
import Navbar from "@/components/Navbar";

const Index = () => (
  <main className="min-h-screen bg-background text-foreground overflow-x-clip">
    <EnergyBackground />
    <ConstellationBackground />
    <MouseGlow />
    
    <Hero />
    
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
  </main>
);

export default Index;
