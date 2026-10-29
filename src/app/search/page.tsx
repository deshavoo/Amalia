import { Suspense } from "react";
import type { Metadata } from "next";

import SearchResults from "@/components/shop/SearchResults";
import PageHeader from "@/components/ui/PageHeader";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
    title: "البحث",
    robots: { index: false, follow: true },
};

export default function SearchPage() {
    return (
        <main id="main-content">
            <PageHeader
                eyebrow="البحث"
                title="ابحثي عن قطعتك المفضلة"
                breadcrumbs={[{ label: "البحث", href: "/search" }]}
            />

            <section aria-label="نتائج البحث" className="bg-ivory py-14 sm:py-20">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
                    <Suspense>
                        <SearchResults products={products} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}
