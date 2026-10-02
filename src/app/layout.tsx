import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Manrope, Alex_Brush } from "next/font/google";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  metadataBase: new URL(weddingConfig.seo.siteUrl),
  authors: [{ name: "Bilal Rafique & Maria Jakhro" }],
  keywords: [
    "Bilal and Maria Wedding",
    "Pakistani Wedding Invitation",
    "Karachi Wedding",
    "Mehndi Baraat Walima",
    "Bilal Rafique",
    "Maria Jakhro",
  ],
  openGraph: {
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    url: weddingConfig.seo.siteUrl,
    siteName: "Bilal & Maria Wedding",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#581D35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ivory text-plum selection:bg-rose/30 selection:text-burgundy flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
