import { MessageCircle } from "lucide-react";

import { formatPrice } from "@/lib/cn";

type StickyBuyBarProps = {
    name: string;
    price: number;
    available: boolean;
    orderUrl: string;
    whatsappUrl: string;
};

/** Phones only: keeps the price and the order button in reach while reading the product details. */
export default function StickyBuyBar({ name, price, available, orderUrl, whatsappUrl }: StickyBuyBarProps) {
    return (
        <div className="amalia-buybar fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-forest-deep/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-ivory shadow-[0_-12px_30px_-12px_rgb(0_0_0/50%)] lg:hidden">
            <div className="mx-auto flex max-w-xl items-center gap-3">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ivory/75">{name}</p>
                    <p className="text-base font-medium text-gold-light tabular-nums">{formatPrice(price)}</p>
                </div>

                <a
                    href={whatsappUrl}
                    aria-label={`اطلبي ${name} عبر واتساب`}
                    className="amalia-niche-action shrink-0"
                >
                    <MessageCircle size={18} strokeWidth={1.5} />
                </a>

                <a
                    href={orderUrl}
                    className="inline-flex h-11 shrink-0 items-center rounded-full bg-gold px-6 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-light"
                >
                    {available ? "اطلبي الآن" : "أعلميني عند التوفر"}
                </a>
            </div>
        </div>
    );
}
