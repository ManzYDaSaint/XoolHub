import React from 'react';
import SubscriptionPlans from './feature';
import FAQ from './faq';
import Footer from '../landing/components/footer';
import Navbar from '../landing/components/navbar';
import PlanOptions from './subscription';

const Pricing = () => {
  return (
    <>
    <Navbar />
    <div className="pricing-page mt-5">
      <PlanOptions />
      <SubscriptionPlans />
      <FAQ />
      <Footer />
    </div>
    </>
  );
};

export default Pricing;