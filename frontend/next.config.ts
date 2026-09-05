import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
  allowedDevOrigins: ["192.168.100.13"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/akomodasi",
        destination: "/tentang-kami/akomodasi",
        permanent: true,
      },
      {
        source: "/informasi/unduh",
        destination: "/unduh-informasi",
        permanent: true,
      },
      {
        source: "/jurusan",
        destination: "/program/profil-jurusan",
        permanent: true,
      },
      {
        source: "/jurusan/:slug*",
        destination: "/program/profil-jurusan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
