import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { JsonLdScript } from "@/components/JsonLd";
import { cn } from "@/lib/cn";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
    items: Crumb[];
    tone?: "light" | "dark";
    className?: string;
};

/** Visible trail + BreadcrumbList structured data. "الرئيسية" is prepended automatically. */
export default function Breadcrumbs({ items, tone = "light", className }: BreadcrumbsProps) {
    const trail = [{ label: "الرئيسية", href: "/" }, ...items];

    return (
        <nav aria-label="مسار التنقل" className={className}>
            <ol
                className={cn(
                    "flex flex-wrap items-center gap-1.5 text-xs",
                    tone === "dark" ? "text-ivory/60" : "text-forest/70"
                )}
            >
                {trail.map((crumb, index) => {
                    const isLast = index === trail.length - 1;

                    return (
                        <li key={crumb.href} className="inline-flex items-center gap-1.5">
                            {isLast ? (
                                <span aria-current="page" className={tone === "dark" ? "text-gold-light" : "text-gold-ink"}>
                                    {crumb.label}
                                </span>
                            ) : (
                                <>
                                    <Link href={crumb.href} className="transition-colors hover:text-gold">
                                        {crumb.label}
                                    </Link>
                                    <ChevronLeft size={13} aria-hidden="true" className="opacity-60" />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>

            <JsonLdScript
                data={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: trail.map((crumb, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: crumb.label,
                        item: absoluteUrl(crumb.href),
                    })),
                }}
            />
        </nav>
    );
}
