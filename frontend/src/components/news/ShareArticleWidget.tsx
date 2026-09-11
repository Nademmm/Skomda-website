"use client";

import { useState } from "react";

interface ShareArticleWidgetProps {
  title?: string;
  slug?: string;
}

export default function ShareArticleWidget({ slug }: ShareArticleWidgetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const urlToCopy =
      typeof window !== "undefined"
        ? window.location.href
        : `https://smktelkom-sda.sch.id/berita/${slug || ""}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = urlToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
      <span className="font-jakarta text-sm text-[#6a7282] font-medium">
        Bagikan artikel ini:
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex h-[38px] items-center gap-2 rounded-full border border-[#bc0c11] px-5 text-xs font-bold font-jakarta transition-all shadow-sm active:scale-[0.98] cursor-pointer ${
          copied
            ? "bg-[#bc0c11] text-white"
            : "text-[#bc0c11] hover:bg-[#bc0c11] hover:text-white"
        }`}
      >
        <span>{copied ? "Tersalin!" : "Salin Link"}</span>
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
    </div>
  );
}
