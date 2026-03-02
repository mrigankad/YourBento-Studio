/**
 * ─── BENTOGRIDS.COM IMAGE SCRAPER ────────────────────────────────────────────
 * Scrapes all bento grid images from https://bentogrids.com/
 * 
 * Real image URLs are at: https://s.bentogrids.com/{assetId}.{format}
 * CDN-optimized:          https://bentogrids.com/cdn-cgi/image/width=W,quality=Q,format=auto/https://s.bentogrids.com/{assetId}.{format}
 * 
 * Usage:
 *   node scripts/scrape-bentogrids.mjs
 *   node scripts/scrape-bentogrids.mjs --limit 20      (first 20 shots only)
 *   node scripts/scrape-bentogrids.mjs --quality 80     (CDN quality, default: full)
 * 
 * Output:
 *   ./scraped-bentos/           — downloaded images
 *   ./scraped-bentos/index.json — metadata catalog
 */

import { writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync, statSync } from "fs";
import https from "https";
import http from "http";
import path from "path";

const BASE_URL = "https://bentogrids.com";
const ASSET_CDN = (id, fmt) => `https://s.bentogrids.com/${id}.${fmt}`;
const OUTPUT_DIR = path.resolve("scraped-bentos");
const CATALOG_FILE = path.join(OUTPUT_DIR, "index.json");

// Parse CLI args
const args = process.argv.slice(2);
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;

// ─── Fetch helper ───────────────────────────────────────────────────────────

function fetch(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith("https") ? https : http;
        const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetch(res.headers.location).then(resolve).catch(reject);
            }
            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                const buffer = Buffer.concat(chunks);
                resolve({ status: res.statusCode, headers: res.headers, buffer });
            });
            res.on("error", reject);
        });
        req.on("error", reject);
    });
}

function extractNextData(html) {
    const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (!match) throw new Error("Could not find __NEXT_DATA__ in the page");
    return JSON.parse(match[1]);
}

// ─── Download a single file ─────────────────────────────────────────────────

async function downloadFile(url, dest) {
    if (existsSync(dest) && statSync(dest).size > 10000) {
        console.log(`  ⏭ Already exists: ${path.basename(dest)}`);
        return true;
    }
    // Delete old broken files
    if (existsSync(dest)) unlinkSync(dest);

    try {
        const { status, buffer, headers } = await fetch(url);

        if (status !== 200) {
            console.log(`  ⚠ HTTP ${status}: ${path.basename(dest)}`);
            return false;
        }

        // Verify it's not HTML 
        const contentType = headers["content-type"] || "";
        if (contentType.includes("text/html")) {
            console.log(`  ⚠ Got HTML instead of image: ${path.basename(dest)}`);
            return false;
        }

        writeFileSync(dest, buffer);
        const sizeKB = (buffer.length / 1024).toFixed(0);
        console.log(`  ✅ ${path.basename(dest)} (${sizeKB} KB)`);
        return true;
    } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
        return false;
    }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
    console.log("🍱 BentoGrids Scraper v2");
    console.log("━".repeat(50));
    console.log(`   CDN: s.bentogrids.com`);
    if (LIMIT < Infinity) console.log(`   Limit: ${LIMIT} shots`);

    // 1. Fetch and parse
    console.log("\n📡 Fetching bentogrids.com...");
    const { buffer: htmlBuf } = await fetch(BASE_URL);
    const html = htmlBuf.toString("utf-8");
    const nextData = extractNextData(html);
    const allShots = nextData.props.pageProps.shots;
    const shots = allShots.slice(0, LIMIT);
    console.log(`📊 Found ${allShots.length} bento designs (processing ${shots.length})\n`);

    // 2. Clean old broken (small) files
    if (existsSync(OUTPUT_DIR)) {
        const oldFiles = readdirSync(OUTPUT_DIR).filter(f => f !== "index.json");
        let cleaned = 0;
        for (const f of oldFiles) {
            const fp = path.join(OUTPUT_DIR, f);
            if (statSync(fp).size < 10000) {
                unlinkSync(fp);
                cleaned++;
            }
        }
        if (cleaned > 0) console.log(`🧹 Cleaned ${cleaned} broken files from previous run\n`);
    } else {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // 3. Build catalog and download images
    const catalog = [];
    let downloadCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (let si = 0; si < shots.length; si++) {
        const shot = shots[si];
        const imageAssets = shot.assets.filter((a) => !a.isVideo);
        if (imageAssets.length === 0) {
            skipCount++;
            continue;
        }

        console.log(`[${si + 1}/${shots.length}] 🖼 ${shot.title}`);
        const shotEntry = {
            id: shot.id,
            title: shot.title,
            category: shot.category,
            sourceLink: shot.sourceLink,
            isDark: shot.isDark,
            images: [],
        };

        // Download only the first image per shot (the main/hero one)
        const asset = imageAssets[0];
        const safeName = shot.title.replace(/[^a-zA-Z0-9]+/g, "_").replace(/_+$/, "").substring(0, 60);
        const filename = `${safeName}.${asset.format}`;
        const url = ASSET_CDN(asset.id, asset.format);
        const dest = path.join(OUTPUT_DIR, filename);

        const ok = await downloadFile(url, dest);
        shotEntry.images.push({
            assetId: asset.id,
            filename,
            url,
            width: asset.width,
            height: asset.height,
            format: asset.format,
            downloaded: ok,
        });
        if (ok) downloadCount++;
        else failCount++;

        catalog.push(shotEntry);

        // Small delay to be nice to the server
        await new Promise(r => setTimeout(r, 100));
    }

    // 4. Save catalog
    writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));

    console.log("\n" + "━".repeat(50));
    console.log(`✅ Done! ${downloadCount} images downloaded`);
    if (failCount > 0) console.log(`⚠  ${failCount} failed`);
    console.log(`⏭  ${skipCount} video-only shots skipped`);
    console.log(`📁 Output: ${OUTPUT_DIR}`);
    console.log(`📋 Catalog: ${CATALOG_FILE}`);
}

main().catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
});
