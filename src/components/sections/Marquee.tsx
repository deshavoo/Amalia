import Emblem from "@/components/brand/Emblem";

const items = [
    "ذهب للكبار والصغار",
    "Elegance in every touch",
    "تغليف هدايا فاخر",
    "شهادة ضمان مع كل قطعة",
    "تصاميم مستوحاة من أيقونة أماليا",
    "Amalia Jewellery",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
    return (
        <ul
            aria-hidden={hidden || undefined}
            className="amalia-marquee-group"
        >
            {items.map((item) => (
                <li key={item} className="flex shrink-0 items-center gap-10">
                    <span
                        dir="auto"
                        className={
                            /[a-z]/i.test(item)
                                ? "font-display text-2xl italic tracking-wide sm:text-3xl"
                                : "text-lg sm:text-xl"
                        }
                    >
                        {item}
                    </span>
                    <Emblem className="size-5 shrink-0" />
                </li>
            ))}
        </ul>
    );
}

export default function Marquee() {
    return (
        <section
            aria-label="مميزات أماليا"
            className="amalia-marquee relative overflow-hidden border-y border-gold/25 bg-forest py-6 text-ivory"
        >
            <div dir="ltr" className="amalia-marquee-track">
                <MarqueeGroup />
                <MarqueeGroup hidden />
            </div>
        </section>
    );
}
