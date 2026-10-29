"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import ProductCard from "@/components/sections/ProductCard";
import { categories, type Product } from "@/data/taxonomy";

// Folds hamza/taa-marbuta/alef-maqsura variants so "اسوارة" matches "إسواره".
function normalize(value: string) {
    return value
        .toLowerCase()
        .replace(/[ً-ْ]/g, "")
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .trim();
}

export default function SearchResults({ products }: { products: Product[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");

    const index = useMemo(
        () =>
            products.map((product) => ({
                product,
                text: normalize(
                    [product.name, product.code, product.story, categories.find((c) => c.key === product.category)?.title]
                        .filter(Boolean)
                        .join(" ")
                ),
            })),
        [products]
    );

    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const results = terms.length ? index.filter(({ text }) => terms.every((term) => text.includes(term))) : [];

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} role="search" className="flex items-center gap-3 border-b border-forest/30 pb-3">
                <Search size={21} className="shrink-0 text-gold" aria-hidden="true" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="ابحثي عن أقراط، سلسال الفراشة، أو رمز القطعة..."
                    aria-label="اكتبي اسم المنتج"
                    className="min-w-0 flex-1 bg-transparent py-2 text-base text-forest outline-none placeholder:text-forest/45"
                />
            </form>

            <p aria-live="polite" className="mt-6 mb-10 text-sm text-forest/60">
                {terms.length ? `${results.length} نتيجة` : "اكتبي كلمة للبحث بين قطعنا."}
            </p>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
                {results.map(({ product }) => (
                    <li key={product.id}>
                        <ProductCard product={product} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
