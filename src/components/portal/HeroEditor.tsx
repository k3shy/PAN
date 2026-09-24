import { useContent } from '../../context/ContentContext';
import { Eye } from 'lucide-react';

export default function HeroEditor() {
  const { content, updateHero } = useContent();
  const { hero } = content;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-grotesk font-bold text-pan-white">Hero Section</h2>
          <p className="text-sm text-pan-muted mt-1">Edit the main hero content on the homepage</p>
        </div>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 border border-white/10 text-pan-muted text-sm rounded-sm hover:border-white/30 transition-all"
        >
          <Eye size={16} />
          Preview
        </a>
      </div>

      <div className="bg-pan-dark border border-white/5 rounded-sm p-6 space-y-6">
        <div>
          <label className="block text-xs text-pan-muted mb-2">Badge Text</label>
          <input
            type="text"
            value={hero.badge}
            onChange={(e) => updateHero({ ...hero, badge: e.target.value })}
            className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
          />
          <p className="text-xs text-pan-muted/60 mt-1">The small badge above the title</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-pan-muted mb-2">Title Line 1</label>
            <input
              type="text"
              value={hero.title1}
              onChange={(e) => updateHero({ ...hero, title1: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-pan-muted mb-2">Title Line 2 (Highlighted)</label>
            <input
              type="text"
              value={hero.title2}
              onChange={(e) => updateHero({ ...hero, title2: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-pan-muted mb-2">Subtitle</label>
          <textarea
            value={hero.subtitle}
            onChange={(e) => updateHero({ ...hero, subtitle: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-pan-muted mb-2">Tagline</label>
          <input
            type="text"
            value={hero.tagline}
            onChange={(e) => updateHero({ ...hero, tagline: e.target.value })}
            className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
          />
          <p className="text-xs text-pan-muted/60 mt-1">Small text below the subtitle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-pan-muted mb-2">Primary Button Text</label>
            <input
              type="text"
              value={hero.cta1}
              onChange={(e) => updateHero({ ...hero, cta1: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-pan-muted mb-2">Secondary Button Text</label>
            <input
              type="text"
              value={hero.cta2}
              onChange={(e) => updateHero({ ...hero, cta2: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-pan-muted mb-4">Preview</p>
          <div className="bg-pan-black rounded-sm p-8 text-center border border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pan-accent/10 border border-pan-accent/30 rounded-full mb-4">
              <span className="text-xs text-pan-accent">{hero.badge}</span>
            </div>
            <h3 className="text-3xl font-grotesk font-bold text-pan-white">
              {hero.title1} <span className="gradient-text">{hero.title2}</span>
            </h3>
            <p className="text-sm text-pan-muted mt-2">{hero.subtitle}</p>
            <div className="flex gap-3 justify-center mt-6">
              <span className="px-4 py-2 bg-pan-accent text-white text-xs rounded-sm">{hero.cta1}</span>
              <span className="px-4 py-2 border border-white/20 text-white text-xs rounded-sm">{hero.cta2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
