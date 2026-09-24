import { useContent } from '../context/ContentContext';

export default function Lookbook() {
  const { content } = useContent();

  return (
    <section id="lookbook" className="py-20 md:py-32 bg-pan-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {content.lookbook.map((look) => (
            <div
              key={look.id}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${look.span} ${look.minH}`}
              style={{ backgroundColor: look.bgColor }}
            >
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id={`look-pattern-${look.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill={look.accentColor} />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill={`url(#look-pattern-${look.id})`} />
                </svg>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-pan-accent/30 group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl font-grotesk font-bold text-white/10 group-hover:text-pan-accent/30 transition-colors duration-500">
                    {look.id}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs tracking-[0.2em] text-pan-accent mb-1">LOOK {look.id}</p>
                <h3 className="text-lg font-grotesk font-bold text-pan-white group-hover:text-pan-accent transition-colors duration-300">
                  {look.title}
                </h3>
                <p className="text-xs text-pan-muted mt-1">{look.items}</p>
              </div>

              <div className="absolute inset-0 border border-transparent group-hover:border-pan-accent/20 rounded-sm transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
