/**
 * Catalog types and category metadata. Kept free of the product JSON so client components stay light.
 */

export type CategoryKey = "earrings" | "necklaces" | "bracelets" | "newborn";

export type Product = {
    id: string;
    slug: string;
    name: string;
    category: Exclude<CategoryKey, "newborn">;
    collections: string[];
    price: number;
    regularPrice: number;
    available: boolean;
    image: string;
    width: number;
    height: number;
    blur: string;
    /** Background-free photo (transparent WebP) used inside the boutique niches. */
    cutout?: string;
    code?: string;
    karat?: number;
    weight?: number;
    story?: string;
    care?: string;
    sallaUrl: string;
};

export type Category = {
    key: CategoryKey;
    title: string;
    titleEn: string;
    singular: string;
    description: string;
    seoTitle: string;
    image?: string;
    alt?: string;
};

export const categories: Category[] = [
    {
        key: "earrings",
        title: "أقراط",
        titleEn: "Earrings",
        singular: "قرط",
        description:
            "أقراط ذهب ناعمة ومريحة للأذن بتصاميم القلب والفراشة والزهور والكريستال، آمنة على بشرة طفلتك الحساسة.",
        seoTitle: "أقراط ذهب للأطفال والبنات",
        image: "/images/kids-earrings.webp",
        alt: "طفلة ترتدي قرطًا ذهبيًا صغيرًا من بيبي أماليا",
    },
    {
        key: "necklaces",
        title: "قلائد",
        titleEn: "Necklaces",
        singular: "سلسال",
        description:
            "سلاسل ذهب رقيقة بتعليقات الفراشة والقلب واليونيكورن والصدف الطبيعي، هدية تكبر معها.",
        seoTitle: "سلاسل وقلائد ذهب للبنات",
        image: "/images/kids-necklace.webp",
        alt: "طفلة بفستان وردي ترتدي سلسال ذهب من بيبي أماليا",
    },
    {
        key: "bracelets",
        title: "أساور",
        titleEn: "Bracelets",
        singular: "إسوارة",
        description:
            "أساور ذهب بأحجام صغيرة مزينة بالزهور والتاج والأحجار الكريمة، لمعصم صغير وأناقة كبيرة.",
        seoTitle: "أساور ذهب للأطفال",
        image: "/images/kids-bracelet.webp",
        alt: "طفلة تضع يديها على خديها وترتدي إسوارة ذهب بزهرة الصدف",
    },
    {
        key: "newborn",
        title: "أقراط المواليد",
        titleEn: "Newborn",
        singular: "قرط مواليد",
        description:
            "أقراط ذهب لحديثي الولادة بلون حجر شهر الميلاد، رقيقة وآمنة على بشرة المواليد — أجمل هدية للسبوع.",
        seoTitle: "أقراط ذهب لحديثي الولادة بحجر شهر الميلاد",
        image: "/images/category-earrings.webp",
        alt: "قرطان ذهبيان على شكل قلب من بيبي أماليا",
    },
];

export function getCategory(key: string) {
    return categories.find((category) => category.key === key);
}

export function productAlt(product: Product) {
    return `${product.name} من بيبي أماليا${product.karat ? ` — ذهب عيار ${product.karat}` : ""}`;
}
