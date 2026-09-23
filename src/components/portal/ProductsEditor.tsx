import { useState } from 'react';
import { useContent, Product } from '../../context/ContentContext';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function ProductsEditor() {
  const { content, updateProducts } = useContent();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.name || !editForm.price) return;
    const updated = content.products.map(p =>
      p.id === editingId ? { ...p, ...editForm } as Product : p
    );
    updateProducts(updated);
    cancelEdit();
  };

  const deleteProduct = (id: number) => {
    updateProducts(content.products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    const newId = Math.max(...content.products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      id: newId,
      name: 'New Product',
      price: 0,
      category: 'tops',
      sizes: ['S', 'M', 'L'],
      bgColor: '#1a1a1a',
      accentColor: '#e63946',
      icon: 'tee',
    };
    updateProducts([...content.products, newProduct]);
    startEdit(newProduct);
  };

  const toggleNew = (id: number) => {
    const updated = content.products.map(p =>
      p.id === id ? { ...p, isNew: !p.isNew } : p
    );
    updateProducts(updated);
  };

  const toggleSoldOut = (id: number) => {
    const updated = content.products.map(p =>
      p.id === id ? { ...p, isSoldOut: !p.isSoldOut } : p
    );
    updateProducts(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-grotesk font-bold text-pan-white">Products</h2>
          <p className="text-sm text-pan-muted mt-1">{content.products.length} products total</p>
        </div>
        <button
          onClick={addProduct}
          className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {content.products.map(product => (
          <div
            key={product.id}
            className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden"
          >
            {editingId === product.id ? (
              /* Edit Mode */
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Price (KSh)</label>
                    <input
                      type="number"
                      value={editForm.price || 0}
                      onChange={(e) => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Category</label>
                    <select
                      value={editForm.category || 'tops'}
                      onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    >
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Sizes (comma separated)</label>
                    <input
                      type="text"
                      value={(editForm.sizes || []).join(', ')}
                      onChange={(e) => setEditForm(prev => ({ ...prev, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
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

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.isNew || false}
                      onChange={(e) => setEditForm(prev => ({ ...prev, isNew: e.target.checked }))}
                      className="w-4 h-4 accent-pan-accent"
                    />
                    <span className="text-sm text-pan-muted">Mark as New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.isSoldOut || false}
                      onChange={(e) => setEditForm(prev => ({ ...prev, isSoldOut: e.target.checked }))}
                      className="w-4 h-4 accent-pan-accent"
                    />
                    <span className="text-sm text-pan-muted">Mark as Sold Out</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 text-pan-muted text-sm rounded-sm hover:border-white/30 transition-all"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex items-center gap-4 p-4">
                <div
                  className="w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: product.bgColor }}
                >
                  <span className="text-white/40 font-grotesk font-bold text-sm">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-pan-white truncate">{product.name}</h3>
                    {product.isNew && <span className="px-1.5 py-0.5 bg-pan-accent text-white text-[9px] font-bold rounded-sm">NEW</span>}
                    {product.isSoldOut && <span className="px-1.5 py-0.5 bg-gray-600 text-white text-[9px] font-bold rounded-sm">SOLD OUT</span>}
                  </div>
                  <p className="text-xs text-pan-muted mt-0.5">
                    KSh {product.price.toLocaleString()} • {product.category} • Sizes: {product.sizes.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleNew(product.id)}
                    className={`px-2 py-1 text-[10px] rounded-sm border transition-all ${
                      product.isNew ? 'border-pan-accent text-pan-accent bg-pan-accent/10' : 'border-white/10 text-pan-muted'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => toggleSoldOut(product.id)}
                    className={`px-2 py-1 text-[10px] rounded-sm border transition-all ${
                      product.isSoldOut ? 'border-gray-500 text-gray-400 bg-gray-500/10' : 'border-white/10 text-pan-muted'
                    }`}
                  >
                    Sold Out
                  </button>
                  <button
                    onClick={() => startEdit(product)}
                    className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-pan-white hover:bg-pan-light rounded-sm transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-red-400 hover:bg-pan-light rounded-sm transition-all"
                  >
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
