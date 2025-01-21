import React from 'react';
import Footer from '../landing/components/footer';
import Navbar from '../landing/components/navbar';
import ContactPage from './info';

const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="pricing-page mt-5">
      <ContactPage />
      <Footer />
    </div>
    </>
  );
};

export default Contact;