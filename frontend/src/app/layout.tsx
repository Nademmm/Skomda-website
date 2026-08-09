import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SMK Telkom Sidoarjo — Sekolah Vokasi Telekomunikasi & Digital Talent",
    template: "%s — SMK Telkom Sidoarjo",
  },
  description:
    "SMK Telkom Sidoarjo menyiapkan lulusan siap kerja lewat empat jurusan vokasi dan sembilan spesialisasi Digital Talent Program.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
