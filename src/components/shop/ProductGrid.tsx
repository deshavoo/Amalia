import NicheCard from "@/components/shop/NicheCard";
import Reveal from "@/components/ui/Reveal";
import type { Product } from "@/data/catalog";

/** Products as a wall of boutique niches. Place inside an `.amalia-wall` section. */
export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-14 pt-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-12 xl:grid-cols-4">
            {products.map((product, index) => (
                <Reveal key={product.id} as="li" delay={(index % 4) * 0.08}>
                    <NicheCard product={product} priority={index < 4} />
                </Reveal>
            ))}
        </ul>
    );
}
