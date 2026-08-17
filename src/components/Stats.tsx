const stats = [
  { value: '15 Sec', label: 'Live Answer Guarantee' },
  { value: '60 Sec', label: 'Missed-Call Text-Back' },
  { value: '90 Days', label: 'Revenue Guarantee or We Work Free' },
  { value: '100%', label: 'Done-For-You, No Hiring Needed' },
];

export default function Stats() {
  return (
    <section className="relative bg-[#FFA800] py-16 overflow-hidden">
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0,0,0,0.04) 24px, rgba(0,0,0,0.04) 48px)',
        }}
      />
      {/* Decorative large anchor watermark */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.07] select-none pointer-events-none">
        <svg width="160" height="160" viewBox="0 0 24 24" fill="#0b1829" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 9v2H8a6 6 0 0 0 5 5.92V13h2v3.92A6 6 0 0 0 20 11h-2a4 4 0 0 1-4 4 4 4 0 0 1-4-4H8a6 6 0 0 0 5 5.92V22h-3v2h8v-2h-3v-7.08A6 6 0 0 0 20 9h-8z"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#0b1829]/20">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-[#0b1829] text-4xl sm:text-5xl font-black mb-2">{s.value}</p>
              <p className="text-[#0b1829]/70 text-sm font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
