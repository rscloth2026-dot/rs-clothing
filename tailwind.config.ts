import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        rajasthan: {
          white: "#FFFFFF",
          sandstone: "#FDFCF7",
          cream: "#F9F7F2",
          haveli: "#F4EFE6",
          crimson: "#8B1E1E", // Marwar Royal Crimson
          crimsonHover: "#721818",
          gold: "#C5A059", // Mughal/Rajput Antique Brass Gold
          goldMuted: "#E4D5B7",
          indigo: "#1D3557", // Jodhpur Royal Indigo
          ink: "#1C1917", // Heritage Deep Ink Charcoal
          stone: "#78716C", // Muted descriptive text
          border: "#E7E2D9", // Architectural hairline border
          borderLight: "#F0EBE1",
        },
      },
      boxShadow: {
        soft: "0 2px 10px 0 rgba(28, 25, 23, 0.04)",
        card: "0 4px 20px 0 rgba(28, 25, 23, 0.06)",
        hover: "0 10px 30px 0 rgba(28, 25, 23, 0.10)",
        gold: "0 0 20px -3px rgba(197, 160, 89, 0.25)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        display: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        editorial: ["var(--font-serif)", "Cormorant Garamond", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        "marquee-fast": "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
