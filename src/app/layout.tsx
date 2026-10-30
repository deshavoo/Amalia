import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Readex_Pro } from "next/font/google";
import { preload } from "react-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  display: "swap",
});

// Decorative Latin accents only (taglines, numerals), mostly below the fold:
// one weight, no preload so it never competes with the Arabic text font, and
// `optional` so a late arrival never shifts the layout (it is cached next visit).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.nameEn} — مجوهرات ذهب أطفال فاخرة وآمنة`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.nameEn,
  authors: [{ name: siteConfig.nameEn }],
  creator: siteConfig.nameEn,
  category: "jewelry",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.nameEn}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.nameEn}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.green,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Brand marks are CSS masks: discovered late (after CSS) and fetched in CORS mode.
  preload("/brand/baby-amalia-wordmark.webp", { as: "image", type: "image/webp", crossOrigin: "anonymous", fetchPriority: "high" });
  preload("/brand/emblem.svg", { as: "image", type: "image/svg+xml", crossOrigin: "anonymous" });

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readex.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only z-100 rounded-full bg-forest px-5 py-3 text-sm text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:right-4"
        >
          تخطي إلى المحتوى
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
