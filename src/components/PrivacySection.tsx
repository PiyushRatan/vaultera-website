import { motion } from "framer-motion";
import { CloudOff, CheckCircle, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";

const PrivacySection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="privacy" className="section-snap w-full max-w-[1280px] mx-auto px-4 md:px-10 py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
      <motion.div
        className="flex-1 order-2 md:order-1 relative"
        ref={ref}
        initial={{ opacity: 0, x: -40, rotate: -5 }}
        animate={inView ? { opacity: 1, x: 0, rotate: -2 } : {}}
        transition={{ duration: 0.7 }}
        whileHover={{ rotate: 0 }}
      >
        <div className="relative z-10 p-8 bg-card border border-border rounded-2xl shadow-2xl max-w-md mx-auto md:ml-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-12 h-12 bg-success/10 border border-success/30 rounded-full flex items-center justify-center text-success">
              <CloudOff className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Local Authentication</h4>
              <p className="text-xs text-muted-foreground">Connection Status: Secure</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              "Biometric data stored locally on device",
              "No external server dependencies",
              "Bluetooth Low Energy (BLE) encryption",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground/80">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-[3deg] scale-95 translate-y-2 z-0 border border-primary/20" />
      </motion.div>

      <motion.div
        className="flex-1 order-1 md:order-2 text-left"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <StaggerText
          text="Your Data Stays With You."
          as="h2"
          className="text-foreground text-3xl md:text-4xl font-bold mb-6"
        />
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            In a world of connected devices, privacy is our top priority. Vaultera operates on a strictly local-first architecture.
          </p>
          <p>
            Your fingerprint data and access logs never leave the physical lock. We use banking-grade encryption for local communication, ensuring that not even we can access your vault.
          </p>
          <p className="font-medium text-foreground/90">
            No cloud accounts. No recurring subscriptions. Just secure hardware.
          </p>
        </div>
        <div className="mt-8">
          <a className="text-primary font-bold hover:text-primary-glow transition-colors inline-flex items-center gap-1" href="#">
            Read our Transparency Report <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PrivacySection;
