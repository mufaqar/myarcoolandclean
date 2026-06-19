const brands = [
  { name: 'Haier', type: 'AC & Appliances' },
  { name: 'Daikin', type: 'AC Systems' },
  { name: 'Gree', type: 'Cooling' },
  { name: 'Dawlance', type: 'Appliances' },
  { name: 'Orient', type: 'Fans & Coolers' },
  { name: 'Siemens', type: 'Electrical' },
  { name: 'General Electric', type: 'Appliances' },
  { name: 'Whirlpool', type: 'Appliances' },
  { name: 'LG', type: 'Electronics' },
  { name: 'Samsung', type: 'Electronics' },
];

export default function BrandSlider() {
  // Duplicate for seamless marquee
  const allBrands = [...brands, ...brands];

  return (
    <section className="py-24 bg-white border-t border-primary-200 overflow-hidden">
      <div className="container-lg mb-16 text-center">
        <p className="section-eyebrow justify-center">Quality Assurance</p>
        <h2 className="section-title text-5xl">Popular Brands We Service</h2>
      </div>

      {/* Scrolling track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white via-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white via-white to-transparent pointer-events-none" />

        <div className="flex gap-8 animate-marquee" style={{ width: 'max-content' }}>
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 py-6 flex flex-col items-center justify-center bg-slate-50 border border-primary-200 hover:border-accent hover:bg-primary-900 transition-all duration-300 min-w-[180px] group rounded-lg"
            >
              <span className="text-sm font-bold text-primary-600 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {brand.name}
              </span>
              <span className="text-xs text-primary-400 mt-1 group-hover:text-white/70 transition-colors duration-300">
                {brand.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
