"use client";

import { Menu, Shield, User, Globe } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenSidebar: () => void;
  actions?: React.ReactNode;
}

export default function AdminHeader({
  title = "Panel Administrasi",
  subtitle,
  onOpenSidebar,
  actions,
}: AdminHeaderProps) {
  const { user } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Buka Menu"
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
