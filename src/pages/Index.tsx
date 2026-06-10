import MouseGlow from "@/components/MouseGlow";
import EnergyBackground from "@/components/EnergyBackground";
import ConstellationBackground from "@/components/ConstellationBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FrameAnimation from "@/components/FrameAnimation";
import SocialProof from "@/components/SocialProof";
import ValueProp from "@/components/ValueProp";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TargetAudience from "@/components/TargetAudience";
import Modules from "@/components/Modules";
import Transformation from "@/components/Transformation";
import WhoIsBehind from "@/components/WhoIsBehind";
import LifestyleGallery from "@/components/LifestyleGallery";
import Bonus from "@/components/Bonus";
import Price from "@/components/Price";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";


const Index = () => (
  <main className="min-h-screen bg-background text-foreground overflow-x-clip">
    <EnergyBackground />
    <ConstellationBackground />
    <MouseGlow />
    
    {/* No mobile: Hero primeiro, FrameAnimation depois. No desktop: FrameAnimation primeiro */}
    <div className="flex flex-col md:contents">
      <div className="order-2 md:order-none">
        <FrameAnimation />
      </div>
      <div className="order-1 md:order-none">
        <Hero />
      </div>
    </div>
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
