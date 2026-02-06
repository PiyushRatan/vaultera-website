import { motion } from "framer-motion";
import { GraduationCap, Store, Home, EyeOff } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StaggerText from "./StaggerText";

const cases = [
  { icon: GraduationCap, title: "Students", desc: "Secure valuables in shared dorm rooms and apartments without carrying extra keys." },
  { icon: Store, title: "Retailers", desc: "Protect cash drawers and sensitive inventory with trackable access logs." },
  { icon: Home, title: "Home Safety", desc: "Keep medications and important documents safe from children and guests." },
  { icon: EyeOff, title: "Privacy Focus", desc: "Secure journals, hard drives, and personal data with zero cloud exposure." },
];

const UseCasesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="use-cases" className=" w-full py-20 border-y border-border/50 bg-surface-elevated">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <StaggerText
            text="Designed for every space."
            as="h2"
            className="text-foreground text-3xl md:text-4xl font-bold mb-4"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're protecting inventory or privacy, Vaultera adapts to your environment.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <c.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
