/**
 * Imports the live Baby Amalia catalog from the Salla storefront API.
 *
 *   node scripts/import-salla.mjs
 *
 * - Products + categories  -> src/data/products.json
 * - Product photos         -> public/products/<id>.webp (largest version found on the product page)
 * - Campaign art + logo    -> public/images/, public/brand/
 *
 * Safe to re-run whenever the store changes; existing images are skipped.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const STORE_ID = "412859855";
const STORE_URL = "https://babyamalia.com";
const API = "https://api.salla.dev/store/v1";
const ROOT = path.resolve(import.meta.dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public/products");
const HEADERS = {
    "Store-Identifier": STORE_ID,
    "Accept-Language": "ar",
    currency: "SAR",
    "User-Agent": "Mozilla/5.0",
};

const CATEGORY_KEYS = {
    "أقراط": "earrings",
    "قلائد": "necklaces",
    "أساور": "bracelets",
};

const CAMPAIGN_ASSETS = [
    ["form-builder/3B9Gy0Yltzt94l5pEj6jAfl2RK9prbogIjSeg6mn.png", "images/kids-necklace.webp"],
    ["form-builder/9JcNCs0gbNrbGGhSuBtLKB7RgnbyOq14ralNixsx.png", "images/kids-earrings.webp"],
    ["form-builder/YfKZ8pdrlTipwN3aoI1VwI4sVoyPfpqYKvg2nf61.png", "images/kids-bracelet.webp"],
    ["RAXdwD/OA9wBxXCDWEHgBTBGyMaPbbcJygbMjuQqzkwjiVk.jpg", "images/category-earrings.webp"],
    ["RAXdwD/MBBM5fOwdZVsuIqJ6WuMZK6NaA0547GZ9NumdXPh.png", "images/category-necklaces.webp"],
];
const WORDMARK = ["RAXdwD/Ya496032YQe9W2eB18Ty5oZWOBmnbO32vO3hu378.png", "brand/baby-amalia-wordmark.webp"];

async function getJson(url) {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
}

async function getBuffer(url) {
    const response = await fetch(url, { headers: { "User-Agent": HEADERS["User-Agent"] } });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return Buffer.from(await response.arrayBuffer());
}

async function fetchAllProducts() {
    const products = [];
    let url = `${API}/products?per_page=100`;

    while (url) {
        const page = await getJson(url);
        products.push(...page.data);
        url = page.cursor?.next ?? null;
    }

    return products;
}

/** Salla serves a 1000px copy on the product page; the API only exposes 500px. */
async function findLargestImage(product) {
    try {
        const response = await fetch(product.url, { headers: { "User-Agent": HEADERS["User-Agent"] } });
        const html = await response.text();
        const candidates = [...html.matchAll(/https:\/\/cdn\.salla\.sa\/RAXdwD\/[^"' )]+-(\d+)x[\d.]+-[^"' )]+\.(?:png|jpe?g|webp)/g)]
            .filter((match) => !match[0].includes("cdn-cgi"))
            .sort((a, b) => Number(b[1]) - Number(a[1]));

        if (candidates.length) return candidates[0][0];
    } catch {
        // Fall back to the API image below.
    }

    return product.image?.url;
}

const clean = (value) => value.replace(/[ً-ْ]/g, "").replace(/\s+/g, " ").trim();

function slugify(name, key) {
    const base = clean(name)
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/\s+/g, "-");

    return `${base}-${key}`;
}

/** Pulls code / karat / weight / care out of Salla's free-text description. */
function parseDescription(raw, name) {
    const text = clean(raw.replace(/\*/g, " "));
    const pick = (pattern) => text.match(pattern)?.[1]?.trim();

    const code = pick(/(?:رمز المنتج|كود المنتج|الكود|كود)\s*:?\s*([A-Z0-9][A-Z0-9-]*)/i);
    const karat = pick(/عيار الذهب\s*:?\s*(?:عيار)?\s*(\d{2})/);
    const weight = pick(/الوزن\s*:?\s*(\d+(?:\.\d+)?)/);
    const care = pick(/(?:تعليمات العناية|التعليمات)\s*:?\s*(.+)$/);

    let story = text.split(/(?:رمز المنتج|كود المنتج|الكود|كود|عيار الذهب|الوزن|تعليمات العناية|التعليمات)\s*:?/)[0].trim();
    const cleanName = clean(name);
    if (story.startsWith(cleanName)) story = story.slice(cleanName.length).trim();

    return {
        code,
        karat: karat ? Number(karat) : undefined,
        weight: weight ? Number(weight) : undefined,
        story: story.length > 12 ? story : undefined,
        care,
    };
}

async function saveImage(url, file, width) {
    const target = path.join(ROOT, "public", file);
    if (existsSync(target)) return sharp(target).metadata();

    await mkdir(path.dirname(target), { recursive: true });
    const input = await getBuffer(url);
    const pipeline = sharp(input).resize({ width, withoutEnlargement: true });

    if (file.endsWith(".png")) await pipeline.png({ compressionLevel: 9 }).toFile(target);
    else await pipeline.webp({ quality: 82 }).toFile(target);

    return sharp(target).metadata();
}

async function blurDataUrl(file) {
    const buffer = await sharp(path.join(ROOT, "public", file)).resize(12).webp({ quality: 40 }).toBuffer();
    return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function mapLimit(items, limit, fn) {
    const results = new Array(items.length);
    let cursor = 0;

    await Promise.all(
        Array.from({ length: limit }, async () => {
            while (cursor < items.length) {
                const index = cursor++;
                results[index] = await fn(items[index], index);
            }
        })
    );

    return results;
}

async function main() {
    await mkdir(PRODUCTS_DIR, { recursive: true });

    for (const [source, file] of [...CAMPAIGN_ASSETS, WORDMARK]) {
        await saveImage(`https://cdn.salla.sa/${source}`, file, 1600);
    }

    const categories = (await getJson(`${API}/categories`)).data.map((category) => ({
        key: CATEGORY_KEYS[category.name] ?? category.id,
        name: category.name,
    }));

    const raw = await fetchAllProducts();
    console.log(`Fetched ${raw.length} products`);

    const products = await mapLimit(raw, 6, async (product) => {
        const shortKey = product.url.split("/").pop();
        const file = `products/${product.id}.webp`;
        const source = await findLargestImage(product);
        const meta = await saveImage(source, file, 1000);
        const details = parseDescription(product.description ?? "", product.name);
        const name = clean(product.name);
        const isNewborn = /حديثي الولادة|مواليد شهر/.test(name);

        return {
            id: String(product.id),
            slug: slugify(name, shortKey),
            name,
            category: CATEGORY_KEYS[product.category?.name] ?? "earrings",
            collections: isNewborn ? ["newborn"] : [],
            price: Number(product.price),
            regularPrice: Number(product.regular_price ?? product.price),
            available: Boolean(product.is_available) && !product.is_out_of_stock,
            image: `/${file}`,
            width: meta.width,
            height: meta.height,
            blur: await blurDataUrl(file),
            // Background-free photo from scripts/cutout-products.mjs, when it exists.
            cutout: existsSync(path.join(PRODUCTS_DIR, "cut", `${product.id}.webp`))
                ? `/products/cut/${product.id}.webp`
                : undefined,
            ...details,
            sallaUrl: `${STORE_URL}/${shortKey}`,
        };
    });

    const data = { importedAt: new Date().toISOString(), categories, products };
    await writeFile(path.join(ROOT, "src/data/products.json"), `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Wrote ${products.length} products`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
