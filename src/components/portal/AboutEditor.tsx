import { useContent } from '../../context/ContentContext';
import { Plus, Trash2 } from 'lucide-react';

export default function AboutEditor() {
  const { content, updateAbout } = useContent();
  const { about } = content;

  const addParagraph = () => {
    updateAbout({ ...about, paragraphs: [...about.paragraphs, ''] });
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...about.paragraphs];
    newParagraphs[index] = value;
    updateAbout({ ...about, paragraphs: newParagraphs });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = about.paragraphs.filter((_, i) => i !== index);
    updateAbout({ ...about, paragraphs: newParagraphs });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-grotesk font-bold text-pan-white">About Section</h2>
        <p className="text-sm text-pan-muted mt-1">Edit the brand story and about section</p>
      </div>

      <div className="bg-pan-dark border border-white/5 rounded-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-pan-muted mb-2">Title Line 1</label>
            <input
              type="text"
              value={about.title1}
              onChange={(e) => updateAbout({ ...about, title1: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-pan-muted mb-2">Title Line 2 (Highlighted)</label>
            <input
              type="text"
              value={about.title2}
              onChange={(e) => updateAbout({ ...about, title2: e.target.value })}
              className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs text-pan-muted">Paragraphs</label>
            <button
              onClick={addParagraph}
              className="flex items-center gap-1 px-3 py-1 text-xs text-pan-accent hover:bg-pan-accent/10 rounded-sm transition-all"
            >
              <Plus size={12} />
              Add Paragraph
            </button>
          </div>
          <div className="space-y-3">
            {about.paragraphs.map((para, index) => (
              <div key={index} className="relative">
                <textarea
                  value={para}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 pr-10 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent transition-colors resize-none"
                  placeholder={`Paragraph ${index + 1}`}
                />
                {about.paragraphs.length > 1 && (
                  <button
                    onClick={() => removeParagraph(index)}
                    className="absolute top-3 right-3 text-pan-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
