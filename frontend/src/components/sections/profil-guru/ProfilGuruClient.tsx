"use client";

import { useState, useEffect } from "react";
import ProfilGuruHeroSection from "./ProfilGuruHeroSection";
import KepalaSekolahSection from "./KepalaSekolahSection";
import TeacherCarouselSection from "./TeacherCarouselSection";
import {
  kepalaSekolah as defaultKepala,
  wakilKepalaList as defaultWakil,
  guruList as defaultGuru,
  staffList as defaultStaff,
  TeacherItem,
} from "@/data/teachers";
import { getTeachers } from "@/services/teachers";

export default function ProfilGuruClient() {
  const [kepala, setKepala] = useState<any>(defaultKepala);
  const [manajemen, setManajemen] = useState<TeacherItem[]>(defaultWakil);
  const [guru, setGuru] = useState<TeacherItem[]>(defaultGuru);
  const [staff, setStaff] = useState<TeacherItem[]>(defaultStaff);

  useEffect(() => {
    let isMounted = true;
    getTeachers()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;

        const ks = data.find((t) => t.category === "Kepala Sekolah");
        if (ks) {
          setKepala({
            name: ks.name,
            title: ks.role,
            institution: "SMK Telkom Sidoarjo",
            role: ks.role,
            image: ks.image || defaultKepala.image,
            bio: ks.bio || defaultKepala.bio,
            pendidikanTerakhir: ks.pendidikanTerakhir || defaultKepala.pendidikanTerakhir,
            bidangKeahlian: ks.bidangKeahlian || defaultKepala.bidangKeahlian,
            motto: ks.motto || defaultKepala.motto,
            kontak: ks.kontak || defaultKepala.kontak,
          });
        }

        const man = data.filter((t) => t.category === "Manajemen");
        if (man.length > 0) {
          setManajemen(
            man.map((m) => ({
              id: m.id,
              name: m.name,
              role: m.role,
              image: m.image || "/images/tentang-kami/profil-guru/faun.png",
            }))
          );
        }

        const gur = data.filter(
          (t) =>
            t.category === "Guru" ||
            t.category.startsWith("Guru")
        );
        if (gur.length > 0) {
          setGuru(
            gur.map((g) => ({
              id: g.id,
              name: g.name,
              role: g.role,
              image: g.image || "/images/tentang-kami/profil-guru/lia.png",
            }))
          );
        }

        const st = data.filter((t) => t.category === "Staf");
        if (st.length > 0) {
          setStaff(
            st.map((s) => ({
              id: s.id,
              name: s.name,
              role: s.role,
              image: s.image || "/images/tentang-kami/profil-guru/manda.png",
            }))
          );
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* 1. Top Hero Section */}
      <ProfilGuruHeroSection />

      {/* 2. Kepala Sekolah Featured Section */}
      <KepalaSekolahSection data={kepala} />

      {/* 3. Wakil Kepala & Manajemen Sekolah Carousel */}
      <TeacherCarouselSection
        title="Pimpinan & Manajemen Sekolah"
        titleEn="School Management & Vice Principals"
        subtitle="SMK Telkom Sidoarjo"
        items={manajemen}
        itemsPerPage={4}
        bgWhite={false}
      />

      {/* 4. Guru Mata Pelajaran Carousel */}
      <TeacherCarouselSection
        title="Guru Mata Pelajaran"
        titleEn="Subject Teachers"
        subtitle="SMK Telkom Sidoarjo"
        items={guru}
        itemsPerPage={4}
        bgWhite={true}
      />

      {/* 5. Staff dan Karyawan Carousel */}
      <TeacherCarouselSection
        title="Staff dan Karyawan"
        titleEn="Administrative & Support Staff"
        subtitle="SMK Telkom Sidoarjo"
        items={staff}
        itemsPerPage={4}
        bgWhite={false}
      />
    </>
  );
}
