import { siteConfig } from "@/lib/site";

export default function JsonLd() {
    const url = siteConfig.url;

    const data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "JewelryStore",
                "@id": `${url}/#store`,
                name: siteConfig.nameEn,
                alternateName: [siteConfig.name, "Amalia Baby", "أماليا بيبي"],
                slogan: siteConfig.tagline,
                description: siteConfig.description,
                url,
                logo: `${url}/images/icon-512.png`,
                image: `${url}/opengraph-image.jpg`,
            },
            {
                "@type": "WebSite",
                "@id": `${url}/#website`,
                url,
                name: siteConfig.name,
                inLanguage: "ar",
                publisher: { "@id": `${url}/#store` },
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${url}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
