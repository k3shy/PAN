import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
  bgColor: string;
  accentColor: string;
  icon: string;
}

export interface Collection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  items: string;
  pattern: string;
}

export interface LookbookItem {
  id: number;
  title: string;
  items: string;
  bgColor: string;
  accentColor: string;
  span: string;
  minH: string;
}

export interface HeroContent {
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  tagline: string;
  cta1: string;
  cta2: string;
}

export interface AboutContent {
  title1: string;
  title2: string;
  paragraphs: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface SiteContent {
  products: Product[];
  collections: Collection[];
  lookbook: LookbookItem[];
  hero: HeroContent;
  about: AboutContent;
  socials: SocialLink[];
  lastUpdated: string;
}

const defaultContent: SiteContent = {
  products: [
    { id: 1, name: "P.A.N Oversized Hoodie", price: 5000, category: "tops", sizes: ["S", "M", "L", "XL"], isNew: true, bgColor: "#1a1a1a", accentColor: "#e63946", icon: "hoodie" },
    { id: 2, name: "Needle Cargo Pants", price: 4200, category: "bottoms", sizes: ["S", "M", "L", "XL"], isNew: true, bgColor: "#1c1c1c", accentColor: "#4a9eff", icon: "pants" },
    { id: 3, name: "Thread Theory Tee", price: 3000, category: "tops", sizes: ["S", "M", "L", "XL"], bgColor: "#181818", accentColor: "#f5f5f5", icon: "tee" },
    { id: 4, name: "Stitch Bomber Jacket", price: 8500, category: "tops", sizes: ["M", "L", "XL"], isNew: true, bgColor: "#1e1e1e", accentColor: "#e63946", icon: "jacket" },
    { id: 5, name: "P.A.N Track Pants", price: 3800, category: "bottoms", sizes: ["S", "M", "L"], bgColor: "#191919", accentColor: "#4a9eff", icon: "pants" },
    { id: 6, name: "Embroidered Cap", price: 2500, category: "accessories", sizes: ["One Size"], bgColor: "#1b1b1b", accentColor: "#f5f5f5", icon: "cap" },
    { id: 7, name: "Deconstructed Crewneck", price: 4500, category: "tops", sizes: ["S", "M", "L", "XL"], isSoldOut: true, bgColor: "#1a1a1a", accentColor: "#888", icon: "tee" },
    { id: 8, name: "P.A.N Utility Shorts", price: 3200, category: "bottoms", sizes: ["S", "M", "L"], bgColor: "#1c1c1c", accentColor: "#4a9eff", icon: "shorts" },
  ],
  collections: [
    { id: 1, title: "Thread Theory", subtitle: "SS26 Collection", description: "Deconstructed silhouettes meet urban utility. Bold cuts, raw edges, and fearless design.", items: "12 Pieces", pattern: "diagonal" },
    { id: 2, title: "Needle Point", subtitle: "Essentials", description: "Premium basics with precision tailoring. The foundation of every great outfit.", items: "8 Pieces", pattern: "dots" },
    { id: 3, title: "Stitch Culture", subtitle: "Limited Drop", description: "Exclusive collab pieces — once gone, gone forever. Only 100 made worldwide.", items: "6 Pieces", pattern: "grid" },
  ],
  lookbook: [
    { id: 1, title: "Urban Night", items: "Oversized Hoodie + Cargo Pants", bgColor: "#1a1a1a", accentColor: "#e63946", span: "md:col-span-2 md:row-span-2", minH: "min-h-[300px] md:min-h-[500px]" },
    { id: 2, title: "Minimal Edge", items: "Thread Theory Tee + Track Pants", bgColor: "#1c1c1c", accentColor: "#4a9eff", span: "", minH: "min-h-[240px]" },
    { id: 3, title: "Raw Stitch", items: "Bomber Jacket + Utility Shorts", bgColor: "#181818", accentColor: "#e63946", span: "", minH: "min-h-[240px]" },
    { id: 4, title: "Street Ready", items: "Crewneck + Cap + Cargo Pants", bgColor: "#1b1b1b", accentColor: "#f5f5f5", span: "md:col-span-2", minH: "min-h-[240px]" },
  ],
  hero: {
    badge: "SS26 Collection Now Live",
    title1: "PINS &",
    title2: "NEEDLE",
    subtitle: "Where precision meets street culture. Every stitch tells a story.",
    tagline: "P . A . N",
    cta1: "Shop Collection",
    cta2: "View Lookbook",
  },
  about: {
    title1: "Born From",
    title2: "The Streets",
    paragraphs: [
      "Pins & Needle was founded on the belief that streetwear should be more than just clothing — it should be a statement. Every piece we create is a reflection of urban culture, artistic expression, and uncompromising quality.",
      "Our name represents the precision of our craft. Like a needle threading through fabric, we stitch together culture, design, and identity into wearable art that speaks volumes without saying a word.",
      "From our first drop to our latest collection, we remain committed to pushing boundaries and redefining what streetwear can be.",
    ],
  },
  socials: [
    { platform: "Instagram", url: "https://instagram.com/pinsandneedle", icon: "instagram", enabled: true },
    { platform: "Facebook", url: "https://facebook.com/pinsandneedle", icon: "facebook", enabled: true },
    { platform: "TikTok", url: "https://tiktok.com/@pinsandneedle", icon: "tiktok", enabled: true },
    { platform: "WhatsApp", url: "https://wa.me/254700000000", icon: "whatsapp", enabled: true },
    { platform: "Twitter/X", url: "https://x.com/pinsandneedle", icon: "twitter", enabled: false },
    { platform: "YouTube", url: "https://youtube.com/@pinsandneedle", icon: "youtube", enabled: false },
  ],
  lastUpdated: new Date().toISOString(),
};

interface ContentContextType {
  content: SiteContent;
  updateProducts: (products: Product[]) => void;
  updateCollections: (collections: Collection[]) => void;
  updateLookbook: (lookbook: LookbookItem[]) => void;
  updateHero: (hero: HeroContent) => void;
  updateAbout: (about: AboutContent) => void;
  updateSocials: (socials: SocialLink[]) => void;
  resetContent: () => void;
  hasUnsavedChanges: boolean;
  saveChanges: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    const stored = localStorage.getItem('pan_content');
    return stored ? JSON.parse(stored) : defaultContent;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateProducts = (products: Product[]) => {
    setContent(prev => ({ ...prev, products, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const updateCollections = (collections: Collection[]) => {
    setContent(prev => ({ ...prev, collections, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const updateLookbook = (lookbook: LookbookItem[]) => {
    setContent(prev => ({ ...prev, lookbook, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const updateHero = (hero: HeroContent) => {
    setContent(prev => ({ ...prev, hero, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const updateAbout = (about: AboutContent) => {
    setContent(prev => ({ ...prev, about, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const updateSocials = (socials: SocialLink[]) => {
    setContent(prev => ({ ...prev, socials, lastUpdated: new Date().toISOString() }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    localStorage.setItem('pan_content', JSON.stringify(content));
    setHasUnsavedChanges(false);
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('pan_content', JSON.stringify(defaultContent));
    setHasUnsavedChanges(false);
  };

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    
    const timer = setInterval(() => {
      saveChanges();
    }, 30000);

    return () => clearInterval(timer);
  }, [hasUnsavedChanges]);

  return (
    <ContentContext.Provider value={{
      content,
      updateProducts,
      updateCollections,
      updateLookbook,
      updateHero,
      updateAbout,
      updateSocials,
      resetContent,
      hasUnsavedChanges,
      saveChanges,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
}
