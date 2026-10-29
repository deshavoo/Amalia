import { cn } from "@/lib/cn";

/**
 * "Baby Amalia" logotype. The official artwork is used as a CSS mask,
 * so it takes `currentColor` just like the SVG marks.
 */
export default function BabyWordmark({ className }: { className?: string }) {
    return <span aria-hidden="true" className={cn("amalia-baby-wordmark", className)} />;
}
