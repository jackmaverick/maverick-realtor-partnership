# Design System Documentation

## Overview

This design system is inspired by ChatPRD.ai's clean, professional aesthetic adapted for a roofing/real estate professional audience.

## Color Palette

### Primary (Violet) - #6366f1
- **Use:** Main CTAs, links, primary emphasis, buyer's agent sections
- **Colors:**
  - `primary-400`: #818cf8 (Light violet - backgrounds)
  - `primary-500`: #6366f1 (Main violet - buttons, links)
  - `primary-600`: #4f46e5 (Hover states)
  - `primary-700`: #4338ca (Indigo - active/pressed states)

### Accent (Pink) - #ec4899
- **Use:** Secondary CTAs, highlights, seller's agent sections
- **Colors:**
  - `accent-400`: #f472b6 (Light pink - backgrounds)
  - `accent-500`: #ec4899 (Main pink - secondary buttons)
  - `accent-600`: #db2777 (Hover states)

### Rose - #f43f5e
- **Use:** Tertiary CTAs, seller-specific highlights, warm accents
- **Colors:**
  - `rose-400`: #fb7185
  - `rose-500`: #f43f5e
  - `rose-600`: #e11d48

### Cyan - #06b6d4
- **Use:** Trust signals, info badges, cool accents
- **Colors:**
  - `cyan-400`: #22d3ee
  - `cyan-500`: #06b6d4
  - `cyan-600`: #0891b2

### Emerald - #10b981
- **Use:** Success states, positive indicators, completed status
- **Colors:**
  - `emerald-400`: #34d399
  - `emerald-500`: #10b981
  - `emerald-600`: #059669

### Amber - #f59e0b
- **Use:** Warnings, attention grabbers, "featured" badges
- **Colors:**
  - `amber-400`: #fbbf24
  - `amber-500`: #f59e0b
  - `amber-600`: #d97706

### Orange - #f97316
- **Use:** Urgent CTAs, limited-time offers, high-priority items
- **Colors:**
  - `amber-400`: #fb923c
  - `orange-500`: #f97316
  - `orange-600`: #ea580c

### Gradients
- **gradient-primary**: Violet → Pink → Rose (Hero sections)
- **gradient-violet-pink**: Violet 400 → Pink 400 (Backgrounds)
- **gradient-pink-rose**: Pink 500 → Rose 500 (CTAs)

### Neutrals
- **Use:** Text, backgrounds, borders
- **Colors:**
  - Gray scale (50-950 from Tailwind default)
  - White (#ffffff) primary backgrounds
  - Slate-50 (#f8fafc) alternate backgrounds

## Typography

### Font Family
- **Primary:** Inter (Google Fonts)
- **Fallback:** system-ui, -apple-system, sans-serif

### Font Sizes
- **H1:** 4xl → 5xl → 6xl (responsive)
- **H2:** 3xl → 4xl → 5xl
- **H3:** 2xl → 3xl
- **Body:** base (16px)
- **Small:** sm (14px)

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing

Following Tailwind's default spacing scale (4px base):
- xs: 2 (8px)
- sm: 4 (16px)
- md: 6 (24px)
- lg: 8 (32px)
- xl: 12 (48px)
- 2xl: 16 (64px)

## Components

### Buttons
- **Primary:** bg-primary-600 hover:bg-primary-700 text-white
- **Secondary:** bg-accent-600 hover:bg-accent-700 text-white
- **Outline:** border-2 border-primary-600 text-primary-600 hover:bg-primary-50

### Cards
- Border: border border-gray-200
- Padding: p-6 md:p-8
- Rounded: rounded-lg
- Shadow: shadow-sm hover:shadow-md

### Forms
- Input: border-gray-300 focus:border-primary-500 focus:ring-primary-500
- Labels: text-sm font-medium text-gray-700
- Errors: text-red-600 text-sm

## Layout

### Container
- Max width: max-w-7xl
- Padding: px-4 md:px-6 lg:px-8
- Margin: mx-auto

### Grid
- Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Gap: gap-6 md:gap-8

### Sections
- Padding: py-12 md:py-16 lg:py-24
- Background alternation: white and gray-50

## Design Principles

1. **Clean & Minimal:** Generous whitespace, uncluttered layouts
2. **Professional:** Corporate-friendly colors and typography
3. **Mobile-First:** All designs optimized for mobile devices
4. **High Contrast:** Ensure accessibility with WCAG AA compliance
5. **Trust Signals:** Subtle badges, certifications, and social proof
6. **Clear CTAs:** Bold, action-oriented buttons with clear hierarchy

## Inspiration Source

ChatPRD.ai website characteristics:
- Bright, clean white backgrounds
- Blue primary color
- Two-column layouts for feature comparison
- Clear visual hierarchy
- Generous padding and spacing
- Modern sans-serif typography
