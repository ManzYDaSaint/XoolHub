import React from "react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import AboutUs from "./info";
import SEO from "../../components/SEO";

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About XoolHub",
    "description": "Learn about XoolHub's mission to revolutionize school management with our comprehensive multi-school information management system.",
    "url": "https://xoolhub.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "XoolHub",
      "description": "Leading provider of multi-school information management systems",
      "url": "https://xoolhub.com"
    }
  };

  return (
    <>
      <SEO 
        title="About XoolHub"
        description="Learn about XoolHub's mission to revolutionize school management with our comprehensive multi-school information management system. Discover how we're transforming education administration."
        keywords="about XoolHub, school management system, education technology, multi-school platform, school administration software, education innovation, school management company"
        url="/about"
        structuredData={structuredData}
      />
      <Navbar />
      <AboutUs />
      <Footer />
    </>
  );
};

export default About;
