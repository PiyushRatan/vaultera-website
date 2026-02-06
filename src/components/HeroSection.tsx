import { motion } from "framer-motion";
import { ArrowRight, Play, LockOpen } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import heroImg from "@/assets/hero-drawer.jpg";

const HeroSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="hero" className=" min-h-screen flex items-center pt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 w-full py-12 md:py-20">
        <div ref={ref} className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em] text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Turn Any Drawer{" "}
              <br className="hidden md:block" />
              Into a <span className="text-gradient">Smart Vault.</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Secure your personal space with phone, fingerprint, or NFC access. No keys, no hassle.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#cta" className="btn-primary h-12 px-6 flex items-center gap-2 text-base">
                Book Your Upgrade
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="btn-ghost h-12 px-6 flex items-center gap-2 text-base">
                <Play className="w-5 h-5" />
                See Demo
              </button>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 w-full relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl relative group border border-border">
              <img
                src={heroImg}
                alt="Smart drawer with blue glowing lock indicator"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-success rounded-full animate-ping-slow opacity-20" />
                  <div className="bg-success/20 rounded-full p-1.5 relative">
                    <LockOpen className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Unlocked</p>
                  <p className="text-[10px] text-muted-foreground">via iPhone 14 Pro</p>
                </div>
              </div>
            </div>
            {/* removed glow blob */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
