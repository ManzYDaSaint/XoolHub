import React, { useState, useEffect } from 'react'
import api from '../../../services/apiServices'
import PfTable from './table.jsx'
import { useParams } from 'react-router-dom';

const PfData = () => {
    const { id } = useParams();
    const [payData, setPayData] = useState([]);

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getPayee(id);

    const data = res.data.payee;
    if(data.length === 0) {
        const payData = data.map(() => ({
        sr: "",
        date: "",
        fee: "No records found...",
        term: "",
        amount: "",
        paid: "",
        balance: "",
        }));
        setPayData(payData);
    }
    else {
        const payData = data.map((item, index) => ({
        sr: index + 1,
        date: item.date,
        fee: item.name,
        term: item.term + " (" + item.year + ")",
        amount: item.amount,
        paid: item.paid,
        balance: item.balance,
        }));
        setPayData(payData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
  return (
    <>
      <PfTable payData={payData} />
    </>
  )
}

export default PfData