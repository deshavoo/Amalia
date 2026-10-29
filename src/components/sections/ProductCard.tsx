"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Heart } from "lucide-react";

import { getCategory, productAlt, type Product } from "@/data/taxonomy";
import { cn, formatPrice } from "@/lib/cn";

const MAX_TILT = 8;

type ProductCardProps = {
    product: Product;
    sizes?: string;
    priority?: boolean;
};

export default function ProductCard({
    product,
    sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
    priority = false,
}: ProductCardProps) {
    const ref = useRef<HTMLElement>(null);
    const [wished, setWished] = useState(false);
    const href = `/product/${product.slug}`;
    const category = getCategory(product.category);

    function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
        if (event.pointerType !== "mouse" || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        ref.current.style.setProperty("--rx", `${(0.5 - py) * MAX_TILT}deg`);
        ref.current.style.setProperty("--ry", `${(px - 0.5) * MAX_TILT}deg`);
        ref.current.style.setProperty("--mx", `${px * 100}%`);
        ref.current.style.setProperty("--my", `${py * 100}%`);
    }

    function handlePointerLeave() {
        ref.current?.style.setProperty("--rx", "0deg");
        ref.current?.style.setProperty("--ry", "0deg");
    }

    return (
        <article
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="amalia-product group relative"
        >
            <div className="amalia-product-media relative aspect-square overflow-hidden rounded-[1.25rem] bg-white">
                <Image
                    src={product.image}
                    alt={productAlt(product)}
                    fill
                    sizes={sizes}
                    preload={priority}
                    placeholder="blur"
                    blurDataURL={product.blur}
                    className={cn(
                        "amalia-product-img amalia-product-img--solo object-cover",
                        !product.available && "opacity-60"
                    )}
                />

                <div aria-hidden="true" className="amalia-product-sheen" />
                <div aria-hidden="true" className="amalia-product-glint" />

                {/* Corner brackets */}
                {["top-3 right-3", "top-3 left-3 -scale-x-100", "bottom-3 right-3 -scale-y-100", "bottom-3 left-3 -scale-100"].map(
                    (position) => (
                        <span
                            key={position}
                            aria-hidden="true"
                            className={cn("amalia-bracket", position)}
                        />
                    )
                )}

                {!product.available && (
                    <span className="absolute top-5 right-5 z-10 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-medium text-ivory backdrop-blur">
                        نفدت الكمية
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => setWished((value) => !value)}
                    aria-pressed={wished}
                    aria-label={
                        wished
                            ? `إزالة ${product.name} من المفضلة`
                            : `إضافة ${product.name} إلى المفضلة`
                    }
                    className="amalia-wish absolute top-4 left-4 z-10 grid size-10 place-items-center rounded-full bg-ivory/90 text-forest backdrop-blur transition-transform duration-300 hover:scale-110"
                >
                    <Heart
                        size={18}
                        strokeWidth={1.5}
                        className={cn(
                            "transition-colors duration-300",
                            wished && "fill-gold-deep text-gold-deep"
                        )}
                    />
                    <AnimatePresence>
                        {wished && (
                            <motion.span
                                key="burst"
                                aria-hidden="true"
                                initial={{ scale: 0.4, opacity: 0.9 }}
                                animate={{ scale: 2.2, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-gold"
                            />
                        )}
                    </AnimatePresence>
                </button>

                <Link
                    href={href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="amalia-quick-add absolute inset-x-4 bottom-4 z-10 flex h-12 items-center justify-center gap-2 rounded-full bg-forest/90 text-sm text-ivory backdrop-blur transition-colors hover:bg-forest"
                >
                    {product.available ? "اكتشفي القطعة" : "تفاصيل القطعة"}
                    <ArrowLeft size={16} strokeWidth={1.5} />
                </Link>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                    <p className="text-xs tracking-wide text-gold-deep">
                        {category?.title}
                        {product.karat && ` · عيار ${product.karat}`}
                    </p>
                    <h3 className="mt-1.5 text-lg font-medium text-forest">
                        {/* Stretched link: the whole card opens the product */}
                        <Link
                            href={href}
                            className="outline-none after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:after:ring-2 focus-visible:after:ring-gold"
                        >
                            {product.name}
                        </Link>
                    </h3>
                    <p
                        lang="en"
                        className="mt-0.5 font-display text-base text-forest/50 italic"
                    >
                        {product.code ? `Ref. ${product.code}` : category?.titleEn}
                    </p>
                </div>

                <p className="shrink-0 pt-5 text-base font-medium text-forest">
                    {formatPrice(product.price)}
                </p>
            </div>
        </article>
    );
}
