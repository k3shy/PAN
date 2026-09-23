import { ArrowUpRight } from 'lucide-react';

const collections = [
  {
    title: "Thread Theory",
    subtitle: "SS26 Collection",
    description: "Deconstructed silhouettes meet urban utility. Bold cuts, raw edges, and fearless design.",
    gradient: "from-pan-accent/20 to-pan-dark",
    items: "12 Pieces",
    pattern: "diagonal"
  },
  {
    title: "Needle Point",
    subtitle: "Essentials",
    description: "Premium basics with precision tailoring. The foundation of every great outfit.",
    gradient: "from-blue-900/20 to-pan-dark",
    items: "8 Pieces",
    pattern: "dots"
  },
  {
    title: "Stitch Culture",
    subtitle: "Limited Drop",
    description: "Exclusive collab pieces — once gone, gone forever. Only 100 made worldwide.",
    gradient: "from-purple-900/20 to-pan-dark",
    items: "6 Pieces",
    pattern: "grid"
  }
];

function CollectionPattern({ pattern }: { pattern: string }) {
  switch (pattern) {
    case 'diagonal':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1={i * 20} y1="0" x2={i * 20 + 100} y2="200" stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      );
    case 'dots':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 10 }, (_, i) =>
            Array.from({ length: 10 }, (_, j) => (
              <circle key={`${i}-${j}`} cx={i * 22 + 10} cy={j * 22 + 10} r="2" fill="white" />
            ))
          )}
        </svg>
      );
    case 'grid':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <line x1={i * 22} y1="0" x2={i * 22} y2="200" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1={i * 22} x2="200" y2={i * 22} stroke="white" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      );
    default:
      return null;
  }
}

export default function Collections() {
  return (
    <section id="collections" className="py-20 md:py-32 bg-pan-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">EXPLORE</p>
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight">
            Collections
          </h2>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-sm bg-gradient-to-br ${collection.gradient} border border-white/5 hover:border-pan-accent/30 transition-all duration-500 cursor-pointer`}
            >
              {/* Pattern Background */}
              <CollectionPattern pattern={collection.pattern} />

              <div className="relative p-8 md:p-10 min-h-[300px] md:min-h-[350px] flex flex-col justify-between">
                <div>
                  <p className="text-xs tracking-[0.2em] text-pan-muted mb-2">{collection.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-grotesk font-bold mb-3 group-hover:text-pan-accent transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-pan-muted leading-relaxed">
                    {collection.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <span className="text-xs text-pan-muted tracking-wider">{collection.items}</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-pan-accent group-hover:border-pan-accent transition-all duration-300">
                    <ArrowUpRight size={16} className="group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-pan-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
