import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import "@/styles/navbar.css";
import "@/styles/buttons.css";


const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Privacy", href: "#privacy" },
];

const SECTION_IDS = ["hero", "how-it-works", "pricing", "use-cases", "privacy"];

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="hamburger-icon">
    <motion.span
      className="hamburger-line"
      animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
    <motion.span
      className="hamburger-line"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="hamburger-line"
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
      className="navbar navbar-backdrop"
      initial={false}
      animate={{
        // prevent nav from sliding away while mobile menu is open
        y: mobileOpen ? 0 : isHidden ? -100 : 0,
        paddingTop: isScrolled ? 8 : 12,
        paddingBottom: isScrolled ? 8 : 12,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        borderBottom: isScrolled ? "1px solid hsl(0 0% 17%)" : "1px solid transparent",
      }}
    >
      <div className="navbar-wrapper">
        {/* Logo */}
        <a href="#hero" className="navbar-logo">
          <motion.div
            whileHover={{ rotate: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img className="navbar-logo-img" src="/logo.png" alt="Vaultera Logo" />
          </motion.div>
          <span className="navbar-logo-text">VaulTera</span>
        </a>

        {/* Desktop nav */}
        <div className="navbar-desktop">
          <div className="navbar-links">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar-link"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="navbar-link-bg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`navbar-link-text ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
          <motion.a
            href="#cta"
            className="btn-primary navbar-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Book Upgrade
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
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
            className="navbar-mobile open"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="navbar-mobile-content">
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
                    className={`navbar-mobile-link ${isActive ? "active" : ""}`}
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
                className="btn-primary navbar-mobile-btn"
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