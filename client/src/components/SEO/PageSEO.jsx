import React from 'react';
import SEO from '../SEO';

// Pre-configured SEO component for different page types
const PageSEO = ({ 
  pageType = 'website',
  title, 
  description, 
  keywords, 
  url,
  image = "/logo.png"
}) => {
  const seoConfigs = {
    landing: {
      title: "Multi-School Information Management System",
      description: "Transform your school administration with XoolHub - the ultimate multi-school management platform. Streamline student data, scheduling, attendance, and more.",
      keywords: "school management system, multi-school platform, student information system, class scheduling, attendance tracking, school administration software"
    },
    about: {
      title: "About XoolHub",
      description: "Learn about XoolHub's mission to revolutionize school management with our comprehensive multi-school information management system.",
      keywords: "about XoolHub, school management system, education technology, multi-school platform, school administration software"
    },
    pricing: {
      title: "Pricing Plans",
      description: "Choose the perfect XoolHub plan for your school. Flexible pricing options from free trial to enterprise solutions.",
      keywords: "school management system pricing, education software cost, school ERP pricing, student information system cost"
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with XoolHub for support, sales inquiries, or to learn more about our school management system.",
      keywords: "contact XoolHub, school management support, education software help, school system contact"
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about XoolHub school management system, features, pricing, and implementation.",
      keywords: "XoolHub FAQ, school management system questions, education software help, school system support"
    }
  };

  const config = seoConfigs[pageType] || {};
  
  return (
    <SEO 
      title={title || config.title}
      description={description || config.description}
      keywords={keywords || config.keywords}
      url={url}
      image={image}
    />
  );
};

export default PageSEO;
