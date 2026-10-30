/**
 * Removes the white studio background from product photos so the pieces can
 * "float" inside the boutique niches.
 *
 *   node scripts/cutout-products.mjs            # only products without a cutout
 *   node scripts/cutout-products.mjs --force    # redo everything
 *
 * Needs @imgly/background-removal-node, which is kept out of package.json
 * (heavy ML model + an old sharp pin). Install it once in a separate folder:
 *
 *   mkdir ../bg-tool && cd ../bg-tool && npm init -y
 *   npm pkg set overrides.sharp=^0.34.0 && npm i @imgly/background-removal-node@1.4.5
 *
 * then run with BG_TOOL=../bg-tool node scripts/cutout-products.mjs
 *
 * Output: public/products/cut/<id>.webp, and `cutout` paths in src/data/products.json.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "src/data/products.json");
const OUT = path.join(ROOT, "public/products/cut");
const force = process.argv.includes("--force");

// Reviewed by hand: the model mangles these (pearls removed, leftover background),
// so they keep their original photo inside the niche.
const SKIP = new Set(["965863993", "1662379414", "403352988"]);

async function loadRemover() {
    const base = process.env.BG_TOOL ? path.resolve(process.env.BG_TOOL, "package.json") : import.meta.filename;
    const resolved = createRequire(base).resolve("@imgly/background-removal-node");
    const { removeBackground } = await import(`file://${resolved.replace(/\\/g, "/")}`);
    return removeBackground;
}

async function main() {
    const removeBackground = await loadRemover();
    const data = JSON.parse(await readFile(DATA, "utf8"));
    await mkdir(OUT, { recursive: true });

    for (const product of data.products) {
        if (SKIP.has(product.id)) {
            delete product.cutout;
            continue;
        }

        const target = path.join(OUT, `${product.id}.webp`);

        if (force || !existsSync(target)) {
            const png = await sharp(path.join(ROOT, "public", product.image)).png().toBuffer();
            const blob = await removeBackground(new Blob([png], { type: "image/png" }), {
                model: "medium",
                output: { format: "image/png" },
            });

            await sharp(Buffer.from(await blob.arrayBuffer()))
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 82, alphaQuality: 90 })
                .toFile(target);
            console.log("cut", product.id, product.name);
        }

        product.cutout = `/products/cut/${product.id}.webp`;
    }

    await writeFile(DATA, `${JSON.stringify(data, null, 2)}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
