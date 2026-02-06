import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import videoThumb from "@/assets/video-thumb.jpg";
import "@/styles/videoSection.css";

const VideoSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="video-section">
      <div ref={ref} className="video-wrapper">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="video-title">Watch Vaultera in Action</h2>
          <p className="video-subtitle">See how easy it is to secure your belongings in seconds.</p>
        </motion.div>

        <motion.div
          className="video-container group"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img
            src={videoThumb}
            alt="Hand holding smartphone unlocking drawer"
            className="video-thumbnail"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="video-play-button">
              <Play className="w-10 h-10 ml-1" fill="currentColor" />
            </button>
          </div>
          <div className="video-controls">
            <Pause className="video-control-button" />
            <div className="video-progress-bar">
              <div className="video-progress-fill" style={{ width: "33%" }} />
            </div>
            <span className="video-time">0:37 / 2:23</span>
            <Volume2 className="video-volume-button" />
            <Maximize className="video-fullscreen-button" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
