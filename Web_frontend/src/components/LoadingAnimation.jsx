import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-beige-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-50">
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
          <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-3xl shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-gray-900 dark:text-white mb-2">Scanning your surroundings...</h2>
          <div className="flex items-center justify-center gap-1">
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
                className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
