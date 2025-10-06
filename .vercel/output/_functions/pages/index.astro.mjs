import { e as createComponent, f as createAstro, m as maybeRenderHead, k as renderScript, h as addAttribute, r as renderTemplate, l as renderComponent, n as renderHead, o as renderSlot } from '../chunks/astro/server_ULCMg1wc.mjs';
import 'kleur/colors';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

function generateSEOMeta(props) {
  const {
    title,
    description,
    canonical,
    ogImage = "/og-image.jpg",
    ogType = "website",
    noindex = false
  } = props;
  const siteUrl = "https://realtors.maverickexteriors.com";
  const fullTitle = `${title} | Maverick Exteriors - Kansas City Roofing for Realtors`;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
  return {
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: imageUrl,
    ogType,
    ogUrl: canonicalUrl,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    noindex
  };
}

const $$Astro$3 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/locations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="bg-white border-b border-gray-200 sticky top-0 z-50"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <!-- Logo --> <div class="flex-shrink-0"> <a href="/" class="flex items-center"> <span class="text-2xl font-bold text-primary-600">Maverick</span> <span class="text-2xl font-bold text-gray-900 ml-1">Exteriors</span> </a> </div> <!-- Desktop Navigation --> <div class="hidden md:flex md:items-center md:space-x-8"> ${navigation.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`text-sm font-medium transition-colors ${currentPath === item.href ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}`, "class")}> ${item.name} </a>`)} </div> <!-- CTA Button --> <div class="hidden md:block"> <a href="tel:9132686052" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors">
Call: (913) 268-6052
</a> </div> <!-- Mobile menu button --> <div class="md:hidden"> <button type="button" id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" aria-expanded="false"> <span class="sr-only">Open main menu</span> <!-- Hamburger icon --> <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> </div> </div> <!-- Mobile menu --> <div id="mobile-menu" class="hidden md:hidden pb-4"> <div class="space-y-1"> ${navigation.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`block px-3 py-2 rounded-md text-base font-medium ${currentPath === item.href ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"}`, "class")}> ${item.name} </a>`)} <a href="tel:9132686052" class="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white text-center mt-4">
Call: (913) 268-6052
</a> </div> </div> </nav> </header> ${renderScript($$result, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/components/Header.astro", void 0);

const $$Astro$2 = createAstro();
const $$TrustBadges = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TrustBadges;
  const { theme = "light" } = Astro2.props;
  const badges = [
    { label: "30+ Years Experience", icon: "calendar" },
    { label: "500+ Realtor Partnerships", icon: "users" },
    { label: "Licensed & Insured", icon: "shield" },
    { label: "A+ BBB Rating", icon: "star" }
  ];
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const iconColor = theme === "dark" ? "text-primary-400" : "text-primary-600";
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap items-center justify-center gap-6 md:gap-8"> ${badges.map((badge) => renderTemplate`<div class="flex items-center space-x-2"> ${badge.icon === "calendar" && renderTemplate`<svg${addAttribute(`w-5 h-5 ${iconColor}`, "class")} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg>`} ${badge.icon === "users" && renderTemplate`<svg${addAttribute(`w-5 h-5 ${iconColor}`, "class")} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>`} ${badge.icon === "shield" && renderTemplate`<svg${addAttribute(`w-5 h-5 ${iconColor}`, "class")} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg>`} ${badge.icon === "star" && renderTemplate`<svg${addAttribute(`w-5 h-5 ${iconColor}`, "class")} fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg>`} <span${addAttribute(`text-sm font-medium ${textColor}`, "class")}> ${badge.label} </span> </div>`)} </div>`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/components/TrustBadges.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const navigation = {
    services: [
      { name: "Buyer's Agent Services", href: "/services#buyers" },
      { name: "Seller's Agent Services", href: "/services#sellers" },
      { name: "Property Inspections", href: "/services#inspections" },
      { name: "Partnership Program", href: "/about#partnership" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Service Areas", href: "/locations" },
      { name: "Contact", href: "/contact" }
    ]
  };
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gray-900 text-gray-300"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"> <!-- Main footer content --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"> <!-- Company Info --> <div class="lg:col-span-2"> <div class="mb-4"> <span class="text-2xl font-bold text-white">Maverick</span> <span class="text-2xl font-bold text-primary-400 ml-1">Exteriors</span> </div> <p class="text-gray-400 mb-4 max-w-md">
Kansas City's trusted roofing partner for real estate professionals. Serving buyer's and seller's agents with 30+ years of experience.
</p> <div class="space-y-2"> <a href="tel:9132686052" class="flex items-center text-white hover:text-primary-400 transition-colors"> <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg>
(913) 268-6052
</a> <p class="text-gray-400 text-sm ml-7">Kansas City, Kansas</p> </div> </div> <!-- Services --> <div> <h3 class="text-white font-semibold mb-4">Services</h3> <ul class="space-y-2"> ${navigation.services.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")} class="text-gray-400 hover:text-white transition-colors text-sm"> ${item.name} </a> </li>`)} </ul> </div> <!-- Company --> <div> <h3 class="text-white font-semibold mb-4">Company</h3> <ul class="space-y-2"> ${navigation.company.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")} class="text-gray-400 hover:text-white transition-colors text-sm"> ${item.name} </a> </li>`)} </ul> </div> </div> <!-- Trust Badges --> <div class="mt-12 pt-8 border-t border-gray-800"> ${renderComponent($$result, "TrustBadges", $$TrustBadges, { "theme": "dark" })} </div> <!-- Bottom bar --> <div class="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"> <p class="text-sm text-gray-400">
&copy; ${currentYear} Maverick Exteriors. All rights reserved.
</p> <div class="flex space-x-6 mt-4 md:mt-0"> <a href="/privacy" class="text-sm text-gray-400 hover:text-white transition-colors">
Privacy Policy
</a> <a href="/terms" class="text-sm text-gray-400 hover:text-white transition-colors">
Terms of Service
</a> </div> </div> </div> </footer>`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const seoMeta = generateSEOMeta(Astro2.props);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO Meta Tags --><title>${seoMeta.title}</title><meta name="description"${addAttribute(seoMeta.description, "content")}><link rel="canonical"${addAttribute(seoMeta.canonical, "href")}>${seoMeta.noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- Open Graph --><meta property="og:type"${addAttribute(seoMeta.ogType, "content")}><meta property="og:title"${addAttribute(seoMeta.ogTitle, "content")}><meta property="og:description"${addAttribute(seoMeta.ogDescription, "content")}><meta property="og:image"${addAttribute(seoMeta.ogImage, "content")}><meta property="og:url"${addAttribute(seoMeta.ogUrl, "content")}><!-- Twitter Card --><meta name="twitter:card"${addAttribute(seoMeta.twitterCard, "content")}><meta name="twitter:title"${addAttribute(seoMeta.twitterTitle, "content")}><meta name="twitter:description"${addAttribute(seoMeta.twitterDescription, "content")}><meta name="twitter:image"${addAttribute(seoMeta.twitterImage, "content")}><!-- Preconnect for fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro();
const $$CTAButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CTAButton;
  const {
    href,
    variant = "primary",
    size = "md",
    fullWidth = false,
    class: className = ""
  } = Astro2.props;
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md",
    secondary: "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  const widthClass = fullWidth ? "w-full" : "";
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(allClasses, "class")}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/components/CTAButton.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home", "description": "Maverick Exteriors - Kansas City's trusted roofing partner for real estate professionals. 30+ years serving buyer's and seller's agents." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto"> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
Your Trusted Roofing Partner for <span class="text-primary-600">Real Estate Success</span> </h1> <p class="text-xl text-gray-600 mb-8">
Serving Kansas City buyer's and seller's agents with fast inspections, payment at closing, and 30+ years of roofing expertise.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "/contact", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate`
Schedule Partnership Meeting
` })} ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "/services", "variant": "outline", "size": "lg" }, { "default": ($$result3) => renderTemplate`
Explore Services
` })} </div> </div> <!-- Trust Badges --> <div class="mt-16"> ${renderComponent($$result2, "TrustBadges", $$TrustBadges, {})} </div> </div> </section>  <section class="py-16 md:py-24 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid md:grid-cols-2 gap-8 lg:gap-12"> <!-- Buyer's Agents --> <div class="p-8 bg-primary-50 rounded-2xl border border-primary-100"> <h2 class="text-3xl font-bold text-gray-900 mb-4">For Buyer's Agents</h2> <p class="text-gray-600 mb-6">
Help your clients make informed decisions with fast, thorough roof inspections and flexible payment options.
</p> <ul class="space-y-3 mb-6"> <li class="flex items-start"> <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">Payment at closing available</span> </li> <li class="flex items-start"> <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">Write us into contracts</span> </li> <li class="flex items-start"> <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">Fast turnaround for closing deadlines</span> </li> </ul> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "/services#buyers", "variant": "primary" }, { "default": ($$result3) => renderTemplate`
Learn More
` })} </div> <!-- Seller's Agents --> <div class="p-8 bg-accent-50 rounded-2xl border border-accent-100"> <h2 class="text-3xl font-bold text-gray-900 mb-4">For Seller's Agents</h2> <p class="text-gray-600 mb-6">
Increase listing values and close deals faster with pre-listing inspections and roof improvements.
</p> <ul class="space-y-3 mb-6"> <li class="flex items-start"> <svg class="w-6 h-6 text-accent-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">Increase appraisal value</span> </li> <li class="flex items-start"> <svg class="w-6 h-6 text-accent-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">Pre-listing roof inspections</span> </li> <li class="flex items-start"> <svg class="w-6 h-6 text-accent-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">3D design visualizations</span> </li> </ul> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "/services#sellers", "variant": "secondary" }, { "default": ($$result3) => renderTemplate`
Learn More
` })} </div> </div> </div> </section>  <section class="py-16 md:py-24 bg-primary-600"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
Ready to Partner with Kansas City's Trusted Roofer?
</h2> <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
Join 500+ realtors who trust Maverick Exteriors for their roofing needs.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "/contact", "variant": "primary", "size": "lg", "class": "bg-white text-primary-600 hover:bg-gray-100" }, { "default": ($$result3) => renderTemplate`
Schedule Meeting
` })} ${renderComponent($$result2, "CTAButton", $$CTAButton, { "href": "tel:9132686052", "variant": "outline", "size": "lg", "class": "border-white text-white hover:bg-primary-700" }, { "default": ($$result3) => renderTemplate`
Call (913) 268-6052
` })} </div> </div> </section> ` })}`;
}, "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/pages/index.astro", void 0);

const $$file = "/Users/jack/maverick-exteriors/realtor-partnership-strategy/website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
