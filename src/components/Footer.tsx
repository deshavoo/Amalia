import Link from "next/link";

import Emblem from "@/components/brand/Emblem";
import Wordmark from "@/components/brand/Wordmark";
import { siteConfig } from "@/lib/site";

const footerColumns = [
    {
        title: "تسوقي",
        links: [
            { label: "جميع المجوهرات", href: "/#collections" },
            { label: "خواتم", href: "/#rings" },
            { label: "سلاسل", href: "/#necklaces" },
            { label: "أساور", href: "/#bracelets" },
            { label: "أقراط", href: "/#earrings" },
        ],
    },
    {
        title: "أماليا",
        links: [
            { label: "قصتنا", href: "/#about" },
            { label: "مجموعة الأطفال", href: "/#kids" },
            { label: "فن الإهداء", href: "/#gifts" },
            { label: "الأكثر طلبًا", href: "/#featured" },
        ],
    },
    {
        title: "خدمة العملاء",
        links: [
            { label: "الشحن والتوصيل", href: "/shipping" },
            { label: "الاستبدال والاسترجاع", href: "/returns" },
            { label: "العناية بالمجوهرات", href: "/care" },
            { label: "تواصلي معنا", href: "/contact" },
        ],
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="grain relative overflow-hidden bg-forest-deep text-ivory">
            <div className="mx-auto max-w-[1600px] px-4 pt-20 pb-10 sm:px-8 lg:px-12">
                <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
                    <div>
                        <Link
                            href="/"
                            aria-label={`${siteConfig.nameEn} - الصفحة الرئيسية`}
                            className="group inline-flex flex-col items-start gap-5"
                        >
                            <Emblem className="size-12 transition-transform duration-1000 ease-(--ease-luxe) group-hover:rotate-180" />
                            <Wordmark className="h-auto w-64 text-ivory" />
                        </Link>
                        <p
                            lang="en"
                            className="text-gold-gradient mt-3 font-display text-xl italic"
                        >
                            {siteConfig.tagline}
                        </p>
                        <p className="mt-6 max-w-sm leading-8 text-ivory/60">
                            ذهب ومجوهرات للكبار والصغار، بأناقة تجمع بين الفخامة
                            والدفء.
                        </p>
                    </div>

                    <nav
                        aria-label="روابط التذييل"
                        className="grid grid-cols-2 gap-10 sm:grid-cols-3"
                    >
                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h2 className="text-sm font-medium tracking-wide text-gold">
                                    {column.title}
                                </h2>
                                <ul className="mt-5 space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.href + link.label}>
                                            <Link
                                                href={link.href}
                                                className="amalia-footer-link text-sm text-ivory/65"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Oversized wordmark */}
                <div
                    aria-hidden="true"
                    className="amalia-footer-giant mt-20 text-ivory/[0.06]"
                >
                    <Wordmark className="h-auto w-full" />
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row">
                    <p>
                        © {year} {siteConfig.name}. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="amalia-footer-link">
                            سياسة الخصوصية
                        </Link>
                        <Link href="/terms" className="amalia-footer-link">
                            الشروط والأحكام
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
