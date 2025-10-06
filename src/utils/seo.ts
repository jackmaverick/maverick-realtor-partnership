export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export function generateSEOMeta(props: SEOProps) {
  const {
    title,
    description,
    canonical,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    noindex = false,
  } = props;

  const siteUrl = 'https://realtors.maverickexteriors.com'; // Update with actual domain
  const fullTitle = `${title} | Maverick Exteriors - Kansas City Roofing for Realtors`;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return {
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: imageUrl,
    ogType,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    noindex,
  };
}

export const defaultSEO: SEOProps = {
  title: 'Home',
  description: 'Maverick Exteriors - Kansas City\'s trusted roofing partner for real estate professionals. Serving buyer\'s and seller\'s agents with fast inspections, payment at closing, and 30+ years of experience.',
};