"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitHeadlineProps {
  text: string;
  className?: string;
  /** Stagger between words in seconds. */
  stagger?: number;
  /** Per-word duration in seconds. */
  wordDuration?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

export function SplitHeadline({
  text,
  className,
  stagger = 0.06,
  wordDuration = 0.7,
  delay = 0,
  as: Tag = "h1",
}: SplitHeadlineProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: wordDuration,
              ease: ease.out,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
