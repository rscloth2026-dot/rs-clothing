"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, Zap } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { type FloatingGarmentItem } from "./FloatingGarment";

interface CircularFloatingCanvasProps {
  garments: FloatingGarmentItem[];
  onSelect: (garment: any) => void;
  isMobile?: boolean;
}

export function CircularFloatingCanvas({
  garments,
  onSelect,
  isMobile = false,
}: CircularFloatingCanvasProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);
  // Initialize dimensions matching the exact container constraints to prevent first-frame jump
  const [dimensions, setDimensions] = useState({
    width: isMobile ? 340 : 440,
    height: isMobile ? 260 : 440,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angle state in radians
  const [rotationAngle, setRotationAngle] = useState(0);
  const angleRef = useRef(0);
  const reqIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Measure container dimensions before initial paint
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Filter only enabled garments
  const activeGarments = garments.filter((g) => g.isEnabled !== false);
  const totalItems = activeGarments.length;

  // Animation frame loop for continuous circular orbit
  // Pauses or slows down smoothly when user hovers over canvas or a garment
  const animate = useCallback(
    (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!shouldReduceMotion) {
        // Normal speed: ~22 seconds for full 360 degree orbit
        // Slow down to zero when hovering a garment or canvas
        const targetSpeed = hoveredId || isCanvasHovered ? 0 : (2 * Math.PI) / 24;
        angleRef.current = (angleRef.current + targetSpeed * deltaTime) % (2 * Math.PI);
        setRotationAngle(angleRef.current);
      }

      reqIdRef.current = requestAnimationFrame(animate);
    },
    [shouldReduceMotion, hoveredId, isCanvasHovered]
  );

  useEffect(() => {
    lastTimeRef.current = 0;
    reqIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [animate]);

  // Orbit radius calculation for contained right-side stage and mobile turntable
  // Derive maxGarmentHalf from the largest active garment including 1.25x hover magnification
  const maxGarmentHalf = activeGarments.reduce((max, g) => {
    const scale = isMobile
      ? (g.sizeMobile && g.sizeMobile > 0 ? g.sizeMobile / 85 : 1)
      : (g.sizeDesktop && g.sizeDesktop > 0 ? g.sizeDesktop / 170 : 1);
    const size = (isMobile ? 68 : 118) * scale * 1.25;
    return Math.max(max, Math.round(size / 2));
  }, isMobile ? 45 : 75);

  const availableHalfWidth = Math.max(20, Math.floor(dimensions.width / 2 - maxGarmentHalf - 8));
  const rx = isMobile
    ? Math.min(115, availableHalfWidth)
    : Math.min(165, availableHalfWidth);

  const ry = isMobile ? 55 : 92;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsCanvasHovered(true)}
      onMouseLeave={() => {
        setIsCanvasHovered(false);
        setHoveredId(null);
      }}
      className="relative w-full h-full pointer-events-auto overflow-hidden select-none"
      aria-label="Interactive 3D revolving streetwear collection"
    >
      {/* Ambient Subtle Depth Lighting inside Orbit Stage */}
      <div className="absolute inset-0 bg-radial from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* Visual Orbital Track Guide - Subtle Minimalist Ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none transition-all duration-500"
        style={{
          width: `${rx * 2}px`,
          height: `${ry * 2}px`,
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.04), inset 0 0 15px rgba(255, 255, 255, 0.02)",
        }}
      />

      {/* Hologram Turntable Center Pedestal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-[12]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/80">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
            <span className="font-serif font-black text-xs sm:text-sm tracking-widest text-white">RS</span>
          </div>
        </div>
        <span className="mt-1.5 text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400 bg-zinc-950/90 px-2 py-0.5 border border-zinc-800 rounded-full shadow-xs">
          3D ORBIT
        </span>
      </div>

      {/* Interactive Mobile Tap / Desktop Hover Micro-Badge */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-1.5 px-2.5 py-0.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-[9px] font-sans text-zinc-400 uppercase tracking-wider rounded-full shadow-xs">
        <Sparkles className="w-2.5 h-2.5 text-zinc-200" />
        <span>{isMobile ? "Tap cloth to buy" : "Hover to pause • Click to buy"}</span>
      </div>

      {/* Orbiting Garments */}
      {activeGarments.map((garment, idx) => {
        // Base angle for this garment evenly distributed around the circle
        const baseAngle = (2 * Math.PI * idx) / (totalItems || 1);
        const currentAngle = (rotationAngle + baseAngle) % (2 * Math.PI);

        // 3D Elliptical coordinates relative to center
        // X follows cos(angle), Y follows sin(angle)
        const xPos = rx * Math.cos(currentAngle);
        const yPos = ry * Math.sin(currentAngle);

        // Depth perspective: sin(angle)
        // front half: sin > 0 -> scale up to 1.12, zIndex 30
        // back half: sin <= 0 -> scale down to 0.82, zIndex 10 (passes behind center pedestal)
        const depth = Math.sin(currentAngle);
        const isForeground = depth > 0;

        const baseScale = isForeground
          ? 0.96 + 0.16 * depth
          : 0.82 + 0.14 * (depth + 1);

        const baseOpacity = isForeground
          ? 1.0
          : 0.70 + 0.28 * (depth + 1);

        const zIndex = hoveredId === garment.id ? 50 : isForeground ? 30 : 10;
        const isHovered = hoveredId === garment.id;

        // Individual garment dimensions (scaled relative to admin-configured sizing, normalized to compact stage)
        const desktopScale = (garment.sizeDesktop && garment.sizeDesktop > 0) ? garment.sizeDesktop / 170 : 1;
        const mobileScale = (garment.sizeMobile && garment.sizeMobile > 0) ? garment.sizeMobile / 85 : 1;
        const garmentSize = Math.round(isMobile ? 68 * mobileScale : 118 * desktopScale);

        return (
          <motion.div
            key={garment.id}
            style={{
              position: "absolute",
              left: `calc(50% + ${xPos}px)`,
              top: `calc(50% + ${yPos}px)`,
              width: `${garmentSize}px`,
              height: `${garmentSize}px`,
              marginLeft: `-${garmentSize / 2}px`,
              marginTop: `-${garmentSize / 2}px`,
              zIndex,
              opacity: baseOpacity,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: isHovered ? 1.25 : baseScale,
                    rotate: isHovered ? 0 : Math.cos(currentAngle) * 6,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            onMouseEnter={() => setHoveredId(garment.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(garment.productData || garment);
            }}
            className="pointer-events-auto cursor-pointer select-none group touch-manipulation focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label={`Buy ${garment.name} - ${formatPrice(garment.price)}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(garment.productData || garment);
              }
            }}
          >
            {/* Outer Minimalist Aura Ring on Hover */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                isHovered
                  ? "bg-white/5 ring-1 ring-white/60 shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-110"
                  : "bg-transparent ring-0"
              }`}
            />

            {/* Garment Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={garment.imageUrl}
                alt={garment.name}
                fill
                className={`object-contain transition-all duration-300 ${
                  isHovered
                    ? "drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] brightness-110"
                    : "drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                }`}
                sizes="(max-width: 768px) 100px, 200px"
                priority
              />
            </div>

            {/* Interactive Tooltip Pill on Hover / Foreground */}
            <div
              className={`absolute whitespace-nowrap transition-all duration-200 pointer-events-none flex flex-col items-center z-50 ${
                xPos < -rx * 0.45
                  ? "left-0 translate-x-0 items-start"
                  : xPos > rx * 0.45
                  ? "right-0 translate-x-0 items-end"
                  : "left-1/2 -translate-x-1/2 items-center"
              } ${
                yPos > 0 ? "-top-11" : "-bottom-8"
              } ${
                isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-1 scale-95"
              }`}
            >
              <div className="bg-zinc-950/95 border border-zinc-700 px-3 py-1 text-center shadow-xl shadow-black/90 flex items-center space-x-1.5 max-w-[240px]">
                <Zap className="w-3 h-3 text-white fill-white shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-wider text-white truncate max-w-[120px] sm:max-w-[150px]">
                  {garment.name}
                </span>
                <span className="text-[10px] font-black text-zinc-300 tabular-nums pl-1 border-l border-zinc-700">
                  {formatPrice(garment.price)}
                </span>
              </div>
              <span className="text-[8px] font-bold text-zinc-400 tracking-widest uppercase mt-0.5">
                Click to Open Buy Section
              </span>
            </div>

            {/* Subtle category dot */}
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-zinc-400 opacity-80 group-hover:scale-150 group-hover:opacity-100 transition-all shadow-xs shadow-white/30" />
          </motion.div>
        );
      })}
    </div>
  );
}
