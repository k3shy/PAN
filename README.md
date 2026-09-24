# Pins And Needle (P.A.N) - Premium Streetwear

A modern, full-featured e-commerce website for a streetwear brand with employee portal, custom orders, and comprehensive content management.

![P.A.N Streetwear](https://img.shields.io/badge/P.A.N-Streetwear-e63946?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)

## 🌟 Features

### Customer-Facing
- 🛍️ **Product Catalog** - Filterable, searchable product grid with quick view
- 🛒 **Shopping Cart** - Full cart functionality with promo codes
- ❤️ **Wishlist** - Save favorite items
- 💱 **Multi-Currency** - KSh, USD, EUR support
- 📏 **Size Guide** - Comprehensive sizing information
- 📦 **Order Tracking** - Track order status
- ❓ **FAQ** - Searchable knowledge base
- 🎨 **Custom Orders** - Image upload for custom designs
- ⏰ **Sale Countdown** - Limited drop timers
- 📱 **Mobile Optimized** - Bottom navigation, responsive design

### Employee Portal (`/login`)
- 👤 **Role-Based Access** - Admin, Editor, Content Manager, Viewer
- 📝 **Content Management** - Edit products, collections, hero, about sections
- 🖼️ **Media Management** - Upload and manage product images
- 🔗 **Social Media** - Manage social links without code
- 📊 **Analytics Dashboard** - View store metrics
- 👥 **User Management** - Manage employee accounts (Admin only)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pins-and-needle.git
cd pins-and-needle

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🔐 Demo Accounts

Access the employee portal at `/login`:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| Admin | admin@pan.com | demo123 | Full access |
| Editor | editor@pan.com | demo123 | Products, collections, lookbook |
| Content | content@pan.com | demo123 | Hero, about, newsletter |
| Viewer | viewer@pan.com | demo123 | Read-only + analytics |

## 📁 Project Structure

```
pins-and-needle/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── portal/       # Employee portal editors
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Cart.tsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── ContentContext.tsx
│   │   └── CurrencyContext.tsx
│   ├── pages/            # Page components
│   │   ├── MainSite.tsx
│   │   ├── Portal.tsx
│   │   ├── CustomOrders.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── public/               # Static assets
├── dist/                 # Production build (generated)
└── package.json
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: localStorage (demo) / Ready for backend integration

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_PAYMENT_GATEWAY=your_key
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Payment Methods
Currently configured for demo:
- M-Pesa
- Pesapal
- Mastercard
- Visa
- American Express
- Airtel Money

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Main homepage |
| `/wishlist` | Saved items |
| `/order-tracking` | Track orders |
| `/faq` | Frequently asked questions |
| `/size-guide` | Sizing information |
| `/custom-orders` | Custom design uploads |
| `/login` | Employee portal login |
| `/portal` | Employee dashboard |

## 🎨 Customization

### Colors
Edit `src/index.css`:
```css
--color-pan-accent: #e63946;  /* Primary accent */
--color-pan-black: #0a0a0a;   /* Background */
```

### Fonts
Uses Space Grotesk and Inter from Google Fonts.

### Content
All content is managed through the employee portal or `ContentContext`.

## 📊 Performance

- **Bundle Size**: ~347KB JS (93KB gzipped)
- **First Paint**: ~1.2s
- **Lighthouse Score**: 90+ (estimated)

## 🔒 Security Notes

- Demo uses localStorage (not for production)
- Implement proper backend authentication
- Use HTTPS in production
- Add rate limiting for API endpoints
- Validate all user inputs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary. All rights reserved.

## 🆘 Support

For issues and questions:
- Email: support@pinsandneedle.com
- WhatsApp: +254 700 000 000

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA capabilities

---

**Built with ❤️ for P.A.N Streetwear**
