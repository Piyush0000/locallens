import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center gradient-mesh bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-50">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-4"
        >
          <div className="btn-primary p-8 rounded-3xl shadow-2xl glow-primary">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gradient-primary mb-4">Scanning your surroundings...</h2>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 btn-primary rounded-full shadow-lg"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}