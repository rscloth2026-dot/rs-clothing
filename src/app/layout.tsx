import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "KULT | Premium Gen-Z Men's Streetwear India",
  description:
    "Engineered heavyweight oversized T-shirts, graphic tees, and baggy puddle jeans for the Indian streetwear culture. Free express shipping on orders above ₹999.",
  keywords: [
    "oversized t-shirts India",
    "baggy jeans men",
    "streetwear brand India",
    "graphic tees",
    "heavyweight cotton t-shirt",
    "skate jeans",
    "Gen-Z fashion India",
  ],
  authors: [{ name: "KULT Streetwear" }],
  openGraph: {
    title: "KULT | Premium Gen-Z Men's Streetwear",
    description: "Heavyweight drop-shoulder tees and skate-drape baggy denim. YOUR FIT. YOUR RULES.",
    url: "https://kult.in",
    siteName: "KULT Streetwear",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "KULT Streetwear Campaign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KULT | Premium Gen-Z Men's Streetwear",
    description: "Heavyweight drop-shoulder tees and skate-drape baggy denim. YOUR FIT. YOUR RULES.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-onyx-950 text-foreground font-sans selection:bg-volt selection:text-black">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
