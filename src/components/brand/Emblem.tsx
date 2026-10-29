import { cn } from "@/lib/cn";

type EmblemProps = {
    /** "gold" renders the brand gradient, "current" inherits text color. */
    tone?: "gold" | "current";
    className?: string;
};

/**
 * The Amalia flower. The traced path is ~26KB, so it lives once in
 * /brand/emblem.svg (cached) and is painted through a CSS mask instead of
 * being inlined into every page's HTML.
 */
export default function Emblem({ tone = "gold", className }: EmblemProps) {
    return (
        <span
            aria-hidden="true"
            className={cn("amalia-emblem", tone === "gold" && "amalia-emblem--gold", className)}
        />
    );
}
