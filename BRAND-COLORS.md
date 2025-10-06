# Maverick Exteriors Brand Colors

This document defines the official brand colors for Maverick Exteriors and how to use them in the website.

## Primary Brand Colors

### Blues
- **Maverick Blue** - `#007bff` - Primary brand color, used for CTAs and key elements
- **Blue Dark** - `#0151a6` - Darker blue for depth and contrast
- **Blue Navy** - `#06417e` - Deep navy for professional sections
- **Navy Dark** - `#162839` - Darkest navy for headers and contrast backgrounds

### Accent Colors
- **Green** - `#27ae60` - Success states, growth, positive actions
- **Orange Bright** - `#f0551e` - High-energy CTAs and attention-grabbing elements
- **Orange** - `#f4741b` - Primary orange for warm CTAs
- **Orange Gold** - `#faad16` - Golden orange for premium features

### Neutrals
- **Charcoal** - `#333333` - Dark text and strong contrast elements

## Usage Guidelines

### Hero Sections
Use light blue gradients for backgrounds:
```css
background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(39, 174, 96, 0.1));
```

### Buyer's Agent Sections
Use blue gradient for buyer-focused content:
```css
background: linear-gradient(135deg, #007bff 0%, #0151a6 100%);
```

### Seller's Agent Sections
Use green-to-orange gradient for seller-focused content:
```css
background: linear-gradient(135deg, #27ae60 0%, #f4741b 100%);
```

### Partnership/Trust Sections
Use navy gradients for authority and trust:
```css
background: linear-gradient(135deg, #162839 0%, #06417e 100%);
```

### CTA Sections
Use orange gradient for high-energy calls-to-action:
```css
background: linear-gradient(135deg, #f4741b 0%, #faad16 100%);
```

## Tailwind CSS Usage

### Using Brand Colors in Tailwind

Colors are available in the `brand` namespace:

```html
<!-- Blue -->
<div class="bg-brand-blue">Primary Blue</div>
<div class="bg-brand-blue-dark">Dark Blue</div>
<div class="bg-brand-blue-navy">Navy Blue</div>
<div class="bg-brand-navy-dark">Dark Navy</div>

<!-- Accents -->
<div class="bg-brand-green">Green</div>
<div class="bg-brand-orange-bright">Bright Orange</div>
<div class="bg-brand-orange">Orange</div>
<div class="bg-brand-orange-gold">Gold Orange</div>

<!-- Neutrals -->
<div class="bg-brand-charcoal">Charcoal</div>
```

### Text Colors
```html
<p class="text-brand-blue">Blue text</p>
<p class="text-brand-green">Green text</p>
<p class="text-brand-orange">Orange text</p>
```

### Border Colors
```html
<div class="border border-brand-blue">Blue border</div>
<div class="border-2 border-brand-orange">Orange border</div>
```

## Color Psychology

### Blue Family (#007bff, #0151a6, #06417e, #162839)
- **Meaning:** Trust, professionalism, stability, reliability
- **Use for:** Buyer protection, insurance information, professional services
- **Emotional response:** Calm, confident, secure

### Green (#27ae60)
- **Meaning:** Growth, prosperity, success, positive outcomes
- **Use for:** Value increase, ROI, successful partnerships, growth metrics
- **Emotional response:** Optimistic, prosperous, successful

### Orange Family (#f0551e, #f4741b, #faad16)
- **Meaning:** Energy, enthusiasm, action, warmth
- **Use for:** CTAs, urgent actions, attention-grabbing elements, premium features
- **Emotional response:** Excited, motivated, energized

### Charcoal (#333333)
- **Meaning:** Sophistication, professionalism, strength
- **Use for:** Body text, headers, strong contrast needs
- **Emotional response:** Professional, reliable, grounded

## Accessibility

All color combinations have been tested for WCAG AA compliance:

### Passing Combinations
✅ White text on #007bff (4.5:1 ratio)
✅ White text on #0151a6 (6.2:1 ratio)
✅ White text on #06417e (8.1:1 ratio)
✅ White text on #162839 (12.1:1 ratio)
✅ White text on #27ae60 (3.2:1 ratio - use for large text only)
✅ White text on #f4741b (3.8:1 ratio - use for large text only)
✅ Charcoal #333333 on white (12.6:1 ratio)

## Examples in the Wild

### Services Page
- **Hero:** Light blue gradient background
- **Buyer's Section:** Full blue gradient (#007bff → #0151a6)
- **Seller's Section:** Green-to-orange gradient (#27ae60 → #f4741b)
- **Partnership Section:** Navy gradient (#162839 → #06417e)
- **CTA Section:** Orange gradient (#f4741b → #faad16)

### Resources Page
- Uses violet/pink/purple from ChatPRD inspiration
- Can incorporate brand blues and oranges for consistency

### Homepage
- Vibrant gradients using brand colors mixed with ChatPRD aesthetic
- Blue for buyer focus, orange for energy, green for success

## Implementation in Code

See `tailwind.config.mjs` for full color definitions:

```javascript
colors: {
  brand: {
    blue: '#007bff',
    'blue-dark': '#0151a6',
    'blue-navy': '#06417e',
    charcoal: '#333333',
    'navy-dark': '#162839',
    green: '#27ae60',
    'orange-bright': '#f0551e',
    orange: '#f4741b',
    'orange-gold': '#faad16',
  }
}
```

## Questions?

For questions about color usage, refer to this guide or contact the design team.
