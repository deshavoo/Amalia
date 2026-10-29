/**
 * Catalog data. Products come from the live Salla store via `node scripts/import-salla.mjs`.
 */
import data from "./products.json";
import { type CategoryKey, type Product } from "./taxonomy";

export * from "./taxonomy";

export const products = data.products as Product[];

export function getProductsByCategory(key: CategoryKey) {
    return key === "newborn"
        ? products.filter((product) => product.collections.includes("newborn"))
        : products.filter((product) => product.category === key);
}

export function getProduct(slug: string) {
    return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
    return products
        .filter((item) => item.category === product.category && item.id !== product.id && item.available)
        .slice(0, limit);
}

const FEATURED_IDS = [
    "1977358123",
    "1427744683",
    "1742803344",
    "611097464",
    "895907754",
    "78032350",
    "1812332290",
    "143435990",
];

export const featuredProducts = FEATURED_IDS.map((id) => products.find((product) => product.id === id)).filter(
    (product): product is Product => Boolean(product)
);
