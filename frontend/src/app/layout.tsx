import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Selamat datang di SMK Telkom Sidoarjo. Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak di era digital.",
  icons: {
    icon: "/figma/telkom-schools-icon.png",
    shortcut: "/figma/telkom-schools-icon.png",
    apple: "/figma/telkom-schools-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${poppins.variable}`}>
      <body className="font-jakarta antialiased bg-[#f3f4f6] text-[#101828] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
