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

## 🧩 Form + CRM Configuration

The contact, partnership, and inspection forms now push leads **directly into JobNimbus**—no Google Sheets or Gmail dependencies.

Set these environment variables in Vercel (and in your local `.env.local` if you want to test locally):

| Variable | Purpose |
| --- | --- |
| `JOBNIMBUS_API_KEY` | Personal access token for the JobNimbus API |
| `JOBNIMBUS_REALTOR_WORKFLOW_ID` *(optional)* | Workflow UUID/ID to auto-assign new inspection jobs |
| `JOBNIMBUS_TASK_ASSIGNEE_ID` *(optional)* | User ID to assign follow-up tasks (useful for automation/notifications) |

When a form is submitted:
- a JobNimbus contact is created with realtor-specific tags (`realtor-website`, form type, agent type, priority)
- inspection requests create a JobNimbus job (with address if provided) and are added to the realtor workflow if `JOBNIMBUS_REALTOR_WORKFLOW_ID` is set
- partnership inquiries get an automatic follow-up task (so you can trigger JobNimbus automations to email the lead and notify internal stakeholders)

Use JobNimbus Automations (Settings → Automations) to send the confirmation email and internal notifications when a contact or task with the `realtor-website` tag is created.

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
