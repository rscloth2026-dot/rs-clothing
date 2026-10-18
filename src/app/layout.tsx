import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SITE_CONFIG, generateOrganizationSchema } from "@/lib/seo";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ONLYCOLLECTION | Luxury Streetwear Atelier",
    template: "%s | OnlyCollection Atelier",
  },
  description: "Luxury oversized streetwear engineered with Rajputana royal heritage from Jodhpur. 380 GSM heavyweight French Terry, handcrafted brass hardware, and architectural selvedge denim.",
  keywords: [
    "OnlyCollection",
    "OnlyCollection Atelier",
    "Rajasthani streetwear brand",
    "royal oversized t-shirts India",
    "Jodhpur luxury fashion atelier",
    "Marwar luxury streetwear",
    "heavyweight cotton t-shirt India",
    "baggy jeans men",
    "quiet luxury Indian streetwear",
    "380 GSM cotton",
  ],
  authors: [{ name: "OnlyCollection" }],
  creator: "OnlyCollection",
  publisher: "OnlyCollection Atelier Pvt Ltd",
  openGraph: {
    title: "ONLYCOLLECTION | Luxury Streetwear Atelier",
    description: "Luxury oversized streetwear engineered with Rajputana royal heritage from Jodhpur.",
    url: SITE_CONFIG.url,
    siteName: "OnlyCollection",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "OnlyCollection Luxury Streetwear Campaign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONLYCOLLECTION | Luxury Streetwear Atelier",
    description: "Luxury oversized streetwear engineered with Rajputana royal heritage from Jodhpur.",
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0A0A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`dark ${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <CartDrawer />
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
