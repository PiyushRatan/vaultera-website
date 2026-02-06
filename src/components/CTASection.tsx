import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";
import "@/styles/ctaSection.css";
import "@/styles/buttons.css";

const CTASection = () => {
  const { ref, inView } = useInView();
  const [clicked, setClicked] = useState(false);

  return (
    <section id="cta" className="cta-section">
      <div ref={ref} className="cta-container">

        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <StaggerText
            text="Ready to secure your space?"
            as="h2"
            className="cta-text text-foreground text-3xl md:text-5xl font-bold mb-6"
          />
          <p className="cta-description">
            Join thousands of users upgrading their privacy today. Simple installation, lifetime security.
          </p>
          <button
            onClick={() => {
              setClicked(true);
              setTimeout(() => setClicked(false), 2000);
            }}
            className="btn-primary cta-button"
          >
            <AnimatePresence mode="wait">
              {clicked ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="cta-button-content"
                >
                  <CheckCircle className="w-5 h-5" /> Request Sent!
                </motion.span>
              ) : (
                <motion.span key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Book Your Upgrade
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <p className="cta-subtext">30-day money-back guarantee • Free shipping worldwide</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
