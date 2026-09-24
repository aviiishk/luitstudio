export function HeroBackground() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/illustrations/hero-world-map-desktop.avif"
        type="image/avif"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/illustrations/hero-world-map-mobile.avif"
        type="image/avif"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-x-0 top-32 bottom-0 hidden bg-contain bg-top bg-no-repeat opacity-25 md:block"
          style={{
            backgroundImage:
              "image-set(url(/images/illustrations/hero-world-map-desktop.avif) type('image/avif'), url(/images/illustrations/hero-world-map-desktop.webp) type('image/webp'))",
          }}
        />
        <div
          className="absolute inset-x-0 top-32 bottom-0 bg-contain bg-top bg-no-repeat opacity-25 md:hidden"
          style={{
            backgroundImage:
              "image-set(url(/images/illustrations/hero-world-map-mobile.avif) type('image/avif'), url(/images/illustrations/hero-world-map-mobile.webp) type('image/webp'))",
          }}
        />
        <div className="absolute top-12 -left-1/4 h-[70%] w-[70%] rounded-full bg-[#d9f3fc]/80 blur-[120px] md:blur-[170px]" />
        <div className="absolute top-20 left-1/3 h-1/2 w-1/3 rounded-full bg-white blur-[100px]" />
        <div className="absolute top-12 -right-1/4 h-[70%] w-[70%] rounded-full bg-[#fdf1d3]/80 blur-[120px] md:blur-[170px]" />
      </div>
    </>
  );
}
