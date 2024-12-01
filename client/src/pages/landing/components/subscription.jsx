import React from 'react';
import { Trophy } from 'lucide-react';

const plans = [
  { title: 'Basic', description: 'Up to 250 students, Basic analytics and Features',  price: '250K' },
  { title: 'Premium', description: 'Up to 500 students, Standard analytics and Features', price: '300K' },
  { title: 'Enterprise', description: 'Unlimited students, Advanced analytics and Features', price: '500K' },
];

const SubscriptionOptions = () => {
  return (
    <section className="subscriptions">
      <h2>Pricing</h2>
      <h5>Our pricing options</h5>
      <p>Check out our pricing options and choose the best<br /> plan depending on your school's needs.</p>
      <div className="plan-cards">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <p className="periodic">per term</p>
            <p>{plan.description}</p>
          </div>
        ))}
      </div>
      <div className="success-wrapper">
        <div className="success-card">
          <div className="trophy">
            <Trophy size={40} className='trophy' />
          </div>
          <div className="onboard">
            <h5>customization service that set you up for success</h5>
            <p>Let our team customize the system to your needs and meet the requirements of your school.</p>
            <h6>this service's price is feature based</h6>
          </div>
        </div>
        </div>
    </section>
  );
};

export default SubscriptionOptions;
