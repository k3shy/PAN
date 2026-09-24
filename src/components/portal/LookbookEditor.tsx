import { useState } from 'react';
import { useContent, LookbookItem } from '../../context/ContentContext';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function LookbookEditor() {
  const { content, updateLookbook } = useContent();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<LookbookItem>>({});

  const startEdit = (item: LookbookItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.title) return;
    const updated = content.lookbook.map(l =>
      l.id === editingId ? { ...l, ...editForm } as LookbookItem : l
    );
    updateLookbook(updated);
    cancelEdit();
  };

  const deleteItem = (id: number) => {
    updateLookbook(content.lookbook.filter(l => l.id !== id));
  };

  const addItem = () => {
    const newId = Math.max(...content.lookbook.map(l => l.id), 0) + 1;
    const newItem: LookbookItem = {
      id: newId,
      title: 'New Look',
      items: 'Item 1 + Item 2',
      bgColor: '#1a1a1a',
      accentColor: '#e63946',
      span: '',
      minH: 'min-h-[240px]',
    };
    updateLookbook([...content.lookbook, newItem]);
    startEdit(newItem);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-grotesk font-bold text-pan-white">Lookbook</h2>
          <p className="text-sm text-pan-muted mt-1">{content.lookbook.length} looks</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
        >
          <Plus size={16} />
          Add Look
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.lookbook.map(item => (
          <div
            key={item.id}
            className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden"
          >
            {editingId === item.id ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
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
                    <label className="block text-xs text-pan-muted mb-1">Items</label>
                    <input
                      type="text"
                      value={editForm.items || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, items: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-pan-muted mb-1">Background Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={editForm.bgColor || '#1a1a1a'}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bgColor: e.target.value }))}
                          className="w-10 h-10 rounded-sm cursor-pointer"
                        />
                        <input
                          type="text"
                          value={editForm.bgColor || '#1a1a1a'}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bgColor: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-pan-muted mb-1">Accent Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={editForm.accentColor || '#e63946'}
                          onChange={(e) => setEditForm(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-10 h-10 rounded-sm cursor-pointer"
                        />
                        <input
                          type="text"
                          value={editForm.accentColor || '#e63946'}
                          onChange={(e) => setEditForm(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Layout</label>
                    <select
                      value={editForm.span || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, span: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    >
                      <option value="">Normal (1 column)</option>
                      <option value="md:col-span-2">Wide (2 columns)</option>
                      <option value="md:col-span-2 md:row-span-2">Large (2x2)</option>
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
                <div
                  className="w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <span className="text-2xl font-grotesk font-bold text-white/20">{item.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-pan-white">{item.title}</h3>
                  <p className="text-xs text-pan-muted mt-0.5">{item.items}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(item)} className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-pan-white hover:bg-pan-light rounded-sm transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-red-400 hover:bg-pan-light rounded-sm transition-all">
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
