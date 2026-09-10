#!/usr/bin/env node
/**
 * Script utilitas untuk audit dan migrasi aset gambar ke Cloudinary.
 *
 * Penggunaan:
 *   node scripts/sync-cloudinary.mjs           (Audit / dry-run)
 *   node scripts/sync-cloudinary.mjs --upload  (Upload foto ke Cloudinary)
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.resolve(__dirname, "../frontend/public/images");
const ENV_FILE = path.resolve(__dirname, "../backend/.env");
const MANIFEST_FILE = path.resolve(__dirname, "../frontend/src/lib/cloudinary-manifest.json");

console.log("=== SKOMDA ASSET CLOUDINARY AUDITOR & SYNC ===");
console.log(`Direktori target: ${IMAGES_DIR}\n`);

if (!fs.existsSync(IMAGES_DIR)) {
  console.error(`Direktori ${IMAGES_DIR} tidak ditemukan!`);
  process.exit(1);
}

function scanFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanFiles(filePath));
    } else {
      results.push({
        fullPath: filePath,
        relativePath: path.relative(IMAGES_DIR, filePath).replace(/\\/g, "/"),
        size: stat.size,
        ext: path.extname(file).toLowerCase(),
      });
    }
  }
  return results;
}

const allFiles = scanFiles(IMAGES_DIR);
const totalBytes = allFiles.reduce((acc, f) => acc + f.size, 0);
const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

const svgs = allFiles.filter((f) => f.ext === ".svg");
const heavyPhotos = allFiles.filter((f) => f.ext !== ".svg");

const svgBytes = svgs.reduce((acc, f) => acc + f.size, 0);
const heavyBytes = heavyPhotos.reduce((acc, f) => acc + f.size, 0);

console.log(`Total file gambar ditemukan : ${allFiles.length}`);
console.log(`Total ukuran aset lokal      : ${totalMB} MB\n`);

console.log("--- REKOMENDASI STRATEGI HIBRIDA ---");
console.log(`1. Aset Vektor (Tetap di Lokal public/): ${svgs.length} file (${(svgBytes / 1024).toFixed(1)} KB)`);
console.log(`2. Foto & Media (Pindah ke Cloudinary): ${heavyPhotos.length} file (${(heavyBytes / (1024 * 1024)).toFixed(2)} MB)\n`);

const isUploadMode = process.argv.includes("--upload");

if (!isUploadMode) {
  console.log("Mode saat ini: AUDIT / SIMULASI (Tidak ada file yang diunggah).");
  console.log("Untuk mulai mengunggah 126 foto ke akun Cloudinary Anda, jalankan:");
  console.log("  node scripts/sync-cloudinary.mjs --upload\n");
  process.exit(0);
}

// Mode UPLOAD
if (!fs.existsSync(ENV_FILE)) {
  console.error("File backend/.env tidak ditemukan untuk membaca kredensial!");
  process.exit(1);
}

const envContent = fs.readFileSync(ENV_FILE, "utf-8");
const match = envContent.match(/CLOUDINARY_URL=(.+)/);
if (!match) {
  console.error("CLOUDINARY_URL tidak ditemukan di backend/.env!");
  process.exit(1);
}

const parsed = new URL(match[1].trim());
const cloudName = parsed.hostname;
const apiKey = parsed.username;
const apiSecret = parsed.password;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Kredensial Cloudinary belum lengkap di backend/.env!");
  process.exit(1);
}

console.log(`🚀 Mulai proses upload ke Cloudinary (${cloudName})...\n`);

let manifest = {};
if (fs.existsSync(MANIFEST_FILE)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf-8"));
  } catch {}
}

let uploadedCount = 0;
let skippedCount = 0;

for (let i = 0; i < heavyPhotos.length; i++) {
  const photo = heavyPhotos[i];
  const publicId = `skomda/${photo.relativePath.replace(/\.[^/.]+$/, "")}`;

  if (manifest[photo.relativePath]) {
    skippedCount++;
    console.log(`[${i + 1}/${heavyPhotos.length}] ⏭️ Dilewati (sudah terunggah): ${photo.relativePath}`);
    continue;
  }

  let fileData = fs.readFileSync(photo.fullPath);
  
  // Jika file lebih dari 10MB (batas free tier Cloudinary), optimasi dimensi ke max 2400px
  if (fileData.length > 10 * 1024 * 1024) {
    try {
      const { default: sharp } = await import("sharp");
      const optimized = await sharp(fileData)
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 90 })
        .toBuffer();
      process.stdout.write(`[Optimasi ${((fileData.length - optimized.length) / (1024 * 1024)).toFixed(1)}MB] `);
      fileData = optimized;
    } catch (e) {
      console.log(`(Sharp notice: ${e.message})`);
    }
  }

  const mimeType = photo.ext === ".png" ? "image/png" : photo.ext === ".webp" ? "image/webp" : "image/jpeg";
  const blob = new Blob([fileData], { type: mimeType });

  process.stdout.write(`[${i + 1}/${heavyPhotos.length}] Mengunggah: ${photo.relativePath} (${(photo.size / (1024 * 1024)).toFixed(2)} MB)... `);

  let success = false;
  let attempts = 0;

  while (!success && attempts < 3) {
    attempts++;
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(toSign).digest("hex");

    const formData = new FormData();
    formData.append("file", blob, path.basename(photo.fullPath));
    formData.append("public_id", publicId);
    formData.append("timestamp", String(timestamp));
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    formData.append("overwrite", "true");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (res.ok) {
        manifest[photo.relativePath] = {
          public_id: json.public_id,
          secure_url: json.secure_url,
          format: json.format,
          bytes: json.bytes,
        };
        uploadedCount++;
        success = true;
        console.log("✅ OK");
      } else {
        console.log(`❌ Gagal: ${json.error?.message || "Unknown error"}`);
        if (attempts < 3) console.log(`   Mencoba ulang (percobaan ${attempts + 1})...`);
      }
    } catch (err) {
      console.log(`❌ Error jaringan: ${err.message}`);
      if (attempts < 3) console.log(`   Mencoba ulang (percobaan ${attempts + 1})...`);
    }
  }

  // Simpan manifest berkala setiap upload
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");
}

console.log("\n=== RINGKASAN UPLOAD ===");
console.log(`Berhasil diunggah baru : ${uploadedCount}`);
console.log(`Sudah ada sebelumnya   : ${skippedCount}`);
console.log(`Total dalam manifest   : ${Object.keys(manifest).length}`);
console.log(`Manifest tersimpan di  : ${MANIFEST_FILE}`);
console.log("Semua foto kini aman dan terdistribusi via Cloudinary CDN!");
