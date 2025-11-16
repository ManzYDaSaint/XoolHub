import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = "/logo.png", 
  url, 
  type = "website",
  structuredData,
  additionalStructuredData,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}) => {
  const siteName = "XoolHub";
  const baseUrl = "https://xoolhub.com";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} – Multi-School Information Management System`;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  // Default values
  const defaultDescription = "XoolHub is a comprehensive multi-school information management system designed to streamline student data, classes, subjects, attendance tracking, and parent-teacher communication for educational institutions.";
  const defaultKeywords = "XoolHub, school management system, multi-school platform, education software, student information system, class scheduling, school administration, attendance tracking, parent portal, teacher portal, school ERP, education management, student database, academic management, school communication, Telegram bot, school fees management, disciplinary records, school reports";
  
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  
  // Build robots directive
  const robotsDirective = [];
  if (noindex) robotsDirective.push('noindex');
  else robotsDirective.push('index');
  if (nofollow) robotsDirective.push('nofollow');
  else robotsDirective.push('follow');
  const robotsContent = robotsDirective.join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || "XoolHub"} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImage} /> 
      <meta name="twitter:site" content="@xoolhub" />
      <meta name="twitter:creator" content="@xoolhub" />
       
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1976d2" />
      <meta name="msapplication-TileColor" content="#1976d2" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      
      {/* Article/Content Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags && <meta property="article:tag" content={tags} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="MW" />
      <meta name="geo.country" content="Malawi" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional Structured Data */}
      {additionalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(additionalStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
