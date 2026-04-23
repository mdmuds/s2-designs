"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the mask opens from. */
  from?: "top" | "bottom" | "left" | "right";
}

const fromMap = {
  top: { initial: "inset(100% 0 0 0)", animate: "inset(0% 0 0 0)" },
  bottom: { initial: "inset(0 0 100% 0)", animate: "inset(0 0 0% 0)" },
  left: { initial: "inset(0 0 0 100%)", animate: "inset(0 0 0 0%)" },
  right: { initial: "inset(0 100% 0 0)", animate: "inset(0 0% 0 0)" },
} as const;

export function MaskReveal({ children, className, delay = 0, from = "top" }: MaskRevealProps) {
  const cfg = fromMap[from];
  return (
    <motion.div
      initial={{ clipPath: cfg.initial }}
      whileInView={{ clipPath: cfg.animate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration.hero, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
