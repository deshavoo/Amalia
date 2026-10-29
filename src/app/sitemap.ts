import type { MetadataRoute } from "next";

import { categories, products } from "@/data/catalog";
import data from "@/data/products.json";
import { contentPages } from "@/data/pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date(data.importedAt);

    return [
        {
            url: absoluteUrl("/"),
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
            images: [absoluteUrl("/opengraph-image.jpg")],
        },
        {
            url: absoluteUrl("/shop"),
            lastModified,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...categories.map((category) => ({
            url: absoluteUrl(`/shop/${category.key}`),
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
            images: category.image ? [absoluteUrl(category.image)] : undefined,
        })),
        ...products.map((product) => ({
            url: absoluteUrl(`/product/${product.slug}`),
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.7,
            images: [absoluteUrl(product.image)],
        })),
        { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.4 },
        ...contentPages.map((page) => ({
            url: absoluteUrl(`/${page.slug}`),
            lastModified,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        })),
    ];
}
