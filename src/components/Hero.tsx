import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with CSS art */}
      <div className="absolute inset-0 bg-pan-black">
        {/* Radial gradient spots */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(230,57,70,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(230,57,70,0.05)_0%,transparent_50%)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        {/* Large brand watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span className="text-[15rem] sm:text-[20rem] md:text-[30rem] font-grotesk font-bold text-white select-none">P</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pan-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pan-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pan-accent/10 border border-pan-accent/30 rounded-full mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="w-2 h-2 bg-pan-accent rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-pan-accent">SS26 Collection Now Live</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-grotesk font-bold tracking-tighter mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="block">PINS &</span>
          <span className="block gradient-text">NEEDLE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-pan-muted max-w-2xl mx-auto mb-4 font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Where precision meets street culture. Every stitch tells a story.
        </p>

        <p className="text-sm tracking-[0.5em] text-pan-muted/60 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          P . A . N
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#products"
            className="group flex items-center gap-3 px-8 py-4 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-pan-accent/20"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Collection
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#collections"
            className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Lookbook
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div>
            <p className="text-2xl sm:text-3xl font-grotesk font-bold text-pan-white">50+</p>
            <p className="text-xs text-pan-muted mt-1">Unique Designs</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-grotesk font-bold text-pan-white">100%</p>
            <p className="text-xs text-pan-muted mt-1">Premium Quality</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-grotesk font-bold text-pan-white">24H</p>
            <p className="text-xs text-pan-muted mt-1">Fast Shipping</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-pan-muted tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-pan-muted to-transparent"></div>
      </div>
    </section>
  );
}
