import React from "react";
import OverviewSection from "./components/OverviewSection";
import PaymentTracking from "./components/PaymentTracking";

const FeesDashboard = () => {

  return (
    <div className="fees-dashboard">
      <OverviewSection />
      <PaymentTracking />
    </div>
  );
};

export default FeesDashboard;