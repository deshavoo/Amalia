import { cn } from "@/lib/cn";

import Reveal from "./Reveal";

type SectionHeadingProps = {
    id?: string;
    eyebrow: string;
    title: string;
    description?: string;
    align?: "start" | "center";
    tone?: "light" | "dark";
    className?: string;
};

export default function SectionHeading({
    id,
    eyebrow,
    title,
    description,
    align = "start",
    tone = "light",
    className,
}: SectionHeadingProps) {
    const isCenter = align === "center";

    return (
        <Reveal
            as="header"
            className={cn(
                "max-w-2xl",
                isCenter && "mx-auto text-center",
                className
            )}
        >
            <p
                className={cn(
                    "amalia-eyebrow",
                    isCenter && "justify-center"
                )}
            >
                {eyebrow}
            </p>

            <h2
                id={id}
                className={cn(
                    "mt-4 text-3xl leading-[1.35] font-medium text-balance sm:text-4xl lg:text-5xl",
                    tone === "dark" ? "text-ivory" : "text-forest"
                )}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={cn(
                        "mt-5 text-base leading-8 text-pretty sm:text-lg",
                        tone === "dark" ? "text-ivory/70" : "text-forest/70"
                    )}
                >
                    {description}
                </p>
            )}
        </Reveal>
    );
}
