"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type MagneticLinkProps = {
    href: string;
    children: ReactNode;
    variant?: "gold" | "ghost" | "forest";
    className?: string;
};

/**
 * Button-style link that is gently pulled toward the cursor and carries a
 * light sweep on hover. Pointer math writes CSS variables, so it never re-renders.
 */
export default function MagneticLink({
    href,
    children,
    variant = "gold",
    className,
}: MagneticLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
        if (event.pointerType !== "mouse" || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        ref.current.style.setProperty("--tx", `${x * 0.22}px`);
        ref.current.style.setProperty("--ty", `${y * 0.35}px`);
    }

    function handlePointerLeave() {
        ref.current?.style.setProperty("--tx", "0px");
        ref.current?.style.setProperty("--ty", "0px");
    }

    return (
        <Link
            ref={ref}
            href={href}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={cn("amalia-btn", `amalia-btn--${variant}`, className)}
        >
            <span className="relative z-10 inline-flex items-center gap-3">
                {children}
            </span>
        </Link>
    );
}
