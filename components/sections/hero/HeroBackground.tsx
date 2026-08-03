export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute top-12 -left-1/4 h-[70%] w-[70%] rounded-full bg-[#d9f3fc]/80 blur-[120px] md:blur-[170px]" />
      <div className="absolute top-20 left-1/3 h-1/2 w-1/3 rounded-full bg-white blur-[100px]" />
      <div className="absolute top-12 -right-1/4 h-[70%] w-[70%] rounded-full bg-[#fdf1d3]/80 blur-[120px] md:blur-[170px]" />
    </div>
  );
}
