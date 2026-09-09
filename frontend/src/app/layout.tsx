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
  title: {
    default: "SMK Telkom Sidoarjo",
    template: "SMK Telkom Sidoarjo",
  },
  description:
    "Selamat datang di SMK Telkom Sidoarjo. Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak di era digital.",
  icons: {
    icon: "/images/common/telkom-schools-icon.png",
    shortcut: "/images/common/telkom-schools-icon.png",
    apple: "/images/common/telkom-schools-icon.png",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import SkomdaChatWidget from "@/components/chatbot/SkomdaChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${poppins.variable}`}>
      <body className="font-jakarta antialiased bg-[#f3f4f6] text-[#101828] overflow-x-hidden">
        <LanguageProvider>
          {children}
          {/* Floating AI Chatbot Widget (Skomda Intelligence via NexusRouter) */}
          <SkomdaChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
