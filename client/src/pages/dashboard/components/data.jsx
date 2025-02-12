import React, { useEffect, useState } from 'react'
import api from '../../../services/apiServices';
import BillingTable from './table';

const BillingData = () => {

  const [billingData, setBillingData] = useState([]);

  const fetchData = async () => {
    const res = await api.getSubsByID();
    const data = res.data.subs;
    
    const info = data.map((item, index) => {
      return {
        sr: index + 1,
        plan: item.name,
        period: item.period,
        status: item.status,
        price: item.price,
      };
    });
    setBillingData(info);
  }

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='mt-5'>
      <BillingTable billingData={billingData} />
    </div>
  )
}

export default BillingData