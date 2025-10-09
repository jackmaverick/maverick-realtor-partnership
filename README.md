# Realtor Partnership Website

A modern, SEO-optimized website built for Maverick Exteriors to serve real estate professionals in the Kansas City metro area.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server: **http://localhost:4321/**

## 📁 Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── forms/        # ContactForm
│   │   ├── sections/     # DualColumnSection
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CTAButton.astro
│   │   └── TrustBadges.astro
│   ├── data/             # locations.json
│   ├── layouts/          # BaseLayout.astro
│   ├── pages/            # Routes
│   │   ├── api/         # Form handlers
│   │   ├── locations/   # Dynamic pages
│   │   ├── index.astro  # Homepage
│   │   ├── services.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── styles/          # global.css
│   └── utils/           # seo.ts, analytics.ts
├── astro.config.mjs
├── tailwind.config.mjs
└── DESIGN-SYSTEM.md
```

## 📄 Pages

- **Homepage** (`/`) - Hero, dual-column buyer/seller sections, CTAs
- **Services** (`/services`) - Detailed realtor services, contract guidance
- **Locations** (`/locations`) - 6 high-value KC neighborhoods with SEO content
- **About** (`/about`) - Company story, partnership program tiers
- **Contact** (`/contact`) - Three form types (partnership, inspection, general)

## 🎨 Design System

- **Colors**: Primary blue (#3b82f6), accent purple
- **Typography**: Inter font
- **Mobile-First**: Responsive on all devices
- **Components**: CTAButton, TrustBadges, forms, sections

See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for details.

## 🔧 Key Features

✅ **SEO-Optimized**: Dynamic meta tags, sitemaps, structured data
✅ **Location Pages**: 6 cities with 800+ words each
✅ **Forms**: Partnership, inspection, general inquiry
✅ **API Routes**: `/api/partnership`, `/api/inspection`, `/api/general`
✅ **Mobile-First**: Touch-friendly, click-to-call
✅ **Fast**: Astro's zero-JS approach, Vercel edge deployment

## 🚢 Deployment to Vercel

1. Push to GitHub
2. Import in Vercel dashboard
3. Set framework to **Astro**
4. Deploy!

## 📊 Next Steps (TODO)

- [ ] Add environment variables for API keys
- [ ] Integrate JobNimbus CRM
- [ ] Set up email notifications (SendGrid/Resend)
- [ ] Add Google Analytics 4
- [ ] Add Microsoft Clarity for heatmaps
- [ ] Upload real images (replace placeholders)
- [ ] Configure custom domain

## 📞 Contact

**Maverick Exteriors**
Phone: (913) 298-8759
Kansas City, Kansas

---

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
# Deployment Test - Thu Oct  9 09:32:21 CDT 2025
