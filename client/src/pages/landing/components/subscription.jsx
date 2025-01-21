import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import api from '../../../services/apiServices';
import { Link } from 'react-router-dom'

const SubscriptionOptions = () => {
  const [plans, setPlans] = useState([]);
  const fetchData = async () => {
    const res = await api.getSubscription();
    const data = res.data.plan;
    setPlans(data);
  }

  useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Format as '1M', '2.5M', etc.
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Format as '50K', '350K', etc.
    }
    return price.toString(); // Return the original price for smaller values
  };
  

  return (
    <section className="subscriptions">
      <h2>Pricing</h2>
      <h5>Our pricing options</h5>
      <p>Check out our pricing options and choose the best<br /> plan depending on your school's needs.</p>
      <div className="plan-cards">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h3>{plan.name}</h3>
            <p className="price">{formatPrice(plan.price)}</p>
            <p className="periodic">per term</p>
            <p className='feat'>{Array.isArray(plan.features) ? plan.features.join(', ') : plan.features}</p>
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
            <p>Let our team customize the system to your needs and meet the requirements of your school. <br /> Therefore you have to talk to the Administrator for help by clicking here <Link to={'/contact'}>Contact US</Link> </p>
            <h6>this service's price is feature based.</h6>
          </div>
        </div>
        </div>
    </section>
  );
};

export default SubscriptionOptions;
