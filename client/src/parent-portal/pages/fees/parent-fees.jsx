import React, { useState, useEffect } from 'react';
import api from '../../../services/apiServices';
import TopNav from '../../components/topnav';
import ParentNavBar from '../../components/navbar';

const ParentFees = () => {
  const [feesStructure, setFeesStructure] = useState([]);
  const [feesHistory, setFeesHistory] = useState([]);

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        const structureRes = await api.getFeeStructure();
        setFeesStructure(structureRes.data);

        const historyRes = await api.getFeeHistory();
        setFeesHistory(historyRes.data);
      } catch (error) {
        console.error('Error fetching fees data:', error);
      }
    };

    fetchFeesData();
  }, []);

  return (
    <div className="parent_container">
      <div className="parent_content">
        <div className="parent-fees">
          <TopNav />
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="material-icons">attach_money</span>
              <span className="ml-2">Fees Structure</span>
            </h2>
            <table className="min-w-full mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">SR</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {feesStructure.map((fee, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{fee.name}</td>
                    <td className="px-4 py-2">{fee.amount}</td>
                    <td className="px-4 py-2"><p className="text-sm">{fee.description}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="material-icons">history</span>
              <span className="ml-2">Fees History</span>
            </h2>
            <table className="min-w-full mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">SR</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {feesHistory.map((history, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{new Date(history.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{history.amount}</td>
                    <td className="px-4 py-2"><p className="text-sm">{history.status}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ParentNavBar />
        </div>
      </div>
    </div>
  );
};

export default ParentFees;

