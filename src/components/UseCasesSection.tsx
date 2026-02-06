import { motion } from "framer-motion";
import { GraduationCap, Store, Home, EyeOff } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";
import "@/styles/useCasesSection.css";

const cases = [
  { icon: GraduationCap, title: "Students", desc: "Secure valuables in shared dorm rooms and apartments without carrying extra keys." },
  { icon: Store, title: "Retailers", desc: "Protect cash drawers and sensitive inventory with trackable access logs." },
  { icon: Home, title: "Home Safety", desc: "Keep medications and important documents safe from children and guests." },
  { icon: EyeOff, title: "Privacy Focus", desc: "Secure journals, hard drives, and personal data with zero cloud exposure." },
];

const UseCasesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="use-cases" className="use-cases-section">
      <div className="use-cases-wrapper">
        <div className="use-cases-header">
          <StaggerText
            text="Designed for every space."
            as="h2"
            className="use-cases-title"
          />
          <p className="use-cases-description">
            Whether you're protecting inventory or privacy, Vaultera adapts to your environment.
          </p>
        </div>

        <div ref={ref} className="use-cases-grid">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="use-cases-card group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <c.icon className="use-cases-card-icon" />
              <h3 className="use-cases-card-title">{c.title}</h3>
              <p className="use-cases-card-description">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
