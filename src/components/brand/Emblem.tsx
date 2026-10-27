import { useId, type SVGProps } from "react";

import { EMBLEM_PATH, EMBLEM_VIEWBOX } from "./paths";

type EmblemProps = SVGProps<SVGSVGElement> & {
    /** "gold" renders the brand gradient, "current" inherits text color. */
    tone?: "gold" | "current";
};

export default function Emblem({ tone = "gold", ...props }: EmblemProps) {
    const gradientId = useId();

    return (
        <svg
            viewBox={EMBLEM_VIEWBOX}
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            {tone === "gold" && (
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="1"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0" stopColor="#a7834f" />
                        <stop offset="0.55" stopColor="#c6a575" />
                        <stop offset="1" stopColor="#ecd8a8" />
                    </linearGradient>
                </defs>
            )}

            <path
                d={EMBLEM_PATH}
                fill={tone === "gold" ? `url(#${gradientId})` : "currentColor"}
                fillRule="evenodd"
            />
        </svg>
    );
}
