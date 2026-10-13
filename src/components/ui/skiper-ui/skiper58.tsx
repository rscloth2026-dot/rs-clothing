"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.025;

export interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
}

/**
 * Skiper-UI 58: Text Roll Navigation / Typography
 * Source: https://skiper-ui.com/registry/skiper58.json
 * Staggered letter-by-letter rolling animation on hover / active state.
 */
export const TextRoll: React.FC<TextRollProps> = ({
  children,
  className,
  center = false,
  active = false,
}) => {
  const letters = children.split("");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      animate={active ? "hovered" : "initial"}
      className={cn("relative inline-block overflow-hidden leading-none select-none", className)}
    >
      {/* Front primary layer */}
      <span className="inline-block">
        {letters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`front-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: 0.28,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          );
        })}
      </span>

      {/* Rolled secondary layer */}
      <span className="absolute inset-0 inline-block pointer-events-none">
        {letters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`rolled-${i}`}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: 0.28,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};
