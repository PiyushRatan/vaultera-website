import { motion } from "framer-motion";
import { CloudOff, CheckCircle, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";
import "@/styles/privacySection.css";

const PrivacySection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="privacy" className="privacy-section">
      <motion.div
        className="privacy-image-wrapper"
        ref={ref}
        initial={{ opacity: 0, x: -40, rotate: -5 }}
        animate={inView ? { opacity: 1, x: 0, rotate: -2 } : {}}
        transition={{ duration: 0.7 }}
        whileHover={{ rotate: 0 }}
      >
        <div className="privacy-image-container">
          <div className="privacy-feature-header">
            <div className="privacy-feature-icon">
              <CloudOff className="w-6 h-6" />
            </div>
            <div>
              <h4 className="privacy-feature-title">Local Authentication</h4>
              <p className="privacy-feature-subtitle">Connection Status: Secure</p>
            </div>
          </div>
          <div className="privacy-features-list">
            {[
              "Biometric data stored locally on device",
              "No external server dependencies",
              "Bluetooth Low Energy (BLE) encryption",
            ].map((text) => (
              <div key={text} className="privacy-feature-item">
                <CheckCircle className="privacy-feature-check" />
                <span className="privacy-feature-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="privacy-image-bg" />
      </motion.div>

      <motion.div
        className="privacy-content"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <StaggerText
          text="Your Data Stays With You."
          as="h2"
          className="text-foreground text-3xl md:text-4xl font-bold mb-6"
        />
        <div className="privacy-content-text">
          <p>
            In a world of connected devices, privacy is our top priority. Vaultera operates on a strictly local-first architecture.
          </p>
          <p>
            Your fingerprint data and access logs never leave the physical lock. We use banking-grade encryption for local communication, ensuring that not even we can access your vault.
          </p>
          <p className="privacy-content-highlight">
            No cloud accounts. No recurring subscriptions. Just secure hardware.
          </p>
        </div>
        <div className="privacy-content-link">
          <a className="privacy-content-link-btn" href="#">
            Read our Transparency Report <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PrivacySection;
