/**
 * Cloudinary Image Helper untuk SMK Telkom Sidoarjo Website.
 *
 * Mengoptimalkan pemuatan gambar dengan otomatisasi format (AVIF/WebP),
 * penyesuaian kualitas dinamis (q_auto), dan responsive resizing (w_xxx).
 *
 * Sesuai strategi hibrida:
 * - Foto konten (guru, siswa, fasilitas, berita): Dioptimalkan lewat Cloudinary CDN.
 * - Format vektor (SVG), icon kecil, dan logo statis: Tetap dimuat dari folder lokal `public/`.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "thumb" | "scale" | "limit" | "fit" | "pad";
  gravity?: "auto" | "face" | "faces" | "center" | "north";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  aspectRatio?: string;
  blur?: number;
  dpr?: number | "auto";
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_BASE = "https://res.cloudinary.com";

/**
 * Membentuk URL Cloudinary teroptimasi dari path atau public_id gambar.
 * Jika CLOUD_NAME belum disetel di .env atau gambar berupa file SVG,
 * fungsi akan otomatis mengembalikan path lokal tanpa membebani kuota transformasi.
 */
export function getCloudinaryUrl(
  imagePath: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!imagePath) return "/images/common/placeholder.png";

  // 1. Aset SVG & Vektor tetap disajikan lokal (Hybrid Strategy)
  if (imagePath.toLowerCase().endsWith(".svg")) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  }

  // 2. URL absolut eksternal non-Cloudinary dikembalikan langsung
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    if (!imagePath.includes("res.cloudinary.com")) {
      return imagePath;
    }
  }

  // 3. Fallback jika CLOUD_NAME belum dikonfigurasi
  if (!CLOUD_NAME) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  }

  // 4. Bersihkan path lokal (hapus leading slash atau prefix '/images/')
  let cleanId = imagePath.replace(/^\/+/, "");
  if (cleanId.startsWith("images/")) {
    cleanId = cleanId.replace(/^images\//, "skomda/");
  } else if (!cleanId.startsWith("skomda/")) {
    cleanId = `skomda/${cleanId}`;
  }

  // Hapus ekstensi jika format auto digunakan
  const cleanIdWithoutExt = cleanId.replace(/\.(png|jpe?g|webp|gif)$/i, "");

  // 5. Susun parameter transformasi
  const transforms: string[] = [];

  // Format & Kualitas Default (Otomatis AVIF/WebP)
  const format = options.format || "auto";
  const quality = options.quality || "auto";
  transforms.push(`f_${format}`, `q_${quality}`);

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.aspectRatio) transforms.push(`ar_${options.aspectRatio}`);
  if (options.blur) transforms.push(`e_blur:${options.blur}`);
  if (options.dpr) transforms.push(`dpr_${options.dpr}`);

  const transformStr = transforms.join(",");

  return `${CLOUDINARY_BASE}/${CLOUD_NAME}/image/upload/${transformStr}/${cleanIdWithoutExt}`;
}

/**
 * Helper khusus untuk foto guru & tenaga pendidik.
 * Menggunakan smart crop dengan fokus deteksi wajah (`g_face`).
 */
export function getTeacherPhotoUrl(
  rawPath: string,
  width: number = 320,
  height: number = 400
): string {
  return getCloudinaryUrl(rawPath, {
    width,
    height,
    crop: "fill",
    gravity: "face",
    quality: "auto",
    format: "auto",
  });
}

/**
 * Helper khusus thumbnail berita/artikel sekolah.
 * Menggunakan rasio 16:9 dengan responsive fit.
 */
export function getNewsImageUrl(
  rawPath: string,
  width: number = 720,
  height: number = 405
): string {
  return getCloudinaryUrl(rawPath, {
    width,
    height,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    format: "auto",
  });
}

/**
 * Helper banner hero beranda dan jurusan.
 */
export function getHeroImageUrl(rawPath: string, width: number = 1920): string {
  return getCloudinaryUrl(rawPath, {
    width,
    quality: "auto:good",
    format: "auto",
  });
}
