import React from 'react';
// import SubscriptionPlans from './feature';
import FAQ from './faq';
import Footer from '../landing/components/footer';
import Navbar from '../landing/components/navbar';
import PlanOptions from './subscription';
import SEO from '../../components/SEO';

const Pricing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "XoolHub School Management System",
    "description": "Comprehensive multi-school information management system with flexible pricing plans",
    "url": "https://xoolhub.com/pricing",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Trial",
        "price": "0",
        "priceCurrency": "MK",
        "description": "One-term free trial with full access to all features"
      },
      {
        "@type": "Offer",
        "name": "Basic Plan",
        "price": "50,000",
        "priceCurrency": "MK",
        "description": "Essential features for small schools"
      },
      {
        "@type": "Offer",
        "name": "Professional Plan",
        "price": "150,000",
        "priceCurrency": "MK",
        "description": "Advanced features for medium-sized schools"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "250,000",
        "priceCurrency": "MK",
        "description": "complete solution for large school districts"
      }
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "XoolHub Pricing Questions",
    "description": "Common questions about XoolHub pricing and plans",
    "url": "https://xoolhub.com/pricing",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in the free trial?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The free trial includes full access to all XoolHub features for one complete term, including student management, attendance tracking, grade management, parent communication, and all reporting features. No credit card required."
        }
      },
      {
        "@type": "Question",
        "name": "Can I change my plan later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the beginning of the next billing cycle. We also offer custom enterprise solutions for large school districts."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any setup fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No setup fees for any of our standard plans. We include data migration assistance and basic training at no extra cost. Custom enterprise implementations may include additional setup services."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept bank transfers, mobile money payments, and credit cards. Payment is typically made per term (3 months) with discounts available for annual payments."
        }
      }
    ]
  };

  return (
    <> 
      <SEO 
        title="Pricing Plans"
        description="Choose the perfect XoolHub plan for your school. Flexible pricing options from free trial to enterprise solutions. No credit card required for free trial."
        keywords="school management system pricing, education software cost, school ERP pricing, student information system cost, school administration software plans, education management pricing"
        url="/pricing"
        structuredData={structuredData}
        additionalStructuredData={faqStructuredData}
      />
      <Navbar />
      <PlanOptions />
      {/* <SubscriptionPlans /> */}
      <FAQ />
      <Footer />
    </>
  );
};

export default Pricing;