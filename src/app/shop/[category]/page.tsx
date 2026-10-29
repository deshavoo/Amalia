import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ShopView from "@/components/shop/ShopView";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
    return categories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
    const category = getCategory((await params).category);
    if (!category) return {};

    const path = `/shop/${category.key}`;

    return {
        title: category.seoTitle,
        description: category.description,
        alternates: { canonical: path },
        openGraph: {
            url: path,
            title: category.seoTitle,
            description: category.description,
            images: category.image ? [{ url: category.image, alt: category.alt }] : undefined,
        },
    };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
    const category = getCategory((await params).category);
    if (!category) notFound();

    return (
        <ShopView
            active={category.key}
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
