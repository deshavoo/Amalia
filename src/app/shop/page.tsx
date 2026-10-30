import ShopView from "@/components/shop/ShopView";
import { products } from "@/data/catalog";
import { pageMetadata } from "@/lib/seo";

const title = "جميع مجوهرات الأطفال";
const description =
    "تسوقي مجوهرات ذهب عيار 18 للأطفال والمواليد: أقراط، سلاسل وأساور آمنة على البشرة الحساسة، مع شحن لجميع مناطق المملكة.";

export const metadata = pageMetadata({ title: "المتجر — مجوهرات ذهب للأطفال", description, path: "/shop" });

export default function ShopPage() {
    return (
        <ShopView
            eyebrow="المتجر"
            title={title}
            description={description}
            breadcrumbs={[{ label: "المتجر", href: "/shop" }]}
            products={products}
        />
    );
}
