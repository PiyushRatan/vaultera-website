import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import UseCasesSection from "@/components/UseCasesSection";
import PrivacySection from "@/components/PrivacySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 flex flex-col items-center bg-background">
        <HeroSection />
        <VideoSection />
        <HowItWorksSection />
        <PricingSection />
        <UseCasesSection />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
