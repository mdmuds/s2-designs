"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 12,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const Cmp = motion[as];
  return (
    <Cmp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: duration.standard, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </Cmp>
  );
}
