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

  return (
    <> 
      <SEO 
        title="Pricing Plans"
        description="Choose the perfect XoolHub plan for your school. Flexible pricing options from free trial to enterprise solutions. No credit card required for free trial."
        keywords="school management system pricing, education software cost, school ERP pricing, student information system cost, school administration software plans, education management pricing"
        url="/pricing"
        structuredData={structuredData}
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