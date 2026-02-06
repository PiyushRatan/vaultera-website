import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import "@/styles/staggerText.css";

interface StaggerTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  highlightWords?: string[];
  delay?: number;
}

const StaggerText = ({ text, as: Tag = "h2", className = "", highlightWords = [], delay = 0 }: StaggerTextProps) => {
  const { ref, inView } = useInView();
  const words = text.split(" ");

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={`stagger-text-word ${highlightWords.includes(word) ? "text-gradient" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
};

export default StaggerText;
