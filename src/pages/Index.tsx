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
import "@/styles/pages.css";

const Index = () => {
  return (
    <div className="page-container">
      <ScrollProgress />
      <Navbar />
      <main className="page-main">
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
