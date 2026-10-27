export const siteConfig = {
    name: "أماليا للمجوهرات",
    nameEn: "Amalia Jewellery",
    tagline: "Elegance in every touch",
    taglineAr: "أناقة في كل لمسة",
    description:
        "أماليا للمجوهرات — ذهب ومجوهرات راقية للكبار والصغار. خواتم، سلاسل، أساور وهدايا ذهبية تُصاغ بإتقان لتناسب إطلالتك اليومية وأجمل مناسباتك.",
    // Set NEXT_PUBLIC_SITE_URL in production so canonical URLs, sitemap and OG tags resolve correctly.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    locale: "ar_EG",
    keywords: [
        "أماليا للمجوهرات",
        "Amalia Jewellery",
        "أماليا بيبي",
        "مجوهرات ذهب",
        "ذهب أطفال",
        "خواتم ذهب",
        "سلاسل ذهب",
        "أساور ذهب",
        "هدايا ذهب",
        "مجوهرات فاخرة",
    ],
    colors: {
        green: "#11312c",
        gold: "#c6a575",
        ivory: "#f2efeb",
    },
};

export type SiteConfig = typeof siteConfig;
