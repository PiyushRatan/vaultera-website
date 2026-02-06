import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";

const plans = [
  {
    name: "Bronze",
    nameColor: "text-muted-foreground",
    price: 5499,
    originalPrice: 4469,
    unit: "/unit",
    desc: "Essential security for any standard drawer.",
    features: [
      { text: "Biometric Fingerprint Unlock", included: true },
      { text: "NFC/RF Keyfob Access", included: true },
      { text: "Smartphone App Access", included: false },
    ],
    popular: false,
  },
  {
    name: "Silver",
    nameColor: "text-primary",
    price: 7699,
    originalPrice: 6569,
    unit: "/unit",
    desc: "Smart connectivity for seamless daily use.",
    features: [
      { text: "All Bronze Features", included: true },
      { text: "Smartphone App Unlocking", included: true },
      { text: "Premium NFC Access Card", included: true },
      { text: "Access History Logs", included: true },
    ],
    popular: true,
  },
  {
    name: "Gold",
    nameColor: "text-amber-500",
    price: 11299,
    originalPrice: 10999,
    unit: "/unit",
    desc: "Ultimate protection with pro-grade encryption.",
    features: [
      { text: "All Silver Features", included: true },
      { text: "Two-Factor Auth (2FA)", included: true },
      { text: "Priority Local-First Support", included: true },
      { text: "Hardened Device Encryption", included: true },
    ],
    popular: false,
  },
];

const PricingCard = ({ plan, index, inView }: { plan: typeof plans[0]; index: number; inView: boolean }) => {
  const [selected, setSelected] = useState(false);

  return (
    <motion.div
      className={`flex flex-col p-8 rounded-3xl border transition-all duration-300 relative ${
        plan.popular
          ? "bg-card border-2 border-primary glow-primary-strong scale-100 md:scale-105 z-10"
          : "bg-card border-border hover:border-muted-foreground/30"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h4 className={`font-semibold mb-1 ${plan.nameColor}`}>{plan.name}</h4>
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            {inView && (
              <motion.div className="flex items-baseline gap-2" key="price">
                <span className="relative text-lg text-muted-foreground line-through decoration-destructive/60">
                  ₹{plan.originalPrice}
                  <motion.span
                    className="absolute left-0 top-1/2 h-[2px] bg-destructive/60"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                  />
                </span>
                <motion.span
                  className="text-4xl font-bold text-foreground"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  ₹{plan.price}
                </motion.span>
                <span className="text-muted-foreground text-sm">{plan.unit}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-muted-foreground text-sm mt-3">{plan.desc}</p>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {plan.features.map((f) => (
          <div key={f.text} className={`flex items-start gap-3 ${!f.included ? "opacity-30" : ""}`}>
            {f.included ? (
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${f.included ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setSelected(true);
          setTimeout(() => setSelected(false), 1200);
        }}
        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
          plan.popular
            ? "btn-primary"
            : "btn-outline-primary"
        } ${selected ? "animate-check-morph" : ""}`}
      >
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.span
              key="confirmed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> Added
            </motion.span>
          ) : (
            <motion.span
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Select Plan
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

const PricingSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className=" w-full py-24 border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Plans & Pricing</p>
          <StaggerText
            text="Choose Your Security Level"
            as="h3"
            className="text-foreground text-3xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible protection tailored to your needs. Upgrade your privacy with the hardware and features that fit your lifestyle.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
