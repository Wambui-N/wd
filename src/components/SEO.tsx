// components/SEO.tsx
import Head from "next/head";
import { SeoProps } from "../types/seo";

const SEO: React.FC<SeoProps> = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  // jsonLd,
}) => {
  return (
    <Head>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || description}
      />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd),
          }}
        />
    </Head>
  );
};
  // Example of structured data for an organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Your Company Name",
    url: "https://www.yourwebsite.com",
    logo: "https://www.yourwebsite.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-123-456-7890",
      contactType: "Customer service",
    },
    sameAs: [
      "https://www.facebook.com/yourcompany",
      "https://www.twitter.com/yourcompany",
      "https://www.linkedin.com/company/yourcompany",
    ],
  };

export default SEO;
