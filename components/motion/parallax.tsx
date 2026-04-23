"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Max translate in px (negative = up). Default 40. */
  distance?: number;
}

export function Parallax({ children, className, distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Direct mapping — no spring — so we don't keep a rAF loop alive after the
  // wheel settles. Browsers already deliver scroll events at frame rate.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);

  // Render a plain wrapper on the server / before hydration so the initial DOM
  // matches between server and client. Parallax kicks in after mount.
  if (!mounted) {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <div className="h-full w-full">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
