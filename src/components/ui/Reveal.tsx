"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    as?: "div" | "li" | "article" | "header";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
    children,
    className,
    delay = 0,
    y = 32,
    as = "div",
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion();
    const Component = motion[as];

    return (
        <Component
            className={className}
            initial={
                shouldReduceMotion
                    ? false
                    : { opacity: 0, y, filter: "blur(6px)" }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </Component>
    );
}
