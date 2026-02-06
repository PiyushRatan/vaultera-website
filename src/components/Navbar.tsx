import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";


const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Privacy", href: "#privacy" },
];

const SECTION_IDS = ["hero", "how-it-works", "pricing", "use-cases", "privacy"];

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="relative w-6 h-5 flex flex-col justify-center items-center">
    <motion.span
      className="absolute h-[2px] w-6 bg-foreground rounded-full"
      animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
    <motion.span
      className="absolute h-[2px] w-6 bg-foreground rounded-full"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute h-[2px] w-6 bg-foreground rounded-full"
      animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  </div>
);

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto" as const,
    transition: { duration: 0.35, ease, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
  exit: { opacity: 0, x: -16 },
};

const Navbar = () => {
  const { scrollDirection, scrollY } = useScrollDirection();
  const activeSection = useActiveSection(useMemo(() => SECTION_IDS, []));
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isScrolled = scrollY > 50;
  // keep nav from hiding while mobile menu is open
  const isHidden = scrollDirection === "down" && scrollY > 200 && !mobileOpen;

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // helper: scroll to selector smoothly and close mobile menu only when the target is visible
  const scrollToAndClose = (href: string) => {
    // disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const id = href.replace("#", "");
    const target = document.getElementById(id) || document.querySelector(href);

    if (!target) {
      // fallback: no target found, just close menu
      setMobileOpen(false);
      return;
    }

    // Create an observer that will close the menu when the target is sufficiently visible
    const onIntersect: IntersectionObserverCallback = (entries, obs) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        obs.disconnect();
        observerRef.current = null;
        // give a tiny delay to ensure visual settling, then close
        setTimeout(() => setMobileOpen(false), 50);
      }
    };

    // threshold 0.6 works well for "in view" detection; tweak if necessary
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.6 });
    observerRef.current = obs;
    obs.observe(target as Element);

    // Start smooth scroll
    try {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      // If for some reason scrollIntoView fails, close the menu after a small delay
      setTimeout(() => setMobileOpen(false), 200);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        // prevent nav from sliding away while mobile menu is open
        y: mobileOpen ? 0 : isHidden ? -100 : 0,
        paddingTop: isScrolled ? 8 : 12,
        paddingBottom: isScrolled ? 8 : 12,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        backgroundColor: "hsl(0 0% 7% / 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: isScrolled ? "1px solid hsl(0 0% 17%)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img className="w-12 h-12 text-primary" src="/logo.png" alt="Vaultera Logo" />
          </motion.div>
          <span className="text-foreground text-lg font-bold tracking-tight">VaulTera</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-secondary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
          <motion.a
            href="#cta"
            className="btn-primary px-5 py-2 text-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Book Upgrade
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden border-t border-border mt-2 z-50 relative"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-5 flex flex-col gap-1 bg-background pointer-events-auto">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                // include activeSection in key so the link re-renders when activeSection changes
                return (
                  <motion.a
                    key={`${link.href}-${activeSection}`}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToAndClose(link.href);
                    }}
                    variants={mobileLinkVariants}
                    className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAndClose("#cta");
                }}
                variants={mobileLinkVariants}
                className="btn-primary px-5 py-3.5 text-sm text-center mt-3 rounded-xl"
              >
                Book Upgrade
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;