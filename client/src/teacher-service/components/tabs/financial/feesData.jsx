import React, { useState, useEffect } from 'react'
import FinancialTable from './feesTable';
import api from '../../../../services/apiServices.jsx'
import { useParams } from 'react-router-dom';
import { Timer, CircleCheckBig } from 'lucide-react';

const FinData = () => {
    const [finData, setFinData] = useState([]);
    const { id } = useParams();

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getFinancial(id);
    const data = res.data.payee;
    if(data.length === 0) {
        const finData = data.map((item, index) => ({
        sr: "",
        date: '',
        fee: "No records found...",
        amount: '',
        status: '',
        }));
        setFinData(finData);
    }
    else {
        const finData = data.map((item, index) => ({
        sr: index + 1,
        date: item.date,
        fee: item.name,
        amount: item.paid,
        status: (
          <>
              {item.status === 'Pending' ? (
                  <>
                      <Timer size={16} className='iconLucide' color='orange' /> Ongoing
                  </>
              ) : item.status === 'Complete' ? (
                  <>
                      <CircleCheckBig size={16} className='iconLucide' color='green' /> Complete
                  </>
              ) : (
                  item.status
              )}
          </>
        ),
        }));
        setFinData(finData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <table className="custom__table table-hover mt-3 w-100" id="fees__table">
            <FinancialTable finData={finData} />
        </table>
    </>
  )
}

export default FinData