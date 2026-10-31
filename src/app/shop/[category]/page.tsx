import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ShopView from "@/components/shop/ShopView";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
    return categories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
    const category = getCategory((await params).category);
    if (!category) return {};

    return pageMetadata({
        title: category.seoTitle,
        description: category.description,
        path: `/shop/${category.key}`,
        image: category.image ? { url: category.image, alt: category.alt } : undefined,
    });
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
    const category = getCategory((await params).category);
    if (!category) notFound();

    return (
        <ShopView
            active={category.key}
            image={category.image ? { src: category.image, alt: category.alt ?? category.title } : undefined}
            eyebrow={category.titleEn}
            title={category.seoTitle}
            description={category.description}
            breadcrumbs={[
                { label: "المتجر", href: "/shop" },
                { label: category.title, href: `/shop/${category.key}` },
            ]}
            products={getProductsByCategory(category.key)}
        />
    );
}
