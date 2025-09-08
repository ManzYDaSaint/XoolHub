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
          "text": "XoolHub is a comprehensive multi-school information management system designed to streamline student data, classes, subjects, and scheduling for educational institutions. It provides portals for administrators, teachers, parents, and students."
        }
      },
      {
        "@type": "Question",
        "name": "How much does XoolHub cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub offers flexible pricing plans starting with a free trial. We have basic plans starting at 50,000 MK per term and premium plans for larger institutions. Contact us for detailed pricing based on your school's specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free trial available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub offers a one-term free trial with full access to all features including student management, attendance tracking, grade management, and parent communication. No credit card required."
        }
      },
      {
        "@type": "Question",
        "name": "What features does XoolHub include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub includes student information management, class scheduling, attendance tracking, grade management, fee collection, parent-teacher communication via Telegram, disciplinary records, report generation, and multi-school support."
        }
      },
      {
        "@type": "Question",
        "name": "Can XoolHub handle multiple schools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub is specifically designed as a multi-school platform. It can manage multiple educational institutions from a single system with role-based access control and school-specific configurations."
        }
      },
      {
        "@type": "Question",
        "name": "How does parent-teacher communication work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub integrates with Telegram bots to enable seamless communication between parents and teachers. Parents can request conversations, view attendance, and receive notifications directly through Telegram."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure with XoolHub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub implements industry-standard security measures including JWT authentication, encrypted data transmission, and secure database storage. We comply with data protection regulations and provide regular security updates."
        }
      },
      {
        "@type": "Question",
        "name": "What support is available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XoolHub provides comprehensive support including email support, documentation, video tutorials, and training sessions. We also offer implementation assistance to help schools transition smoothly to our system."
        }
      },
      {
        "@type": "Question",
        "name": "Can I import existing student data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub supports data import from various formats including Excel and CSV files. Our team can assist with data migration from your existing school management system."
        }
      },
      {
        "@type": "Question",
        "name": "Does XoolHub work on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, XoolHub is fully responsive and works on all devices including smartphones and tablets. We also provide Telegram bot integration for mobile-first communication and attendance management."
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
