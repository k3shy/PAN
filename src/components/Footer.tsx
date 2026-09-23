import { Instagram, Facebook, MessageCircle, Music2, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pan-black border-t border-white/5">
      {/* Payment Methods Bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs tracking-[0.2em] text-pan-muted text-center mb-6">SECURE PAYMENT METHODS</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {/* M-Pesa */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[7px] font-bold">M</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">M-Pesa</span>
            </div>

            {/* Pesapal */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[7px] font-bold">P</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">Pesapal</span>
            </div>

            {/* Mastercard */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="flex -space-x-1 flex-shrink-0">
                <div className="w-3.5 h-3.5 bg-red-600 rounded-full"></div>
                <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">Mastercard</span>
            </div>

            {/* Visa */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="w-5 h-5 bg-blue-700 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[7px] font-bold italic">V</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">Visa</span>
            </div>

            {/* American Express */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[6px] font-bold">AMEX</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">Amex</span>
            </div>

            {/* Airtel Money */}
            <div className="flex items-center gap-2 px-3 py-2 bg-pan-dark border border-white/10 rounded-sm">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[7px] font-bold">A</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-pan-white">Airtel Money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-pan-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs font-grotesk">P</span>
              </div>
              <div>
                <h3 className="text-lg font-grotesk font-bold tracking-tight">PINS & NEEDLE</h3>
                <p className="text-[10px] tracking-[0.3em] text-pan-muted -mt-0.5">P.A.N STREETWEAR</p>
              </div>
            </div>
            <p className="text-sm text-pan-muted leading-relaxed mb-6">
              Where precision meets street culture. Every stitch tells a story. Premium streetwear designed for those who dare to stand out.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-pan-dark border border-white/10 rounded-sm flex items-center justify-center hover:bg-pan-accent hover:border-pan-accent transition-all duration-300" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-pan-dark border border-white/10 rounded-sm flex items-center justify-center hover:bg-pan-accent hover:border-pan-accent transition-all duration-300" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-pan-dark border border-white/10 rounded-sm flex items-center justify-center hover:bg-pan-accent hover:border-pan-accent transition-all duration-300" aria-label="TikTok">
                <Music2 size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-pan-dark border border-white/10 rounded-sm flex items-center justify-center hover:bg-pan-accent hover:border-pan-accent transition-all duration-300" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-pan-white mb-4 tracking-wider">SHOP</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Tops</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Bottoms</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Accessories</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Collections</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-pan-white mb-4 tracking-wider">SUPPORT</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Delivery & Returns</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-pan-white mb-4 tracking-wider">LEGAL</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-sm text-pan-muted hover:text-pan-white transition-colors">Disclaimer</a></li>
            </ul>

            <h4 className="text-sm font-semibold text-pan-white mb-3 tracking-wider">CONTACT</h4>
            <div className="space-y-2">
              <a href="tel:+254700000000" className="flex items-center gap-2 text-sm text-pan-muted hover:text-pan-white transition-colors">
                <Phone size={14} />
                +254 700 000 000
              </a>
              <a href="mailto:info@pinsandneedle.com" className="flex items-center gap-2 text-sm text-pan-muted hover:text-pan-white transition-colors">
                <Mail size={14} />
                info@pinsandneedle.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-pan-muted text-center md:text-left">
            © 2026 Pins & Needle (P.A.N). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-pan-muted text-center">Designed with precision. Worn with pride.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
