import { useState } from 'react';
import { useContent, SocialLink } from '../../context/ContentContext';
import { Link2, ExternalLink, Check, X, Plus, Trash2 } from 'lucide-react';

const platformOptions = [
  { value: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourbrand' },
  { value: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourbrand' },
  { value: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourbrand' },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/254700000000' },
  { value: 'twitter', label: 'Twitter/X', placeholder: 'https://x.com/yourbrand' },
  { value: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourbrand' },
  { value: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/yourbrand' },
  { value: 'snapchat', label: 'Snapchat', placeholder: 'https://snapchat.com/add/yourbrand' },
  { value: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourbrand' },
  { value: 'threads', label: 'Threads', placeholder: 'https://threads.net/@yourbrand' },
];

function PlatformIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  switch (icon) {
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.12z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.166.053C6.66.053 2.18 4.533 2.18 10.04c0 1.527.344 2.975.956 4.267-.163.356-.425.785-.844 1.093-.469.344-.875.469-1.063.5-.094.031-.156.094-.156.188 0 .125.094.219.219.25.031.031 1.031.313 2.156.5.063.031.125.063.188.125.063.094.031.219-.031.313-.531.75-.906 1.344-.906 1.719 0 .063.031.125.063.156.063.063.156.094.25.063.094-.031 1.844-.531 3.781-.531.656 0 1.313.063 1.906.188.969.219 1.844.656 2.688 1.313.031.031.063.031.094.031s.063 0 .094-.031c.844-.656 1.719-1.094 2.688-1.313.594-.125 1.25-.188 1.906-.188 1.938 0 3.688.5 3.781.531.094.031.188 0 .25-.063.031-.031.063-.094.063-.156 0-.375-.375-.969-.906-1.719-.063-.094-.094-.219-.031-.313.063-.063.125-.094.188-.125 1.125-.188 2.125-.469 2.156-.5.125-.031.219-.125.219-.25 0-.094-.063-.156-.156-.188-.188-.031-.594-.156-1.063-.5-.419-.313-.681-.737-.844-1.094.613-1.291.956-2.739.956-4.266C22.152 4.533 17.672.053 12.166.053z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'threads':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.577.878-6.43 2.523-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.518 3.616 8.914 3.59 12c.025 3.086.718 5.483 2.058 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.612-3.593 1.097-4.768-.347-.795-.963-1.42-1.803-1.857-.182 1.396-.624 2.56-1.32 3.468-.91 1.187-2.247 1.946-3.76 2.148-1.257.169-2.477-.047-3.43-.606-1.194-.7-1.905-1.883-1.958-3.255-.051-1.32.56-2.52 1.678-3.285.875-.598 2.02-.982 3.305-1.112.963-.098 1.88-.07 2.72.07-.09-.623-.31-1.107-.662-1.447-.47-.455-1.21-.687-2.14-.693-.727-.004-1.39.167-1.97.503l-.93-1.638c.87-.498 1.87-.755 2.92-.755 1.427.008 2.54.424 3.31 1.236.693.73 1.095 1.736 1.2 2.996.49.26.92.574 1.282.94.87.88 1.39 2.03 1.54 3.41.17 1.58-.16 3.04-1.02 4.35-1.03 1.56-2.68 2.67-4.78 3.21-1.09.28-2.27.42-3.5.42z" />
        </svg>
      );
    default:
      return <Link2 size={size} />;
  }
}

export default function SocialMediaEditor() {
  const { content, updateSocials } = useContent();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<SocialLink>>({});

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...content.socials[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.url) return;
    const updated = [...content.socials];
    updated[editingIndex!] = { ...updated[editingIndex!], ...editForm } as SocialLink;
    updateSocials(updated);
    cancelEdit();
  };

  const toggleEnabled = (index: number) => {
    const updated = [...content.socials];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    updateSocials(updated);
  };

  const deleteSocial = (index: number) => {
    const updated = content.socials.filter((_, i) => i !== index);
    updateSocials(updated);
  };

  const addSocial = () => {
    const newSocial: SocialLink = {
      platform: 'Custom',
      url: '',
      icon: 'instagram',
      enabled: true,
    };
    updateSocials([...content.socials, newSocial]);
    startEdit(content.socials.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-grotesk font-bold text-pan-white">Social Media</h2>
          <p className="text-sm text-pan-muted mt-1">Manage your brand's social media links</p>
        </div>
        <button
          onClick={addSocial}
          className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
        >
          <Plus size={16} />
          Add Social
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/10 border border-blue-900/20 rounded-sm p-4">
        <p className="text-xs text-blue-400">
          <strong>How to connect:</strong> Paste your full social media profile URL (e.g., https://instagram.com/yourbrand). 
          Toggle platforms on/off to show or hide them on your website. Changes appear instantly on the live site.
        </p>
      </div>

      {/* Social Links List */}
      <div className="space-y-3">
        {content.socials.map((social, index) => (
          <div
            key={index}
            className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden"
          >
            {editingIndex === index ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Platform</label>
                    <select
                      value={editForm.icon || 'instagram'}
                      onChange={(e) => {
                        const option = platformOptions.find(p => p.value === e.target.value);
                        setEditForm(prev => ({
                          ...prev,
                          icon: e.target.value,
                          platform: option?.label || 'Custom',
                        }));
                      }}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    >
                      {platformOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-pan-muted mb-1">Profile URL</label>
                    <input
                      type="url"
                      value={editForm.url || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, url: e.target.value }))}
                      placeholder={platformOptions.find(p => p.value === editForm.icon)?.placeholder || 'https://...'}
                      className="w-full px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.enabled || false}
                      onChange={(e) => setEditForm(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="w-4 h-4 accent-pan-accent"
                    />
                    <span className="text-sm text-pan-muted">Show on website</span>
                  </label>
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
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${
                  social.enabled ? 'bg-pan-accent/10 text-pan-accent' : 'bg-pan-gray text-pan-muted'
                }`}>
                  <PlatformIcon icon={social.icon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-pan-white">{social.platform}</h3>
                    {!social.enabled && (
                      <span className="px-1.5 py-0.5 bg-gray-600/30 text-gray-400 text-[9px] font-bold rounded-sm">HIDDEN</span>
                    )}
                  </div>
                  <p className="text-xs text-pan-muted mt-0.5 truncate">{social.url || 'No URL set'}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleEnabled(index)}
                    className={`px-2 py-1 text-[10px] rounded-sm border transition-all ${
                      social.enabled
                        ? 'border-green-500/30 text-green-400 bg-green-500/10'
                        : 'border-white/10 text-pan-muted'
                    }`}
                  >
                    {social.enabled ? 'Visible' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => startEdit(index)}
                    className="w-8 h-8 flex items-center justify-center text-pan-muted hover:text-pan-white hover:bg-pan-light rounded-sm transition-all"
                  >
                    <Link2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteSocial(index)}
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

      {/* Preview */}
      <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
        <p className="text-xs text-pan-muted mb-4">Preview (what appears in footer)</p>
        <div className="flex gap-3">
          {content.socials.filter(s => s.enabled).map((social, index) => (
            <a
              key={index}
              href={social.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-pan-gray border border-white/10 rounded-sm flex items-center justify-center hover:bg-pan-accent hover:border-pan-accent transition-all duration-300 text-pan-muted hover:text-white"
            >
              <PlatformIcon icon={social.icon} size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
