import React from "react";
import FeeCollectionBarChart from "./feeCollectionChart";

const PaymentTracking = () => {
  const data = [
    { day: "Monday", amount: 20 },
    { day: "Tuesday", amount: 25 },
    { day: "Wednesday", amount: 18 },
    { day: "Thursday", amount: 58 },
    { day: "Friday", amount: 49 },
  ];

  return (
    <div className="fees_graph_card">
      <div className="chart-container">
        <h3>Payment Tracking</h3>
        <FeeCollectionBarChart data={data} />
      </div>
      <div className="fees_by_class">
        <h3>Fees Distribution By Class</h3>
        <div className="fees_progress_container">
          <p>Form 1</p>
          <div className="fee_progress">
            <div className="inner_progress"></div>
          </div>
        </div>
        <div className="fees_progress_container">
          <p>Form 1</p>
          <div className="fee_progress">
            <div className="inner_progress"></div>
          </div>
        </div>
        <div className="fees_progress_container">
          <p>Form 1</p>
          <div className="fee_progress">
            <div className="inner_progress"></div>
          </div>
        </div>
        <div className="fees_progress_container">
          <p>Form 1</p>
          <div className="fee_progress">
            <div className="inner_progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
