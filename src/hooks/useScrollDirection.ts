import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0;

      setScrollY(currentScrollY);
      setScrollProgress(Math.min(progress, 1));

      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, scrollY, scrollProgress };
}
