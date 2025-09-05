import React from "react";
import Navbar from "../landing/components/navbar";
import FAQPage from "./info";
import Footer from "../landing/components/footer";
import SEO from "../../components/SEO";

const FAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Frequently Asked Questions - XoolHub",
    "description": "Find answers to common questions about XoolHub school management system, features, pricing, and implementation.",
    "url": "https://xoolhub.com/faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is XoolHub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub is a comprehensive multi-school information management system designed to streamline student data, classes, subjects, and scheduling for educational institutions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does XoolHub cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub offers flexible pricing plans starting with a free trial. Contact us for detailed pricing information based on your school's needs."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free trial available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub offers a one-term free trial with full access to all features. No credit card required."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common questions about XoolHub school management system, features, pricing, and implementation. Get help with your school administration needs."
        keywords="XoolHub FAQ, school management system questions, education software help, school system support, XoolHub features, school management system pricing"
        url="/faq"
        structuredData={structuredData}
      />
      <Navbar />
      <FAQPage />
      <Footer />
    </>
  );
};

export default FAQ;
