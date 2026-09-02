export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] overflow-x-hidden flex flex-col">
      {/* Skeleton Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="w-full h-[66px] rounded-full bg-white/90 border border-gray-100 shadow-sm px-5 sm:px-8 flex items-center justify-between">
            {/* Logo placeholder */}
            <div className="h-8 w-[110px] rounded-md bg-gray-200 animate-pulse" />
            {/* Nav links placeholder */}
            <div className="hidden xl:flex items-center gap-4">
              {[100, 80, 70, 80, 90, 60].map((w, i) => (
                <div
                  key={i}
                  className="h-4 rounded-md bg-gray-200 animate-pulse"
                  style={{ width: `${w}px`, animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            {/* Right buttons placeholder */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-[38px] w-[130px] rounded-full bg-gray-200 animate-pulse" />
            </div>
            {/* Mobile hamburger placeholder */}
            <div className="xl:hidden h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton Content */}
      <main className="flex-1 pt-32 lg:pt-40 pb-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3.5 w-16 rounded bg-gray-200 animate-pulse" />
            <div className="h-3.5 w-3 rounded bg-gray-200 animate-pulse" />
            <div className="h-3.5 w-24 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Heading skeleton */}
          <div className="h-10 sm:h-12 w-[280px] sm:w-[360px] rounded-lg bg-gray-200 animate-pulse mb-4" />
          <div className="h-[3px] w-12 rounded-full bg-gray-200 animate-pulse mb-6" />

          {/* Paragraph skeleton */}
          <div className="max-w-[580px] flex flex-col gap-2.5 mb-10">
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse" style={{ animationDelay: "100ms" }} />
            <div className="h-4 w-[92%] rounded bg-gray-200 animate-pulse" style={{ animationDelay: "150ms" }} />
            <div className="h-4 w-[75%] rounded bg-gray-200 animate-pulse" style={{ animationDelay: "200ms" }} />
          </div>

          {/* Button skeleton */}
          <div className="h-12 w-[160px] rounded-full bg-gray-200 animate-pulse" />

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-[24px] bg-white border border-gray-100 p-7 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-6 w-10 rounded bg-gray-200 animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
                  <div className="h-11 w-11 rounded-xl bg-gray-200 animate-pulse" style={{ animationDelay: `${i * 120 + 60}ms` }} />
                </div>
                <div className="h-5 w-[70%] rounded bg-gray-200 animate-pulse" style={{ animationDelay: `${i * 120 + 100}ms` }} />
                <div className="flex flex-col gap-2">
                  <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" style={{ animationDelay: `${i * 120 + 140}ms` }} />
                  <div className="h-3.5 w-[85%] rounded bg-gray-200 animate-pulse" style={{ animationDelay: `${i * 120 + 180}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
