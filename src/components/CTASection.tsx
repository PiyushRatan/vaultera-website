import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";

const CTASection = () => {
  const { ref, inView } = useInView();
  const [clicked, setClicked] = useState(false);

  return (
    <section id="cta" className=" w-full px-4 md:px-10 pb-12">
      <div ref={ref} className="max-w-[1280px] mx-auto rounded-3xl overflow-hidden shadow-2xl relative border border-border bg-card">

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <StaggerText
            text="Ready to secure your space?"
            as="h2"
            className="text-foreground text-3xl md:text-5xl font-bold mb-6"
          />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10">
            Join thousands of users upgrading their privacy today. Simple installation, lifetime security.
          </p>
          <button
            onClick={() => {
              setClicked(true);
              setTimeout(() => setClicked(false), 2000);
            }}
            className="btn-primary px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-1"
          >
            <AnimatePresence mode="wait">
              {clicked ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
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
          <p className="mt-6 text-muted-foreground/60 text-sm">30-day money-back guarantee • Free shipping worldwide</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
