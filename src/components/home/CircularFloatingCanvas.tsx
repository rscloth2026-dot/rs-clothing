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
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angle state in radians
  const [rotationAngle, setRotationAngle] = useState(0);
  const angleRef = useRef(0);
  const reqIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Measure container dimensions
  useEffect(() => {
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

  // Orbit radius calculation
  // Desktop: Rx around 38% of container (max 520px), Ry around 140px
  // Mobile: Rx around 40% of container (max 180px), Ry around 85px
  const rx = isMobile
    ? Math.min(180, dimensions.width * 0.40)
    : Math.min(520, dimensions.width * 0.38);

  const ry = isMobile ? 85 : 140;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsCanvasHovered(true)}
      onMouseLeave={() => {
        setIsCanvasHovered(false);
        setHoveredId(null);
      }}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-label="Interactive 3D revolving streetwear collection"
    >
      {/* Visual Orbital Track Guide - Subtle cyberpunk ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 pointer-events-none transition-opacity duration-500"
        style={{
          width: `${rx * 2}px`,
          height: `${ry * 2}px`,
          boxShadow: "0 0 50px rgba(212, 255, 0, 0.03)",
        }}
      />

      {/* Orbiting Garments */}
      {activeGarments.map((garment, idx) => {
        // Base angle for this garment evenly distributed around the circle
        const baseAngle = (2 * Math.PI * idx) / (totalItems || 1);
        const currentAngle = (rotationAngle + baseAngle) % (2 * Math.PI);

        // 3D Elliptical coordinates relative to center
        // X follows cos(angle), Y follows sin(angle) with slight tilt
        const xPos = rx * Math.cos(currentAngle);
        const yPos = ry * Math.sin(currentAngle);

        // Depth perspective: sin(angle)
        // front half: sin > 0 -> scale up to 1.15, zIndex 30
        // back half: sin <= 0 -> scale down to 0.80, zIndex 10 (behind center text)
        const depth = Math.sin(currentAngle);
        const isForeground = depth > 0;

        const baseScale = isForeground
          ? 0.95 + 0.20 * depth
          : 0.78 + 0.17 * (depth + 1);

        const baseOpacity = isForeground
          ? 1.0
          : 0.60 + 0.35 * (depth + 1);

        const zIndex = hoveredId === garment.id ? 50 : isForeground ? 30 : 10;
        const isHovered = hoveredId === garment.id;

        // Individual garment dimensions
        const garmentSize = isMobile ? garment.sizeMobile || 85 : garment.sizeDesktop || 165;

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
            {/* Outer Cyber Aura Ring on Hover */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                isHovered
                  ? "bg-[#D4FF00]/15 ring-2 ring-[#D4FF00] shadow-[0_0_35px_rgba(212,255,0,0.35)] scale-110"
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
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-200 pointer-events-none flex flex-col items-center ${
                isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-1 scale-95"
              }`}
            >
              <div className="bg-[#090A0F] border border-[#D4FF00] px-3 py-1 text-center shadow-xl shadow-black/80 flex items-center space-x-1.5">
                <Zap className="w-3 h-3 text-[#D4FF00] fill-[#D4FF00]" />
                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                  {garment.name}
                </span>
                <span className="text-[10px] font-black text-[#D4FF00] tabular-nums pl-1 border-l border-white/20">
                  {formatPrice(garment.price)}
                </span>
              </div>
              <span className="text-[8px] font-bold text-[#D4FF00] tracking-widest uppercase mt-0.5 animate-pulse">
                Click to Open Buy Section
              </span>
            </div>

            {/* Subtle category dot */}
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4FF00] opacity-80 group-hover:scale-150 group-hover:opacity-100 transition-all shadow-xs shadow-[#D4FF00]" />
          </motion.div>
        );
      })}
    </div>
  );
}
