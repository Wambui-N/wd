// types/seo.ts
export interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: any; // Flexible JSON-LD structure
}

export interface StructuredDataProps {
  "@context": string;
  "@type": string;
  [key: string]: any;
}
