import React from "react";
import OverviewSection from "./components/OverviewSection";
import PaymentTracking from "./components/PaymentTracking";
import StudentFeesManagement from "./components/StudentFeesManagement";
import InvoicingReceipts from "./components/InvoicingReceipts";
import Notifications from "./components/Notifications";
import ReportsAnalytics from "./components/ReportsAnalytics";

const FeesDashboard = () => {
  return (
    <div className="fees-dashboard">
      <OverviewSection />
      <PaymentTracking />
      <StudentFeesManagement />
      <InvoicingReceipts />
      <Notifications />
      <ReportsAnalytics />
    </div>
  );
};

export default FeesDashboard;