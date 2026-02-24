import MouseGlow from "@/components/MouseGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TargetAudience from "@/components/TargetAudience";
import Modules from "@/components/Modules";
import Transformation from "@/components/Transformation";
import WhoIsBehind from "@/components/WhoIsBehind";
import Bonus from "@/components/Bonus";
import Price from "@/components/Price";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => (
  <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <MouseGlow />
    <Navbar />
    <Hero />
    <SocialProof />
    <BeforeAfterSlider />
    <TargetAudience />
    <Modules />
    <Transformation />
    <WhoIsBehind />
    <Bonus />
    <Price />
    <FAQ />
    <Footer />
  </main>
);

export default Index;
