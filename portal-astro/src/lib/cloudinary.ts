/**
 * Cloudinary Helper untuk portal Astro (Vite).
 * Menerapkan Strategi Hibrida:
 * - Aset foto/media dialihkan ke Cloudinary CDN dengan optimasi f_auto,q_auto.
 * - Format SVG/vektor dan logo inti disajikan dari lokal.
 */

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "thumb" | "scale" | "limit";
  gravity?: "auto" | "face";
  quality?: "auto" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "avif" | "png";
}

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_BASE = "https://res.cloudinary.com";

export function getImageUrl(path: string, opts: CloudinaryOptions = {}): string {
  if (!path) return "/images/common/placeholder.png";

  // SVG & Asset lokal tetap lokal
  if (path.endsWith(".svg")) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  // Fallback jika belum ada Cloud Name
  if (!CLOUD_NAME) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  let cleanId = path.replace(/^\/+/, "");
  if (cleanId.startsWith("images/")) {
    cleanId = cleanId.replace(/^images\//, "skomda/");
  } else if (!cleanId.startsWith("skomda/")) {
    cleanId = `skomda/${cleanId}`;
  }

  const cleanIdNoExt = cleanId.replace(/\.(png|jpe?g|webp|gif)$/i, "");
  const transforms = [
    `f_${opts.format || "auto"}`,
    `q_${opts.quality || "auto"}`,
  ];

  if (opts.width) transforms.push(`w_${opts.width}`);
  if (opts.height) transforms.push(`h_${opts.height}`);
  if (opts.crop) transforms.push(`c_${opts.crop}`);
  if (opts.gravity) transforms.push(`g_${opts.gravity}`);

  return `${CLOUDINARY_BASE}/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${cleanIdNoExt}`;
}
