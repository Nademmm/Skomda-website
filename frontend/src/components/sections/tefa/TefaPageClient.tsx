"use client";

import { useState } from "react";
import TefaHeroSection from "./TefaHeroSection";
import TefaNeedSection from "./TefaNeedSection";
import TefaCatalogSection, { TefaProductItem } from "./TefaCatalogSection";
import TefaCtaBanner from "./TefaCtaBanner";
import TefaRequestModal from "./TefaRequestModal";
import TefaProductDetailModal from "./TefaProductDetailModal";

export default function TefaPageClient() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] =
    useState<TefaProductItem | null>(null);
  const [selectedProductForRequest, setSelectedProductForRequest] =
    useState<TefaProductItem | null>(null);
  const [catalogCategory, setCatalogCategory] = useState<string>("Semua");

  const handleExploreServices = () => {
    const el = document.getElementById("layanan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenRequestModal = (product?: TefaProductItem | null) => {
    setSelectedProductForRequest(product || null);
    setIsRequestModalOpen(true);
  };

  const handleSelectCategoryFromNeed = (category: string) => {
    setCatalogCategory(category);
    const el = document.getElementById("katalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewAllServices = () => {
    setCatalogCategory("Semua");
    const el = document.getElementById("katalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Hero Section (Dari Kebutuhan Menjadi Solusi Nyata) */}
      <TefaHeroSection
        onExploreServices={handleExploreServices}
        onRequestProject={() => handleOpenRequestModal(null)}
      />

      {/* 2. Mulai Dari Kebutuhan Anda (Apa yang bisa kami bantu? - 01-04 list + TeFa Building photo) */}
      <TefaNeedSection
        onSelectCategory={handleSelectCategoryFromNeed}
        onRequestProject={() => handleOpenRequestModal(null)}
        onViewAllServices={handleViewAllServices}
      />

      {/* 3. Produk & Layanan (4 Product Cards Grid) */}
      <TefaCatalogSection
        selectedCategory={catalogCategory}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
        onRequestProduct={(product) => handleOpenRequestModal(product)}
      />

      {/* 4. Ceritakan Project Anda (Crimson Gradient CTA Banner) */}
      <TefaCtaBanner onRequestProject={() => handleOpenRequestModal(null)} />

      {/* 5. Interactive Project Request Modal */}
      <TefaRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        initialProduct={selectedProductForRequest}
      />

      {/* 6. Product Detail Modal */}
      <TefaProductDetailModal
        isOpen={Boolean(selectedProductForDetail)}
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onRequestThisProduct={(product) => handleOpenRequestModal(product)}
      />
    </>
  );
}
