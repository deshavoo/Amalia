"use client";

import { useRef } from "react";
import Image from "next/image";

import { productAlt, type Product } from "@/data/taxonomy";

/**
 * The product shown in a single, permanently lit niche with a cursor-following
 * zoom; pointer math writes CSS variables only.
 */
export default function ProductGallery({ product }: { product: Product }) {
    const ref = useRef<HTMLDivElement>(null);

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (event.pointerType !== "mouse" || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        ref.current.style.setProperty("--zx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        ref.current.style.setProperty("--zy", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }

    return (
        <div className="amalia-niche pb-10 [content-visibility:visible]" data-lit="true">
            <div
                ref={ref}
                onPointerMove={handlePointerMove}
                className="amalia-niche-alcove amalia-niche-alcove--raised amalia-zoom aspect-4/5 cursor-zoom-in"
            >
                {product.cutout ? (
                    <div className="amalia-niche-piece">
                        <div className="amalia-niche-bob relative size-full">
                            <Image
                                src={product.cutout}
                                alt={productAlt(product)}
                                fill
                                preload
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="object-contain"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="amalia-niche-card">
                        <Image
                            src={product.image}
                            alt={productAlt(product)}
                            fill
                            preload
                            sizes="(min-width: 1024px) 45vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
