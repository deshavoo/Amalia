export const siteConfig = {
    name: "بيبي أماليا",
    nameEn: "Baby Amalia",
    tagline: "Elegance in every touch",
    taglineAr: "أناقة في كل لمسة",
    description:
        "بيبي أماليا — مجوهرات ذهب عيار 18 للأطفال والمواليد، آمنة على البشرة الحساسة وبحرفية أوروبية. أقراط، سلاسل وأساور وهدايا مواليد مع شحن لجميع مناطق المملكة.",
    // Set NEXT_PUBLIC_SITE_URL once the final domain is live; on Vercel it falls back to the project's production domain.
    url:
        process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : "http://localhost:3000"),
    // Salla storefront that still handles cart and checkout.
    storeUrl: process.env.NEXT_PUBLIC_STORE_URL ?? "https://babyamalia.com",
    locale: "ar_SA",
    currency: "SAR",
    keywords: [
        "بيبي أماليا",
        "Baby Amalia",
        "مجوهرات أطفال",
        "ذهب أطفال",
        "حلق أطفال",
        "أقراط آمنة للأطفال",
        "أقراط مواليد",
        "أساور بيبي",
        "سلاسل ذهب بنات",
        "هدايا مواليد",
        "هدايا فاخرة للأطفال",
        "Baby Jewelry",
    ],
    contact: {
        phone: "+966540592999",
        whatsapp: "966540592999",
    },
    social: {
        instagram: "https://www.instagram.com/babyamalia_jewelry",
        tiktok: "https://www.tiktok.com/@baby.amalia.jewel",
        snapchat: "https://www.snapchat.com/add/babyamalia_sa",
    },
    shipping: {
        days: "3 إلى 5 أيام عمل",
        pickup: 16,
        delivery: 24,
    },
    payments: ["مدى", "Visa", "Mastercard", "Apple Pay", "STC Pay"],
    colors: {
        green: "#11312c",
        gold: "#c6a575",
        ivory: "#f2efeb",
    },
};

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message: string) {
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
    return new URL(path, siteConfig.url).toString();
}
