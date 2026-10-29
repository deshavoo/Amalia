"use client";

import { useRef } from "react";
import Image from "next/image";

import { productAlt, type Product } from "@/data/taxonomy";

/** Main product photo with a cursor-following zoom; pointer math writes CSS variables only. */
export default function ProductGallery({ product }: { product: Product }) {
    const ref = useRef<HTMLDivElement>(null);

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (event.pointerType !== "mouse" || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        ref.current.style.setProperty("--zx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        ref.current.style.setProperty("--zy", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }

    return (
        <div
            ref={ref}
            onPointerMove={handlePointerMove}
            className="amalia-zoom relative aspect-square cursor-zoom-in overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_80px_-40px_rgb(17_49_44/45%)]"
        >
            <Image
                src={product.image}
                alt={productAlt(product)}
                fill
                preload
                placeholder="blur"
                blurDataURL={product.blur}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
            />

            {["top-4 right-4", "top-4 left-4 -scale-x-100", "bottom-4 right-4 -scale-y-100", "bottom-4 left-4 -scale-100"].map(
                (position) => (
                    <span key={position} aria-hidden="true" className={`amalia-bracket ${position} size-8 opacity-100`} />
                )
            )}
        </div>
    );
}
