import React from 'react';

// Common structured data schemas for different page types
export const getSoftwareApplicationSchema = (data) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": data.name || "XoolHub",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "description": data.description || "Multi-school information management system",
  "url": data.url || "https://xoolhub.com",
  "author": {
    "@type": "Organization",
    "name": "XoolHub"
  },
  "offers": data.offers || {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free trial available"
  },
  "featureList": data.features || [
    "Student Information Management",
    "Class Scheduling",
    "Multi-School Support",
    "Attendance Tracking",
    "Fee Management",
    "Report Generation"
  ]
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "XoolHub",
  "url": "https://xoolhub.com",
  "logo": "https://xoolhub.com/logo.png",
  "description": "Leading provider of multi-school information management systems",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://twitter.com/xoolhub",
    "https://linkedin.com/company/xoolhub"
  ]
});

export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Component to render structured data
const StructuredData = ({ data }) => (
  <script type="application/ld+json">
    {JSON.stringify(data)}
  </script>
);

export default StructuredData;
