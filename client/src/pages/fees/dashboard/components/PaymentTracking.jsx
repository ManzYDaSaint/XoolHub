import React from "react";
import FeeCollectionBarChart from "./feeCollectionChart";

const PaymentTracking = () => {
  return (
    <div className="fees_graph_card">
      <div className="chart-container">
        <h3>Payment Tracking</h3>
        <FeeCollectionBarChart />
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
