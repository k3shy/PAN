import { Scissors, Truck, Shield, RefreshCw } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const features = [
  { icon: Scissors, title: "Precision Crafted", description: "Every piece is meticulously designed and crafted with attention to every stitch." },
  { icon: Truck, title: "Fast Delivery", description: "Nationwide delivery within 24-48 hours. Free shipping on orders over KSh 5,000." },
  { icon: Shield, title: "Premium Quality", description: "We use only the finest materials — heavyweight cotton, durable fabrics, and quality hardware." },
  { icon: RefreshCw, title: "Easy Returns", description: "Not satisfied? Return within 7 days for a full refund or exchange." }
];

export default function About() {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-20 md:py-32 bg-pan-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">OUR STORY</p>
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight mb-6">
              {about.title1}<br />
              <span className="gradient-text">{about.title2}</span>
            </h2>
            <div className="space-y-4 text-pan-muted leading-relaxed">
              {about.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-pan-dark border border-white/5 rounded-sm hover:border-pan-accent/30 transition-all duration-300 group"
              >
                <feature.icon size={24} className="text-pan-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-sm font-semibold text-pan-white mb-2">{feature.title}</h3>
                <p className="text-xs text-pan-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
