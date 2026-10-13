"use client";

import React from "react";

/**
 * RajasthanFortsBlueprintBackground
 * Museum-grade architectural CAD blueprint of Rajasthan's UNESCO World Heritage Citadels:
 * 1. Mehrangarh Fort (Jodhpur) - The Sun Citadel & Cliffside Bastions
 * 2. Kumbhalgarh Fort (Mewar) - The Great Wall of India (36.8 km)
 * 3. Jaisalmer Fort (Sonar Qila) - 99 Bastion Concentric Desert Defense
 * 4. Amber Fort (Amer / Jaipur) - Ganesh Pol Portal & Maota Ramparts
 * 5. Chittorgarh Fort - Vijay Stambha (9-Storey Victory Tower)
 * 
 * Features:
 * - 100px major CAD drafting grid with fine coordinates & 20px micro-grids
 * - Technical CAD callouts, dimension lines, coordinate stamps, and compass rose
 * - Official Draughtsman Title Block for RS Clothing Atelier
 * - Atmospheric central spotlight gradient for impeccable UI/UX Pro Max foreground contrast
 */
export function RajasthanFortsBlueprintBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#060C18]"
    >
      {/* 1. Base Blueprint Radial Illumination & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,#0F2244_0%,#0A1730_45%,#060C18_85%)] opacity-95" />

      {/* 2. 100px Major CAD Drafting Grid + 20px Minor Micro-Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Minor 20px Grid Pattern in Blueprint Cyan */}
          <pattern id="cad-grid-minor" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
          </pattern>

          {/* Major 100px Grid Pattern with Corner Crosshairs */}
          <pattern id="cad-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#cad-grid-minor)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeOpacity="0.22"
            />
            {/* Corner Drafting Crosshairs */}
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4 M 96 100 L 104 100 M 100 96 L 100 104"
              stroke="#C5A059"
              strokeWidth="0.75"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#cad-grid-major)" />
      </svg>

      {/* 3. Isometric 45° Diagonal Draughtsman Guide Lines */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(56, 189, 248, 0.05) 0, rgba(56, 189, 248, 0.05) 1px, transparent 0, transparent 120px)",
        }}
      />

      {/* 4. Full-Scale Vector Blueprint Illustrations of Rajasthan's Forts */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blueprint-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B1E1E" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="blueprint-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            FORT 1: MEHRANGARH FORT (JODHPUR) - TOP RIGHT / CENTER ELEVATION
            Towering cliff relief, multi-tiered bastion stones, jharokhas, Jai Pol
            ========================================================================= */}
        <g id="mehrangarh-fort-elevation" transform="translate(1120, 90) scale(0.95)" opacity="0.42">
          {/* Draughtsman Header Box */}
          <rect x="0" y="0" width="380" height="28" fill="#0A162B" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2" />
          <text x="12" y="18" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.18em">
            CITADEL 01: MEHRANGARH // JODHPUR (1459 AD)
          </text>
          <text x="368" y="18" fill="#C5A059" fontSize="9" fontFamily="monospace" textAnchor="end">
            EL. +410 FT
          </text>

          {/* Vertical Cliff Foundation Rock Strata */}
          <path
            d="M 20 460 L 40 380 L 70 360 L 90 310 L 140 280 L 190 270 L 260 260 L 340 250 L 420 255 L 500 240 L 560 250 L 620 320 L 650 460"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          {/* Strata Hatching */}
          <path
            d="M 30 440 L 90 400 M 60 460 L 130 380 M 110 450 L 180 370 M 160 460 L 240 360 M 230 450 L 310 350 M 310 460 L 390 350 M 400 450 L 480 340 M 500 460 L 570 340"
            stroke="#38BDF8"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />

          {/* Massive Fortress Bastions (Lower Wall) */}
          <path
            d="M 70 360 L 70 210 L 110 210 L 110 190 L 170 190 L 170 210 L 220 210 L 220 180 L 290 180 L 290 210 L 360 210 L 360 160 L 440 160 L 440 200 L 510 200 L 510 170 L 580 170 L 580 230 L 620 230 L 620 320"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.6"
          />

          {/* Bastion Stone Ashlar Coursing Lines */}
          <line x1="70" y1="240" x2="620" y2="240" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" />
          <line x1="70" y1="270" x2="620" y2="270" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" />
          <line x1="70" y1="300" x2="620" y2="300" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" />
          <line x1="70" y1="330" x2="620" y2="330" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" />

          {/* Upper Royal Palaces: Moti Mahal & Phool Mahal Architectural Profile */}
          <path
            d="M 120 190 L 120 110 L 150 110 L 150 85 L 180 85 L 180 60 L 240 60 L 240 85 L 280 85 L 280 110 L 330 110 L 330 70 L 390 70 L 390 50 L 430 50 L 430 70 L 480 70 L 480 120 L 530 120 L 530 170"
            fill="none"
            stroke="#C5A059"
            strokeWidth="1.8"
          />

          {/* Rajput Jharokhas & Arched Pavilions (Ornate Balconies) */}
          <g stroke="#C5A059" strokeWidth="0.9" fill="none">
            {/* Jharokha 1 */}
            <rect x="190" y="95" width="24" height="32" rx="2" />
            <path d="M 190 103 Q 202 91 214 103" />
            <line x1="190" y1="127" x2="184" y2="135" />
            <line x1="214" y1="127" x2="220" y2="135" />

            {/* Jharokha 2 */}
            <rect x="245" y="95" width="24" height="32" rx="2" />
            <path d="M 245 103 Q 257 91 269 103" />

            {/* Grand Jharokha 3 (Phool Mahal Center) */}
            <rect x="345" y="80" width="34" height="44" rx="2" />
            <path d="M 345 92 Q 362 76 379 92" />
            <line x1="362" y1="84" x2="362" y2="124" strokeDasharray="2 2" />

            {/* Chhatri Dome Finial */}
            <path d="M 200 60 Q 210 40 220 60" />
            <line x1="210" y1="40" x2="210" y2="30" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="210" cy="28" r="2.5" fill="#C5A059" />

            {/* Second Chhatri Dome Finial */}
            <path d="M 400 50 Q 410 32 420 50" />
            <line x1="410" y1="32" x2="410" y2="22" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="410" cy="20" r="2.5" fill="#C5A059" />
          </g>

          {/* Architectural Dimension Leaders & Annotations */}
          <g stroke="#38BDF8" strokeWidth="0.75" opacity="0.8">
            {/* Height Dimension Line */}
            <line x1="45" y1="50" x2="45" y2="460" strokeDasharray="3 3" />
            <line x1="38" y1="50" x2="52" y2="50" />
            <line x1="38" y1="460" x2="52" y2="460" />
            <text x="38" y="260" fill="#38BDF8" fontSize="8" fontFamily="monospace" transform="rotate(-90 38 260)" textAnchor="middle">
              410 FT VERTICAL CLIFF RELIEF
            </text>

            {/* Bastion Width Dimension */}
            <line x1="70" y1="480" x2="620" y2="480" strokeDasharray="3 3" />
            <line x1="70" y1="475" x2="70" y2="485" />
            <line x1="620" y1="475" x2="620" y2="485" />
            <text x="345" y="495" fill="#38BDF8" fontSize="8" fontFamily="monospace" textAnchor="middle">
              RAO JODHA BASTION CURTAIN: 550 METERS
            </text>
          </g>

          <text x="120" y="380" fill="#C5A059" fontSize="8.5" fontFamily="monospace" letterSpacing="0.1em">
            WALL THICKNESS: 12 TO 70 FT CUT SANDSTONE
          </text>
          <text x="120" y="396" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">
            COORDINATES: 26°17&apos;56&quot; N • 73°01&apos;08&quot; E
          </text>
        </g>

        {/* =========================================================================
            FORT 2: KUMBHALGARH FORT (MEWAR) - TOP LEFT / RUNNING WALL BLUEPRINT
            The Great Wall of India, 36.8 km serpentine curtain wall & watchtowers
            ========================================================================= */}
        <g id="kumbhalgarh-wall-blueprint" transform="translate(60, 110) scale(0.9)" opacity="0.38">
          {/* Draughtsman Header */}
          <rect x="0" y="0" width="390" height="26" fill="#0A162B" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2" />
          <text x="12" y="17" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.15em">
            CITADEL 02: KUMBHALGARH // THE GREAT WALL (1458 AD)
          </text>
          <text x="378" y="17" fill="#C5A059" fontSize="9" fontFamily="monospace" textAnchor="end">
            36.8 KM WALL
          </text>

          {/* Serpentine Great Wall Ramparts Across Hilltops */}
          <path
            d="M 10 320 C 60 260, 100 290, 150 220 C 200 150, 240 190, 300 130 C 350 80, 420 120, 480 70 L 550 70"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.2"
          />

          {/* Wall Parapet Lower Line (Thickness) */}
          <path
            d="M 10 338 C 60 278, 100 308, 150 238 C 200 168, 240 208, 300 148 C 350 98, 420 138, 480 88 L 550 88"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />

          {/* Crenellated Parapets & Battlements along the wall */}
          <path
            d="M 15 315 L 20 315 L 20 320 L 25 320 L 25 315 L 30 315 M 70 265 L 75 265 L 75 270 L 80 270 L 80 265 M 160 210 L 165 210 L 165 215 L 170 215 L 170 210 M 310 120 L 315 120 L 315 125 L 320 125 L 320 120"
            stroke="#38BDF8"
            strokeWidth="1"
            fill="none"
          />

          {/* Cylindrical Watchtowers / Bastions */}
          {/* Watchtower 1 */}
          <g stroke="#C5A059" strokeWidth="1.2" fill="none">
            <rect x="135" y="195" width="28" height="50" rx="3" />
            <path d="M 135 195 Q 149 180 163 195" />
            <line x1="149" y1="180" x2="149" y2="172" />
            <circle cx="149" cy="170" r="2" fill="#C5A059" />
            <line x1="149" y1="210" x2="149" y2="230" strokeDasharray="2 2" stroke="#38BDF8" />
          </g>

          {/* Watchtower 2 (Badal Mahal Summit Peak) */}
          <g stroke="#C5A059" strokeWidth="1.4" fill="none">
            <rect x="285" y="105" width="34" height="60" rx="4" />
            <path d="M 285 105 Q 302 85 319 105" />
            <line x1="302" y1="85" x2="302" y2="74" />
            <circle cx="302" cy="72" r="2.5" fill="#C5A059" />
            <rect x="293" y="118" width="18" height="24" rx="2" stroke="#38BDF8" strokeWidth="0.8" />
          </g>

          {/* Watchtower 3 */}
          <g stroke="#C5A059" strokeWidth="1.2" fill="none">
            <rect x="465" y="55" width="28" height="45" rx="3" />
            <path d="M 465 55 Q 479 40 493 55" />
            <line x1="479" y1="40" x2="479" y2="32" />
            <circle cx="479" cy="30" r="2" fill="#C5A059" />
          </g>

          {/* Dimension & Historical CAD Data */}
          <text x="30" y="380" fill="#38BDF8" fontSize="8" fontFamily="monospace">
            WALL WIDTH: 15 FT (8 HORSES ABREAST) // 360 TEMPLE ENCLOSURE
          </text>
          <text x="30" y="396" fill="#C5A059" fontSize="8" fontFamily="monospace">
            2ND LONGEST CONTINUOUS STONE FORTRESS WALL ON PLANET EARTH
          </text>
        </g>

        {/* =========================================================================
            FORT 3: JAISALMER FORT (SONAR QILA) - LOWER LEFT BLUEPRINT
            99 Semi-Circular Bastions in Triple Concentric Rings across the Thar Desert
            ========================================================================= */}
        <g id="jaisalmer-fort-blueprint" transform="translate(80, 620) scale(0.92)" opacity="0.40">
          {/* Draughtsman Header */}
          <rect x="0" y="0" width="410" height="26" fill="#0A162B" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2" />
          <text x="12" y="17" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.15em">
            CITADEL 03: JAISALMER // SONAR QILA (1156 AD)
          </text>
          <text x="398" y="17" fill="#C5A059" fontSize="9" fontFamily="monospace" textAnchor="end">
            99 BASTIONS
          </text>

          {/* Concentric Radial Ring Defense Architecture (Mori System) */}
          <path
            d="M 40 300 C 100 240, 200 210, 320 210 C 440 210, 520 250, 580 300"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <path
            d="M 60 270 C 120 215, 210 185, 320 185 C 430 185, 500 220, 560 270"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.8"
          />
          <path
            d="M 90 230 C 140 180, 220 155, 320 155 C 420 155, 480 185, 530 230"
            fill="none"
            stroke="#C5A059"
            strokeWidth="2"
          />

          {/* Semi-Circular Bastions radiating along the rings */}
          {[
            { cx: 80, cy: 260 },
            { cx: 130, cy: 220 },
            { cx: 190, cy: 190 },
            { cx: 250, cy: 170 },
            { cx: 320, cy: 160 },
            { cx: 390, cy: 170 },
            { cx: 450, cy: 190 },
            { cx: 510, cy: 220 },
            { cx: 550, cy: 260 },
          ].map((b, i) => (
            <g key={`bastion-${i}`} stroke="#C5A059" strokeWidth="1" fill="#0A162B">
              <circle cx={b.cx} cy={b.cy} r="11" />
              <line x1={b.cx - 6} y1={b.cy} x2={b.cx + 6} y2={b.cy} stroke="#38BDF8" strokeWidth="0.75" />
              <line x1={b.cx} y1={b.cy - 6} x2={b.cx} y2={b.cy + 6} stroke="#38BDF8" strokeWidth="0.75" />
            </g>
          ))}

          {/* Central Raj Mahal Palace Citadel */}
          <g stroke="#C5A059" strokeWidth="1.4" fill="none">
            <rect x="280" y="80" width="80" height="70" />
            <line x1="280" y1="105" x2="360" y2="105" strokeDasharray="3 2" />
            <line x1="280" y1="125" x2="360" y2="125" strokeDasharray="3 2" />
            {/* Jharokhas */}
            <rect x="295" y="88" width="12" height="14" rx="1" />
            <rect x="333" y="88" width="12" height="14" rx="1" />
            <path d="M 300 80 Q 320 62 340 80" />
            <circle cx="320" cy="58" r="2" fill="#C5A059" />
          </g>

          {/* Dimension Radius Line */}
          <line x1="320" y1="160" x2="480" y2="280" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="3 2" />
          <circle cx="320" cy="160" r="2.5" fill="#38BDF8" />
          <text x="420" y="225" fill="#38BDF8" fontSize="8" fontFamily="monospace" transform="rotate(36 420 225)">
            RADIUS = 380 METERS // MORI PERIMETER
          </text>

          <text x="20" y="350" fill="#38BDF8" fontSize="8" fontFamily="monospace">
            MATERIAL: YELLOW JURASSIC SANDSTONE // INTERLOCKING MORTARLESS DOWELS
          </text>
        </g>

        {/* =========================================================================
            FORT 4: CHITTORGARH FORT - VIJAY STAMBHA (TOWER OF VICTORY)
            Lower Right Blueprint: 9-Storey Architectural Wonder (1448 AD)
            ========================================================================= */}
        <g id="chittorgarh-vijay-stambha" transform="translate(1420, 520) scale(0.95)" opacity="0.45">
          {/* Draughtsman Header */}
          <rect x="0" y="0" width="360" height="26" fill="#0A162B" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2" />
          <text x="12" y="17" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.15em">
            TOWER 04: VIJAY STAMBHA // CHITTOR (1448 AD)
          </text>
          <text x="348" y="17" fill="#C5A059" fontSize="9" fontFamily="monospace" textAnchor="end">
            9 STOREYS • 37.2M
          </text>

          {/* 9-Storey Tower Elevation Architectural Cross-Section */}
          <g stroke="#C5A059" strokeWidth="1.2" fill="none">
            {/* Base Plinth */}
            <rect x="130" y="440" width="100" height="20" />
            <rect x="140" y="420" width="80" height="20" />

            {/* Storey 1 */}
            <rect x="145" y="380" width="70" height="40" />
            <line x1="145" y1="380" x2="135" y2="380" stroke="#38BDF8" />
            <line x1="215" y1="380" x2="225" y2="380" stroke="#38BDF8" />

            {/* Storey 2 */}
            <rect x="148" y="340" width="64" height="40" />
            {/* Storey 3 */}
            <rect x="150" y="300" width="60" height="40" />
            {/* Storey 4 */}
            <rect x="152" y="260" width="56" height="40" />
            {/* Storey 5 */}
            <rect x="154" y="220" width="52" height="40" />
            {/* Storey 6 */}
            <rect x="156" y="180" width="48" height="40" />
            {/* Storey 7 */}
            <rect x="158" y="140" width="44" height="40" />
            {/* Storey 8 (Open Balcony Pillars) */}
            <rect x="160" y="100" width="40" height="40" />
            <line x1="170" y1="100" x2="170" y2="140" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="180" y1="100" x2="180" y2="140" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="190" y1="100" x2="190" y2="140" stroke="#38BDF8" strokeWidth="0.8" />

            {/* Storey 9 (Dome & Chhatri Pavilion Finial) */}
            <path d="M 160 100 Q 180 75 200 100" strokeWidth="1.5" />
            <line x1="180" y1="75" x2="180" y2="60" stroke="#C5A059" strokeWidth="1.6" />
            <circle cx="180" cy="58" r="3" fill="#C5A059" />

            {/* Balcony Overhangs on each tier */}
            {[380, 340, 300, 260, 220, 180, 140].map((y, idx) => (
              <line
                key={`tier-${idx}`}
                x1={140 - idx * 0.5}
                y1={y}
                x2={220 + idx * 0.5}
                y2={y}
                stroke="#38BDF8"
                strokeWidth="1.2"
              />
            ))}
          </g>

          {/* Height Dimension Line */}
          <g stroke="#38BDF8" strokeWidth="0.8">
            <line x1="245" y1="58" x2="245" y2="460" strokeDasharray="3 2" />
            <line x1="238" y1="58" x2="252" y2="58" />
            <line x1="238" y1="460" x2="252" y2="460" />
            <text x="255" y="260" fill="#38BDF8" fontSize="8" fontFamily="monospace" transform="rotate(90 255 260)" textAnchor="middle">
              37.19 METERS // 157 STEPS // MAHARANA KUMBHA
            </text>
          </g>

          <text x="60" y="495" fill="#38BDF8" fontSize="8" fontFamily="monospace">
            BUILT TO CELEBRATE VICTORY OVER MALWA &amp; GUJARAT ARMIES
          </text>
        </g>

        {/* =========================================================================
            FORT 5: AMBER FORT (AMER / JAIPUR) - CENTER BACKGROUND RAMPARTS & GANESH POL
            Zigzag lake ramparts & multi-foil Rajput arches
            ========================================================================= */}
        <g id="amber-fort-blueprint" transform="translate(680, 480) scale(0.9)" opacity="0.32">
          {/* Stepped Lakeside Rampart */}
          <path
            d="M 0 240 L 40 240 L 40 210 L 80 210 L 80 180 L 130 180 L 130 150 L 190 150 L 190 120 L 260 120 L 260 90 L 340 90 L 340 60 L 420 60"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.4"
          />

          {/* Maota Lake Water Level Line */}
          <line x1="-20" y1="280" x2="450" y2="280" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 3" />
          <text x="120" y="300" fill="#38BDF8" fontSize="8" fontFamily="monospace">
            MAOTA LAKE DEFENSIVE WATER MOAT // ELEV +180M
          </text>

          {/* Ganesh Pol Multi-Foil Rajput Archway */}
          <g stroke="#C5A059" strokeWidth="1.2" fill="none">
            <rect x="250" y="90" width="80" height="70" />
            <path d="M 270 160 L 270 125 C 270 110, 280 100, 290 100 C 300 100, 310 110, 310 125 L 310 160" />
            <path d="M 265 90 Q 290 70 315 90" />
            <circle cx="290" cy="68" r="2" fill="#C5A059" />
          </g>

          <text x="210" y="45" fill="#C5A059" fontSize="8.5" fontFamily="monospace" letterSpacing="0.1em">
            CITADEL 05: AMBER PALACE // GANESH POL PORTAL
          </text>
        </g>

        {/* =========================================================================
            6. OFFICIAL ARCHITECTURAL CAD TITLE BLOCK & LEGEND (BOTTOM RIGHT)
            ========================================================================= */}
        <g id="blueprint-title-block" transform="translate(1380, 940)" opacity="0.75">
          {/* Main Title Block Border */}
          <rect
            x="0"
            y="0"
            width="500"
            height="110"
            fill="#060E1D"
            stroke="#C5A059"
            strokeWidth="1.2"
          />
          <line x1="0" y1="34" x2="500" y2="34" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="0" y1="72" x2="500" y2="72" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="280" y1="34" x2="280" y2="110" stroke="#38BDF8" strokeWidth="0.8" />

          {/* Row 1: Brand Wordmark & Department */}
          <text x="16" y="22" fill="#FFFFFF" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="0.12em">
            RS CLOTHING // MARWAR ATELIER JODHPUR
          </text>
          <text x="484" y="22" fill="#C5A059" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
            SHEET: ARCH-01/05
          </text>

          {/* Row 2: Project Title & Classification */}
          <text x="16" y="52" fill="#38BDF8" fontSize="8.5" fontFamily="monospace">
            PROJECT: RAJASTHAN FORTS ARCHITECTURAL BLUEPRINT
          </text>
          <text x="16" y="64" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
            SURVEY: MEHRANGARH • KUMBHALGARH • JAISALMER • CHITTOR • AMBER
          </text>
          <text x="296" y="52" fill="#C5A059" fontSize="8.5" fontFamily="monospace">
            SCALE: 1:500 (ORTHOGRAPHIC)
          </text>
          <text x="296" y="64" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
            FABRIC WEIGHT: 380 GSM
          </text>

          {/* Row 3: Draughtsman Signoff & Origin */}
          <text x="16" y="90" fill="#F1EFEA" fontSize="8" fontFamily="monospace">
            ORIGIN: JODHPUR, RAJASTHAN (26°17&apos;N, 73°01&apos;E)
          </text>
          <text x="16" y="102" fill="#C5A059" fontSize="7.5" fontFamily="monospace">
            APPROVED: ROYAL ATELIER GUILD // VERIFIED HISTORIC SURVEY
          </text>
          <text x="296" y="90" fill="#38BDF8" fontSize="8" fontFamily="monospace">
            REV: 2026.04 // PRODUCTION
          </text>
          <text x="296" y="102" fill="#8B1E1E" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            STATUS: ACTIVE STOREFRONT
          </text>
        </g>

        {/* =========================================================================
            7. COMPASS ROSE / RAJPUTANA SUN (TOP LEFT CORNER)
            ========================================================================= */}
        <g id="blueprint-compass-rose" transform="translate(90, 60)" opacity="0.6">
          <circle cx="0" cy="0" r="32" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
          <circle cx="0" cy="0" r="24" stroke="#C5A059" strokeWidth="0.8" fill="none" />
          
          {/* North Arrow with Sun Motif */}
          <polygon points="0,-38 -5,-8 0,-12 5,-8" fill="#C5A059" />
          <polygon points="0,38 -5,8 0,12 5,8" fill="#38BDF8" opacity="0.6" />
          <polygon points="38,0 8,-5 12,0 8,5" fill="#38BDF8" opacity="0.6" />
          <polygon points="-38,0 -8,-5 -12,0 -8,5" fill="#38BDF8" opacity="0.6" />
          
          <text x="0" y="-42" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            N
          </text>
          <circle cx="0" cy="0" r="2.5" fill="#C5A059" />
        </g>

        {/* Technical Coordinate Stamps across margins */}
        <text x="960" y="30" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="middle">
          LAT 26.2389° N • LONG 73.0243° E // MARWAR HIGH ELEVATION DATUM
        </text>
        <text x="960" y="1065" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="middle">
          RS CLOTHING ATELIER // ARCHITECTURAL DOSSIER // SHEET NO. 01 // JODHPUR RAJASTHAN
        </text>
      </svg>

      {/* 5. Subtle Edge Vignette for Ultimate Contrast Hierarchy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,12,24,0.75)_95%)] pointer-events-none" />
    </div>
  );
}
