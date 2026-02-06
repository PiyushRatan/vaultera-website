import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import videoThumb from "@/assets/video-thumb.jpg";

const VideoSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className=" w-full py-16 border-y border-border/50 bg-surface-elevated">
      <div ref={ref} className="max-w-[960px] mx-auto px-4 md:px-10 flex flex-col gap-8 text-center">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-foreground text-3xl font-bold tracking-tight">Watch Vaultera in Action</h2>
          <p className="text-muted-foreground">See how easy it is to secure your belongings in seconds.</p>
        </motion.div>

        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img
            src={videoThumb}
            alt="Hand holding smartphone unlocking drawer"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm hover:scale-110 transition-transform shadow-lg flex items-center justify-center glow-primary-strong">
              <Play className="w-10 h-10 ml-1" fill="currentColor" />
            </button>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background to-transparent">
            <div className="flex items-center gap-4 text-foreground">
              <Pause className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full" style={{ boxShadow: "0 0 10px hsl(211 100% 50% / 0.5)" }} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">0:37 / 2:23</span>
              <Volume2 className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
              <Maximize className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
