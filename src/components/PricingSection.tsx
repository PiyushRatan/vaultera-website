import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";
import "@/styles/pricingSection.css";

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
      className={`pricing-card ${plan.popular ? "popular" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {plan.popular && (
        <div className="pricing-badge">
          Most Popular
        </div>
      )}

      <div className="pricing-header-info">
        <h4 className={`pricing-plan-name ${plan.nameColor}`}>{plan.name}</h4>
        <div className="pricing-price-container">
          <AnimatePresence mode="wait">
            {inView && (
              <motion.div className="flex items-baseline gap-2" key="price">
                <span className="pricing-original-price">
                  ₹{plan.originalPrice}
                  <motion.span
                    className="pricing-original-price-line"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                  />
                </span>
                <motion.span
                  className="pricing-price"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  ₹{plan.price}
                </motion.span>
                <span className="pricing-unit">{plan.unit}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="pricing-card-description">{plan.desc}</p>
      </div>

      <div className="pricing-features">
        {plan.features.map((f) => (
          <div key={f.text} className={`pricing-feature ${!f.included ? "disabled" : ""}`}>
            {f.included ? (
              <CheckCircle className="pricing-feature-icon" />
            ) : (
              <XCircle className="pricing-feature-icon" />
            )}
            <span className="pricing-feature-text">
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
        className={`pricing-button ${plan.popular ? "primary" : "outline"} ${selected ? "selected" : ""}`}
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
    <section id="pricing" className="pricing-section">
      <div className="pricing-wrapper">
        <div className="pricing-header">
          <p className="pricing-label">Plans & Pricing</p>
          <StaggerText
            text="Choose Your Security Level"
            as="h3"
            className="pricing-title"
          />
          <p className="pricing-description">
            Flexible protection tailored to your needs. Upgrade your privacy with the hardware and features that fit your lifestyle.
          </p>
        </div>

        <div ref={ref} className="pricing-cards">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
