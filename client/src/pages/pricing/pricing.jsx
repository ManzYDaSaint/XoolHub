import React from 'react';
// import SubscriptionPlans from './feature';
import FAQ from './faq';
import Footer from '../landing/components/footer';
import Navbar from '../landing/components/navbar';
import PlanOptions from './subscription';

const Pricing = () => {
  return (
    <> 
    <Navbar />
      <PlanOptions />
      {/* <SubscriptionPlans /> */}
      <FAQ />
      <Footer />
    </>
  );
};

export default Pricing;