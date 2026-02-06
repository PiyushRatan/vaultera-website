import { motion } from "framer-motion";
import { Wrench, Fingerprint, ShieldCheck, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";

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
    <section id="how-it-works" className=" w-full max-w-[1280px] mx-auto px-4 md:px-10 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Simple Setup</p>
          <StaggerText
            text="Effortless security in three steps."
            as="h3"
            className="text-foreground text-3xl md:text-4xl font-bold leading-tight"
          />
        </div>
        <a className="hidden md:flex items-center gap-1 text-primary font-semibold hover:text-primary-glow transition-colors" href="#">
          Read full documentation <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="card-surface-hover flex flex-col gap-4 p-6 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center text-primary mb-2 glow-primary">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-foreground text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
