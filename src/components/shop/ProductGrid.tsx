import ProductCard from "@/components/sections/ProductCard";
import Reveal from "@/components/ui/Reveal";
import type { Product } from "@/data/catalog";

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
                <Reveal key={product.id} as="li" delay={(index % 4) * 0.08}>
                    <ProductCard
                        product={product}
                        priority={index < 4}
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    />
                </Reveal>
            ))}
        </ul>
    );
}
