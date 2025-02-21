"use client";

import { motion, AnimatePresence } from "motion/react";

interface CopySuccessProps {
  show: boolean;
  onAnimationComplete: () => void;
}

export function CopySuccess({ show, onAnimationComplete }: CopySuccessProps) {
  return (
    <AnimatePresence data-oid="raznsge">
      {show && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -100 }}
          onAnimationComplete={onAnimationComplete}
          transition={{
            duration: 0.8,
            ease: [0.12, 0, 0.39, 0],
          }}
          className="absolute right-4 text-sm font-medium bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent pointer-events-none select-none"
          data-oid="brefu3j"
        >
          ✨ 复制成功 ✨
        </motion.div>
      )}
    </AnimatePresence>
  );
}
