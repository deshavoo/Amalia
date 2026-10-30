import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Stagger, in the same 0–0.5 scale the old JS version used; shifts the reveal along the scroll. */
    delay?: number;
    y?: number;
    as?: "div" | "li" | "article" | "header";
};

/**
 * Fades content up as it scrolls into view. Pure CSS (scroll-driven animation, see
 * `.amalia-reveal`), so it costs no JavaScript, runs on the compositor and never
 * hides server-rendered content while the page hydrates. Browsers without
 * scroll-timeline support simply show the content.
 */
export default function Reveal({ children, className, delay = 0, y = 32, as: Component = "div" }: RevealProps) {
    return (
        <Component
            className={cn("amalia-reveal", className)}
            style={{ "--reveal-delay": delay, "--reveal-y": `${y}px` } as CSSProperties}
        >
            {children}
        </Component>
    );
}
