import { useScrollDirection } from "@/hooks/useScrollDirection";

const ScrollProgress = () => {
  const { scrollProgress } = useScrollDirection();

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scrollProgress})` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
