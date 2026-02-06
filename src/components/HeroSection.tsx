import { motion } from "framer-motion";
import { ArrowRight, Play, LockOpen } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import heroImg from "@/assets/hero-drawer.jpg";
import "@/styles/heroSection.css";
import "@/styles/buttons.css";

const HeroSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div ref={ref} className="hero-content">
          <div className="hero-text">
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Turn Your Drawer{" "}
              <br className="hidden md:block" />
              Into a <span className="text-gradient">Smart Vault.</span>
            </motion.h1>
            <motion.p
              className="hero-subheading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Secure your personal space with phone, fingerprint, or NFC access. No keys, no hassle.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#cta" className="btn-primary">
                Book Your Upgrade
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="btn-ghost">
                <Play className="w-5 h-5" />
                See Demo
              </button>
            </motion.div>
          </div>

          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-image-container group">
              <img
                src={heroImg}
                alt="Smart drawer with blue glowing lock indicator"
                className="hero-image"
              />
              <div className="hero-image-gradient" />
              <div className="hero-image-badge">
                <div className="hero-badge-icon-wrapper">
                  <div className="hero-badge-icon-glow" />
                  <div className="hero-badge-icon">
                    <LockOpen className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div>
                  <p>Unlocked</p>
                  <p>via iPhone 14 Pro</p>
                </div>
              </div>
            </div>
            {/* removed glow blob */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
