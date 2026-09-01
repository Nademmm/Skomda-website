import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareArticleWidget from "@/components/news/ShareArticleWidget";
import { getNewsBySlug, getNewsList } from "@/services/news";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generasi metadata SEO per halaman berita
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "SMK Telkom Sidoarjo",
      description: "Halaman berita yang Anda cari tidak ditemukan di SMK Telkom Sidoarjo.",
    };
  }

  return {
    title: "SMK Telkom Sidoarjo",
    description: news.summary || news.title,
    openGraph: {
      title: "SMK Telkom Sidoarjo",
      description: news.summary,
      images: [news.image || "/figma/news-thumb-1.png"],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  // Ambil list berita lain untuk rekomendasi "Berita Terkait"
  const allNews = await getNewsList();
  const relatedNews = allNews
    .filter((item) => item.slug !== news.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Container Utama */}
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 sm:mb-8">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#515151] hover:text-[#bd0c12] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Kembali ke Semua Berita</span>
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8 sm:mb-10">
            {/* Category & Date Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[rgba(188,12,17,0.1)] text-[#bd0c12] font-jakarta font-semibold text-xs sm:text-sm px-3.5 py-1 rounded-full border border-[rgba(188,12,17,0.2)]">
                {news.category}
              </span>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6a7282]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#6a7282]"
                >
                  <circle
                    cx="6.375"
                    cy="6.375"
                    r="5.625"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.75 3.875V7H8.875"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  {news.dateFormatted || "Terbaru"} {news.time ? `• ${news.time} WIB` : ""}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-jakarta font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-[#101828] mb-6">
              {news.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200/80">
              <div className="size-10 rounded-full bg-[#bd0c12]/10 flex items-center justify-center text-[#bd0c12] font-bold text-sm">
                SK
              </div>
              <div>
                <p className="font-jakarta font-semibold text-sm text-[#101828]">
                  {news.author || "Humas SKOMDA"}
                </p>
                <p className="text-xs text-[#6a7282]">
                  SMK Telkom Sidoarjo Official Media
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md mb-10 bg-gray-200">
            <Image
              src={news.image || "/figma/news-thumb-1.png"}
              alt={news.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1040px) 100vw, 1040px"
            />
          </div>

          {/* Article Body */}
          <article className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-100 mb-14">
            {news.summary && (
              <div className="p-4 sm:p-6 mb-8 bg-red-50/60 border-l-4 border-[#bd0c12] rounded-r-xl">
                <p className="font-jakarta font-medium text-base sm:text-lg leading-relaxed text-[#364153] italic">
                  &ldquo;{news.summary}&rdquo;
                </p>
              </div>
            )}

            <div className="font-jakarta text-[#364153] text-base sm:text-lg leading-relaxed sm:leading-8 space-y-6">
              {news.content ? (
                news.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{news.summary || news.title}</p>
              )}
            </div>

            {/* Share Widget */}
            <ShareArticleWidget slug={news.slug} />
          </article>

          {/* Berita Terkait / Rekomendasi */}
          {relatedNews.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828]">
                  Berita Terkait Lainnya
                </h3>
                <Link
                  href="/berita"
                  className="text-sm font-semibold text-[#bd0c12] hover:underline"
                >
                  Lihat Semua →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <article
                    key={item.id || item.slug}
                    className="bg-white rounded-[16px] p-3 pb-4 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-2 border-dashed border-[#d1d5dc] hover:border-[#bc0c11] group"
                  >
                    <Link
                      href={`/berita/${item.slug}`}
                      className="block relative h-[160px] w-full rounded-[12px] overflow-hidden bg-gray-100 mb-3 cursor-pointer"
                    >
                      <Image
                        src={item.image || "/figma/news-thumb-1.png"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                    <Link href={`/berita/${item.slug}`}>
                      <h4 className="font-jakarta font-bold text-sm text-[#101828] line-clamp-2 group-hover:text-[#bd0c12] transition-colors mb-2">
                        {item.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#6a7282] mt-auto">
                      {item.dateFormatted} • {item.time}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
