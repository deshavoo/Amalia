"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import NicheCard from "@/components/shop/NicheCard";
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
            <form onSubmit={handleSubmit} role="search" className="mx-auto flex max-w-2xl items-center gap-3 border-b border-ivory/25 pb-3">
                <Search size={21} className="shrink-0 text-gold" aria-hidden="true" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="ابحثي عن أقراط، سلسال الفراشة، أو رمز القطعة..."
                    aria-label="اكتبي اسم المنتج"
                    className="min-w-0 flex-1 bg-transparent py-2 text-base text-ivory outline-none placeholder:text-ivory/40"
                />
            </form>

            <p aria-live="polite" className="mt-6 mb-12 text-center text-sm text-ivory/60">
                {terms.length ? `${results.length} نتيجة` : "اكتبي كلمة للبحث بين قطعنا."}
            </p>

            {terms.length > 0 && results.length === 0 && (
                <div className="mx-auto max-w-md text-center">
                    <p className="text-lg text-ivory">لم نجد قطعة بهذا الاسم.</p>
                    <p className="mt-2 text-sm leading-7 text-ivory/60">
                        جربي كلمة أبسط مثل «فراشة» أو «قلب»، أو تجولي في الأقسام:
                    </p>
                    <ul className="mt-6 flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <li key={category.key}>
                                <Link
                                    href={`/shop/${category.key}`}
                                    className="inline-flex h-11 items-center rounded-full border border-ivory/20 px-5 text-sm text-ivory/80 transition-colors hover:border-gold hover:text-gold-light"
                                >
                                    {category.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ul className="grid grid-cols-2 gap-x-5 gap-y-14 pt-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-12 xl:grid-cols-4">
                {results.map(({ product }) => (
                    <li key={product.id}>
                        <NicheCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
