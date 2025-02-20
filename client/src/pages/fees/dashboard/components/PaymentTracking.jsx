import React, { useState, useEffect } from "react";
import FeeCollectionBarChart from "./feeCollectionChart";
import api from "../../../../services/apiServices";
import CustomCard from "../../../reports/dashboard/components/custom-card";
import { School } from "lucide-react";

const PaymentTracking = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.paidByClass();
      const data = res.data.paid;
      setData(data);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fees_graph_card">
      <div className="chart-container">
        <h3>Payment Tracking</h3>
        <FeeCollectionBarChart />
      </div>
      <div className="fees_by_class">
        <h3>Fees Distribution By Class</h3>
        {data.map((item, index) => (
          <CustomCard
            key={index}
            icon={School}
            title={item.class}
            percentage={item.Percentage}
            description={'%'}
            small={item.Percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentTracking;
