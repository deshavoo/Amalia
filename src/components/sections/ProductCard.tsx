"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check, Heart, ShoppingBag } from "lucide-react";

import type { Product } from "@/data/catalog";
import { cn, formatPrice } from "@/lib/cn";

const MAX_TILT = 8;

export default function ProductCard({ product }: { product: Product }) {
    const ref = useRef<HTMLElement>(null);
    const [wished, setWished] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!added) return;
        const timer = window.setTimeout(() => setAdded(false), 1800);
        return () => window.clearTimeout(timer);
    }, [added]);

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
            className="amalia-product group"
        >
            <div className="amalia-product-media relative aspect-4/5 overflow-hidden rounded-[1.25rem] bg-forest-deep">
                <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="amalia-product-img object-cover"
                />
                <Image
                    src={product.hoverImage}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="amalia-product-img-alt object-cover"
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

                {product.badge && (
                    <span className="absolute top-5 right-5 z-10 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-medium text-forest backdrop-blur">
                        {product.badge}
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

                <button
                    type="button"
                    onClick={() => setAdded(true)}
                    className="amalia-quick-add absolute inset-x-4 bottom-4 z-10 flex h-12 items-center justify-center gap-2 rounded-full bg-forest/90 text-sm text-ivory backdrop-blur transition-colors hover:bg-forest"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={added ? "added" : "add"}
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -12, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="inline-flex items-center gap-2"
                        >
                            {added ? (
                                <>
                                    <Check size={16} className="text-gold" />
                                    تمت الإضافة إلى الحقيبة
                                </>
                            ) : (
                                <>
                                    <ShoppingBag size={16} strokeWidth={1.5} />
                                    أضيفي إلى الحقيبة
                                </>
                            )}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                    <p className="text-xs tracking-wide text-gold-deep">
                        {product.category}
                    </p>
                    <h3 className="mt-1.5 text-lg font-medium text-forest">
                        {product.name}
                    </h3>
                    <p
                        lang="en"
                        className="mt-0.5 font-display text-base text-forest/50 italic"
                    >
                        {product.nameEn}
                    </p>
                </div>

                <p className="shrink-0 pt-5 text-base font-medium text-forest">
                    {formatPrice(product.price)}
                </p>
            </div>
        </article>
    );
}
