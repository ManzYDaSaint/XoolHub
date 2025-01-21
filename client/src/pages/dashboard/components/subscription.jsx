import React, { useEffect, useState } from 'react';
import api from '../../../services/apiServices';

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
    <section className="billings">
      <div className="billing-cards">
        {plans.map((plan, index) => (
          <div key={index} className="billing-card">
            <h3>{plan.name}</h3>
            <p className="price">{formatPrice(plan.price)}</p>
            <p className="periodic">per term</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionOptions;