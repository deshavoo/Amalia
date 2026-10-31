/**
 * Home page editorial content (collections bento, story chapters, lookbook).
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

export const collections: Collection[] = [
    {
        id: "necklaces",
        title: "قلائد",
        titleEn: "Necklaces",
        description: "رقة تحتضن إطلالة أميرتك الصغيرة",
        href: "/shop/necklaces",
        image: "/images/kids-necklace.webp",
        alt: "طفلة بفستان وردي ترتدي سلسال ذهب رقيق من بيبي أماليا",
    },
    {
        id: "earrings",
        title: "أقراط",
        titleEn: "Earrings",
        description: "آمنة ومريحة للأذن الصغيرة",
        href: "/shop/earrings",
        image: "/images/kids-earrings.webp",
        alt: "طفلة ترتدي قرطًا ذهبيًا ناعمًا من بيبي أماليا",
    },
    {
        id: "bracelets",
        title: "أساور",
        titleEn: "Bracelets",
        description: "تفاصيل صغيرة بحضور كبير",
        href: "/shop/bracelets",
        image: "/images/kids-bracelet.webp",
        alt: "إسوارة ذهب بزهرة الصدف على معصم طفلة",
    },
    {
        id: "newborn",
        title: "أقراط المواليد",
        titleEn: "Birthstone",
        description: "بلون حجر شهر الميلاد",
        href: "/shop/newborn",
    },
    {
        id: "gifts",
        title: "الهدايا",
        titleEn: "Gifting",
        description: "للسبوع وأعياد الميلاد وكل بداية جميلة",
        href: "/#gifts",
        image: "/images/gift-satin-bracelet.webp",
        alt: "إسوارة زهرة الكاميليا الذهبية من بيبي أماليا على ساتان أخضر",
    },
];

export const storyChapters = [
    {
        id: "legacy",
        eyebrow: "البداية",
        title: "أول ذهب في حياة طفلتك",
        body: "بدأت بيبي أماليا بفكرة بسيطة: أن تكون أولى قطع الذهب في حياة طفلتك آمنة بقدر ما هي جميلة، بتصاميم تجمع الأناقة والبراءة وتناسب ذوق الصغار وتطلعات الأمهات.",
        image: "/images/kids-necklace.webp",
        alt: "طفلة مبتسمة ترتدي سلسال ذهب بتعليقة فراشة من بيبي أماليا",
    },
    {
        id: "safety",
        eyebrow: "الأمان",
        title: "مصممة لبشرة الأطفال الحساسة",
        body: "ذهب عيار 18 بخامات عالية الجودة، وحواف ناعمة، وأقراط مريحة للأذن، لتلبسها طفلتك كل يوم براحة تامة.",
        image: "/images/kids-earrings.webp",
        alt: "طفلة ترتدي قرطًا ذهبيًا صغيرًا مريحًا للأذن",
    },
    {
        id: "craft",
        eyebrow: "الحِرفة",
        title: "صناعة أوروبية بإتقان",
        body: "تُصنع مجوهراتنا في أوروبا المعروفة بحرفيتها العريقة، ولأن كل قطعة تُصاغ بعناية فقد يختلف وزنها أو صياغتها قليلًا — فكل قطعة فريدة.",
        image: "/images/kids-bracelet.webp",
        alt: "إسوارة ذهب بزهرة الصدف على معصم طفلة",
    },
    {
        id: "gift",
        eyebrow: "الهدية",
        title: "ذكرى تكبر معها",
        body: "للسبوع وأعياد الميلاد والمناسبات الخاصة؛ قطعة صغيرة تحمل حبًا كبيرًا، وتبقى ذكرى لا تُنسى.",
        image: "/images/gift-satin-necklace.webp",
        alt: "سلسال الفراشة الذهبي من بيبي أماليا تحت ضوء دافئ على ساتان أخضر",
    },
];

export const lookbook = [
    {
        image: "/images/kids-necklace.webp",
        title: "إطلالة الأميرة",
        caption: "Little Princess",
        alt: "طفلة بفستان وردي مطرز ترتدي سلسال ذهب من بيبي أماليا",
    },
    {
        image: "/images/kids-earrings.webp",
        title: "لمعة ناعمة",
        caption: "Soft Shine",
        alt: "طفلة ترتدي قرطًا ذهبيًا من بيبي أماليا",
    },
    {
        image: "/images/kids-bracelet.webp",
        title: "زهرة على المعصم",
        caption: "Petite Bloom",
        alt: "طفلة ترتدي إسوارة ذهب بزهرة الصدف",
    },
    {
        image: "/images/gift-satin-earrings.webp",
        title: "فن الإهداء",
        caption: "Gifting",
        alt: "أقراط الفيونكة الذهبية من بيبي أماليا على ساتان أخضر",
    },
    {
        image: "/images/detail-flowers.webp",
        title: "لمسة رقيقة",
        caption: "Soft Touch",
        alt: "زهور بيضاء ناعمة بجانب شريط ساتان أخضر بأيقونة أماليا الذهبية",
    },
];
