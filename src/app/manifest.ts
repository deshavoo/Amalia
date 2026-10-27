import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.nameEn}`,
    short_name: siteConfig.nameEn,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: siteConfig.colors.ivory,
    theme_color: siteConfig.colors.green,
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
