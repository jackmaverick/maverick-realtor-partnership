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

1. Commit your changes in this `website/` repo.
2. Push to `main` (remote is `https://github.com/jackmaverick/maverick-realtor-partnership.git`).
3. Vercel auto-builds and deploys the latest commit.
4. Hard-refresh the live site to verify the update.

> 🔁 **Tip:** The root project also tracks everything at `git@github.com:jackmaverick/maverick-exteriors.git`. Push there too whenever you want the umbrella repo to stay current.

## 🧩 Form Automation Flow

Every form on the site (general, inspection, partnership) uses the shared `ContactForm` component and posts JSON to `/api/{formType}`. Each API route:

1. Validates + normalizes the payload
2. Adds metadata (formKey, priority, submittedAt, hidden fields)
3. Forwards everything to your **n8n webhook** (`N8N_WEBHOOK_URL`)

From n8n you can branch into JobNimbus, OpenPhone, Google Sheets, Gmail, Slack, etc. The Astro app no longer needs direct JobNimbus credentials—the webhook decides what systems are triggered.

**Environment variables**

| Variable | Purpose |
| --- | --- |
| `N8N_WEBHOOK_URL` | Main automation endpoint (receives every submission) |
| `GOOGLE_PLACES_API_KEY` | Powers address autocomplete + structured address metadata |
| `PUBLIC_GA4_ID` | Client-side Google Analytics 4 tracking |
| `PUBLIC_CLARITY_ID` *(optional)* | Microsoft Clarity session recording |

> Still want to hit JobNimbus directly from Astro? `src/lib/jobnimbus.ts` remains available—wire it into the API routes or invoke it from n8n. The default path is webhook-first.

For a deeper dive into component usage, API handlers, and downstream routing, see `../forms-routing-overview.md`.

## 📊 Next Steps (TODO)

- [ ] Add `N8N_WEBHOOK_URL` + `GOOGLE_PLACES_API_KEY` to `.env.local` and Vercel
- [ ] Build/confirm the n8n workflow (JobNimbus, OpenPhone, Sheets, Gmail, Slack)
- [ ] Configure notifications inside n8n (OpenPhone, Slack, email, etc.) or enable Gmail auto replies as needed
- [x] Add Google Analytics 4 *(set `PUBLIC_GA4_ID` in `.env` or Vercel)*
- [x] Add Microsoft Clarity for heatmaps *(set `PUBLIC_CLARITY_ID`)*
- [ ] Upload real images (replace placeholders)
- [ ] Configure custom domain

### Analytics Configuration

Set these environment variables locally (`.env.local`) and in Vercel:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_GA4_ID` | GA4 measurement ID (`G-XXXXXXX`) used for site-wide analytics |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity project ID for session recordings/heatmaps |

Key interactions tracked automatically once the IDs are present:

- Hero, header, footer, and other CTAs with `data-analytics-cta`
- Click-to-call links (`tel:`) and email links (`mailto:`)
- Form submissions (partnership, inspection, general inquiry) including lead type metadata

Client-side tracking logic lives in `src/scripts/analytics.client.ts` and uses helpers from `src/utils/analytics.ts`. Extend the data attributes when adding new CTAs to keep reporting consistent.

Vercel Analytics is enabled globally via `<Analytics />` in `src/layouts/BaseLayout.astro`. Once deployed, view traffic and engagement inside the Vercel project dashboard.

## 📞 Contact

**Maverick Exteriors**
Phone: (913) 298-8759
Kansas City, Kansas

---

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
# Deployment Test - Thu Oct  9 09:32:21 CDT 2025
