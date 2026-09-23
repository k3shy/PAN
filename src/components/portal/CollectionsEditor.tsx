import { useState } from 'react';
import { useContent, Collection } from '../../context/ContentContext';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function CollectionsEditor() {
  const { content, updateCollections } = useContent();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Collection>>({});

  const startEdit = (collection: Collection) => {
    setEditingId(collection.id);
    setEditForm({ ...collection });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.title) return;
    const updated = content.collections.map(c =>
      c.id === editingId ? { ...c, ...editForm } as Collection : c
    );
    updateCollections(updated);
    cancelEdit();
  };

  const deleteCollection = (id: number) => {
    updateCollections(content.collections.filter(c => c.id !== id));
  };

  const addCollection = () => {
    const newId = Math.max(...content.collections.map(c => c.id), 0) + 1;
    const newCollection: Collection = {
      id: newId,
      title: 'New Collection',
      subtitle: 'Collection',
      description: 'Collection description here.',
      items: '0 Pieces',
      pattern: 'dots',
    };
    updateCollections([...content.collections, newCollection]);
    startEdit(newCollection);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-grotesk font-bold text-pan-white">Collections</h2>
          <p className="text-sm text-pan-muted mt-1">{content.collections.length} collections</p>
        </div>
        <button
          onClick={addCollection}
          className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
        >
          <Plus size={16} />
          Add Collection
        </button>
      </div>

      <div className="space-y-3">
        {content.collections.map(collection => (
          <div
            key={collection.id}
            className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden"
          >
            {editingId === collection.id ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editForm.subtitle || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-pan-muted mb-1">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Item Count</label>
                    <input
                      type="text"
                      value={editForm.items || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, items: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                      placeholder="e.g. 12 Pieces"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Pattern</label>
                    <select
                      value={editForm.pattern || 'dots'}
                      onChange={(e) => setEditForm(prev => ({ ...prev, pattern: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    >
                      <option value="diagonal">Diagonal Lines</option>
                      <option value="dots">Dots</option>
                      <option value="grid">Grid</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all">
                    <Check size={16} /> Save
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-pan-muted text-sm rounded-sm hover:border-white/30 transition-all">
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pan-accent/20 to-pan-dark rounded-sm flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="text-pan-accent font-grotesk font-bold text-lg">{collection.title.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-pan-white">{collection.title}</h3>
                  <p className="text-xs text-pan-muted mt-0.5">{collection.subtitle} • {collection.items}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(collection)} className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-pan-white hover:bg-pan-light rounded-sm transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteCollection(collection.id)} className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-red-400 hover:bg-pan-light rounded-sm transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
