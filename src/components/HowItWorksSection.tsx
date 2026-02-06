import { motion } from "framer-motion";
import { Wrench, Fingerprint, ShieldCheck, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";
import "@/styles/howItWorksSection.css";

const steps = [
  {
    icon: Wrench,
    title: "1. Upgrade Drawer",
    desc: "Install the Vaultera mechanism on your existing furniture using the included adhesive or screw mount. No professional tools needed.",
  },
  {
    icon: Fingerprint,
    title: "2. Choose Method",
    desc: "Connect via the Vaultera app to set up biometric fingerprint access, NFC tags, or pure smartphone unlocking.",
  },
  {
    icon: ShieldCheck,
    title: "3. Secure Items",
    desc: "Lock your drawer and enjoy peace of mind knowing your personal items are safe from prying eyes and unauthorized access.",
  },
];

const HowItWorksSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-header">
        <div className="how-it-works-title-section">
          <p className="how-it-works-label">Simple Setup</p>
          <StaggerText
            text="Effortless security in three steps."
            as="h3"
            className="text-foreground text-3xl md:text-4xl font-bold leading-tight"
          />
        </div>
        <a className="how-it-works-doc-link" href="#">
          Read full documentation <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div ref={ref} className="how-it-works-steps">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="how-it-works-card card-surface-hover"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="how-it-works-icon glow-primary">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="how-it-works-card-title">{step.title}</h4>
              <p className="how-it-works-card-desc">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
