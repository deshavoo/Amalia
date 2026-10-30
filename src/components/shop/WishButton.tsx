"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/cn";

/** Favourite toggle — the only interactive island inside a niche card. */
export default function WishButton({ name }: { name: string }) {
    const [wished, setWished] = useState(false);

    return (
        <button
            type="button"
            onClick={() => setWished((value) => !value)}
            aria-pressed={wished}
            aria-label={wished ? `إزالة ${name} من المفضلة` : `إضافة ${name} إلى المفضلة`}
            className="amalia-niche-action relative"
        >
            <Heart size={16} strokeWidth={1.5} className={cn("transition-colors duration-300", wished && "fill-current")} />
            <span aria-hidden="true" className="amalia-wish-burst" />
        </button>
    );
}
