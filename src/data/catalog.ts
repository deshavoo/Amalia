/**
 * Front-end catalog data.
 * NOTE: product names and prices are placeholders until the real catalog/API is connected.
 */

export type Collection = {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    href: string;
    image?: string;
    alt?: string;
};

export type Product = {
    id: string;
    name: string;
    nameEn: string;
    category: string;
    price: number;
    badge?: string;
    image: string;
    hoverImage: string;
    alt: string;
};

export const collections: Collection[] = [
    {
        id: "rings",
        title: "خواتم",
        titleEn: "Rings",
        description: "بريق يرافق يدكِ في كل لحظة",
        href: "#featured",
        image: "/images/detail-ring-wide.webp",
        alt: "خاتم ذهب مرصع بفصوص لامعة على قماش أخضر من أماليا للمجوهرات",
    },
    {
        id: "necklaces",
        title: "سلاسل",
        titleEn: "Necklaces",
        description: "رقة تحتضن إطلالتك",
        href: "#featured",
        image: "/images/detail-pearl.webp",
        alt: "سلسلة ذهب رفيعة بحبة لؤلؤ من أماليا للمجوهرات",
    },
    {
        id: "bracelets",
        title: "أساور",
        titleEn: "Bracelets",
        description: "تفاصيل صغيرة بحضور كبير",
        href: "#featured",
        image: "/images/detail-bracelet.webp",
        alt: "أسورة ذهب بتصميم زهرة أماليا داخل علبة هدايا خضراء",
    },
    {
        id: "earrings",
        title: "أقراط",
        titleEn: "Earrings",
        description: "لمسة ضوء تكمل ملامحكِ",
        href: "#featured",
    },
    {
        id: "kids-collection",
        title: "مجموعة الأطفال",
        titleEn: "Amalia Baby",
        description: "أولى الهدايا الذهبية للصغار",
        href: "#kids",
        image: "/images/detail-flowers.webp",
        alt: "زهور بيضاء ناعمة بجانب علبة مجوهرات أماليا",
    },
];

export const products: Product[] = [
    {
        id: "eternity-ring",
        name: "خاتم إيترنيتي اللامع",
        nameEn: "Eternity Ring",
        category: "خواتم",
        price: 18500,
        badge: "الأكثر طلبًا",
        image: "/images/detail-ring.webp",
        hoverImage: "/images/detail-ring-wide.webp",
        alt: "خاتم إيترنيتي ذهبي مرصع بفصوص لامعة",
    },
    {
        id: "pearl-necklace",
        name: "سلسلة لؤلؤة أماليا",
        nameEn: "Amalia Pearl Necklace",
        category: "سلاسل",
        price: 12900,
        badge: "جديد",
        image: "/images/detail-pearl.webp",
        hoverImage: "/images/detail-chain.webp",
        alt: "سلسلة ذهب رفيعة تتوسطها حبة لؤلؤ بين كرتين ذهبيتين",
    },
    {
        id: "amalia-flower-bracelet",
        name: "أسورة زهرة أماليا",
        nameEn: "Amalia Flower Bracelet",
        category: "أساور",
        price: 15750,
        badge: "تصميم حصري",
        image: "/images/detail-bracelet.webp",
        hoverImage: "/images/detail-box-lid.webp",
        alt: "أسورة ذهب بتعليقة على شكل أيقونة أماليا وفصوص صغيرة",
    },
    {
        id: "fine-chain",
        name: "سلسلة الانسيابية الناعمة",
        nameEn: "Fluid Fine Chain",
        category: "سلاسل",
        price: 9800,
        image: "/images/detail-chain.webp",
        hoverImage: "/images/campaign-necklace.webp",
        alt: "سلسلة ذهب ناعمة معلقة على قطعة جلد خضراء",
    },
];

export const storyChapters = [
    {
        id: "legacy",
        eyebrow: "البداية",
        title: "من أماليا بيبي إلى أماليا للمجوهرات",
        body: "بدأنا بذهب الأطفال وأولى هداياهم، واليوم نكبر معكِ لنقدم الذهب والمجوهرات للكبار والصغار، مع الحفاظ على الرقة والألفة التي عرفتِنا بها.",
        image: "/images/campaign-satin.webp",
        alt: "شعار أماليا للمجوهرات الذهبي على قماش ساتان أخضر",
    },
    {
        id: "craft",
        eyebrow: "الحِرفة",
        title: "ذهب يُصاغ بإتقان",
        body: "الفخامة عندنا تُبنى بهدوء: جودة الخطوط، وتوازن التفاصيل، وتشطيب مدروس يجعل كل قطعة رفيقة يومية تدوم لسنوات.",
        image: "/images/campaign-ring.webp",
        alt: "خاتم ذهب مرصع على سطح أخضر منحني بإضاءة دافئة",
    },
    {
        id: "emblem",
        eyebrow: "الأيقونة",
        title: "زهرة مستوحاة من حرف A",
        body: "أيقونتنا وُلدت من تفاصيل حرف A في اسم أماليا، تتكرر في تناغم يشبه زهرة أو ندفة ضوء — رمز للتوازن والدفء والأناقة.",
        image: "/images/detail-satin-emblem.webp",
        alt: "أيقونة أماليا الذهبية البارزة على قماش أخضر",
    },
    {
        id: "gift",
        eyebrow: "الهدية",
        title: "لحظة تُهدى وتبقى",
        body: "من علبة خضراء بلمسات ذهبية إلى شريط يحمل اسمنا، نغلف كل قطعة كأنها ذكرى، لتصل إلى من تحبين بالأناقة التي تستحقها.",
        image: "/images/campaign-box.webp",
        alt: "علبة مجوهرات أماليا الخضراء مفتوحة وبداخلها أسورة ذهبية",
    },
];

export const lookbook = [
    {
        image: "/images/campaign-ring.webp",
        title: "بريق الخواتم",
        caption: "Rings Edit",
        alt: "حملة أماليا للمجوهرات — خاتم ذهب مرصع",
    },
    {
        image: "/images/campaign-necklace.webp",
        title: "لؤلؤة الأمسيات",
        caption: "Pearl Story",
        alt: "حملة أماليا للمجوهرات — سلسلة ذهب بلؤلؤة",
    },
    {
        image: "/images/campaign-box.webp",
        title: "فن الإهداء",
        caption: "Gifting",
        alt: "علبة هدايا أماليا الخضراء مع أسورة ذهبية",
    },
    {
        image: "/images/campaign-ribbon.webp",
        title: "توقيعنا الذهبي",
        caption: "Signature",
        alt: "شرائط ساتان خضراء مطبوع عليها شعار أماليا بالذهبي",
    },
    {
        image: "/images/campaign-satin.webp",
        title: "أناقة في كل لمسة",
        caption: "Elegance",
        alt: "شعار أماليا للمجوهرات على ساتان أخضر",
    },
];
