import React from "react";
import Footer from "../landing/components/footer";
import Navbar from "../landing/components/navbar";
import ContactPage from "./info";
import SEO from "../../components/SEO";

const Contact = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact XoolHub",
    "description": "Get in touch with XoolHub for support, sales inquiries, or to learn more about our school management system.",
    "url": "https://xoolhub.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "XoolHub",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with XoolHub for support, sales inquiries, or to learn more about our school management system. We're here to help transform your school administration."
        keywords="contact XoolHub, school management support, education software help, school system contact, XoolHub customer service, school management inquiry"
        url="/contact"
        structuredData={structuredData}
      />
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
};

export default Contact;
