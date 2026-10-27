import type { SVGProps } from "react";

import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./paths";

export default function Wordmark(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox={WORDMARK_VIEWBOX}
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" />
        </svg>
    );
}
