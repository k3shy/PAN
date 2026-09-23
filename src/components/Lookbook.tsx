export default function Lookbook() {
  const looks = [
    {
      id: 1,
      title: "Urban Night",
      items: "Oversized Hoodie + Cargo Pants",
      bgColor: "#1a1a1a",
      accentColor: "#e63946",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      title: "Minimal Edge",
      items: "Thread Theory Tee + Track Pants",
      bgColor: "#1c1c1c",
      accentColor: "#4a9eff",
      span: ""
    },
    {
      id: 3,
      title: "Raw Stitch",
      items: "Bomber Jacket + Utility Shorts",
      bgColor: "#181818",
      accentColor: "#e63946",
      span: ""
    },
    {
      id: 4,
      title: "Street Ready",
      items: "Crewneck + Cap + Cargo Pants",
      bgColor: "#1b1b1b",
      accentColor: "#f5f5f5",
      span: "md:col-span-2"
    }
  ];

  return (
    <section id="lookbook" className="py-20 md:py-32 bg-pan-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">STYLE</p>
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight">
              Lookbook
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex text-sm text-pan-muted hover:text-pan-accent transition-colors">
            View All Looks →
          </a>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {looks.map((look) => (
            <div
              key={look.id}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${look.span}`}
              style={{ backgroundColor: look.bgColor, minHeight: look.span.includes('row-span-2') ? '500px' : '240px' }}
            >
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id={`pattern-${look.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill={look.accentColor} />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill={`url(#pattern-${look.id})`} />
                </svg>
              </div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-pan-accent/30 group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl font-grotesk font-bold text-white/10 group-hover:text-pan-accent/30 transition-colors duration-500">
                    {look.id}
                  </span>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs tracking-[0.2em] text-pan-accent mb-1">{look.title}</p>
                <h3 className="text-lg font-grotesk font-bold text-pan-white group-hover:text-pan-accent transition-colors duration-300">
                  {look.title}
                </h3>
                <p className="text-xs text-pan-muted mt-1">{look.items}</p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-pan-accent/20 rounded-sm transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
