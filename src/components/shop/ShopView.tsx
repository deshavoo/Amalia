import Link from "next/link";

import { JsonLdScript } from "@/components/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import { categories, type CategoryKey, type Product } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { absoluteUrl } from "@/lib/site";

import ProductGrid from "./ProductGrid";

type ShopViewProps = {
    active?: CategoryKey;
    eyebrow: string;
    title: string;
    description: string;
    breadcrumbs: Crumb[];
    products: Product[];
};

export default function ShopView({ active, eyebrow, title, description, breadcrumbs, products }: ShopViewProps) {
    const tabs = [{ key: undefined, title: "الكل", href: "/shop" }, ...categories.map((c) => ({ key: c.key, title: c.title, href: `/shop/${c.key}` }))];

    return (
        <main id="main-content">
            <PageHeader eyebrow={eyebrow} title={title} description={description} breadcrumbs={breadcrumbs}>
                <nav aria-label="تصنيفات المتجر" className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                    <ul className="flex w-max gap-2">
                        {tabs.map((tab) => {
                            const isActive = tab.key === active;

                            return (
                                <li key={tab.href}>
                                    <Link
                                        href={tab.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "inline-flex h-11 items-center rounded-full border px-5 text-sm transition-colors duration-300",
                                            isActive
                                                ? "border-gold bg-gold text-forest-deep"
                                                : "border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold-light"
                                        )}
                                    >
                                        {tab.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </PageHeader>

            <section aria-label={`منتجات ${title}`} className="bg-ivory py-14 sm:py-20">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
                    <p className="mb-8 text-sm text-forest/60">{products.length} قطعة</p>
                    <ProductGrid products={products} />
                </div>
            </section>

            <JsonLdScript
                data={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: title,
                    description,
                    url: absoluteUrl(breadcrumbs.at(-1)?.href),
                    mainEntity: {
                        "@type": "ItemList",
                        numberOfItems: products.length,
                        itemListElement: products.map((product, index) => ({
                            "@type": "ListItem",
                            position: index + 1,
                            url: absoluteUrl(`/product/${product.slug}`),
                            name: product.name,
                        })),
                    },
                }}
            />
        </main>
    );
}
