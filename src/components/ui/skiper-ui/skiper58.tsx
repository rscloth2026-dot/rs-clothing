"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.02;

export interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
}

/**
 * Skiper-UI 58: Text Roll Navigation / Typography
 * Source: https://skiper-ui.com/registry/skiper58.json
 * Staggered letter-by-letter rolling animation with clean baseline alignment.
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
      className={cn(
        "relative inline-flex items-center overflow-hidden leading-normal select-none py-0.5",
        className
      )}
    >
      {/* Front primary layer */}
      <span className="inline-flex items-center">
        {letters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`front-${i}`}
              variants={{
                initial: { y: "0%" },
                hovered: { y: "-110%" },
              }}
              transition={{
                duration: 0.25,
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

      {/* Rolled secondary layer - positioned safely offscreen with translate-y-full */}
      <span className="absolute inset-0 inline-flex items-center pointer-events-none translate-y-full">
        {letters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`rolled-${i}`}
              variants={{
                initial: { y: "0%" },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: 0.25,
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
