import { ArrowLeft } from "lucide-react";

import MagneticLink from "@/components/ui/MagneticLink";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProducts } from "@/data/catalog";

import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
    return (
        <section
            id="featured"
            aria-labelledby="featured-title"
            className="bg-ivory py-24 sm:py-32"
        >
            <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        id="featured-title"
                        eyebrow="الأكثر طلبًا"
                        title="قطع اختارتها قلوبكم"
                        description="قطع ذهب عيار 18 تجمع البراءة والفخامة، اختارتها الأمهات لأميراتهن الصغيرات."
                    />

                    <Reveal delay={0.15} className="shrink-0">
                        <MagneticLink href="/shop" variant="forest">
                            عرض كل المجوهرات
                            <ArrowLeft size={18} strokeWidth={1.5} />
                        </MagneticLink>
                    </Reveal>
                </div>

                <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
                    {featuredProducts.map((product, index) => (
                        <Reveal key={product.id} as="li" delay={(index % 4) * 0.1}>
                            <ProductCard product={product} />
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
