import React from "react";
import UniversalTable from "../../../components/table";

const BillingTable = ({ billingData }) => {
  const billingColumn = [
    { key: "sr", label: "SR", width: "5%" },
    { key: "plan", label: "Plan", width: "20%" },
    { key: "period", label: "Period", width: "20%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "price", label: "Price (MK)", width: "20%" },
  ];

  return (
    <>
      <UniversalTable columns={billingColumn} data={billingData} />
    </>
  );
};

export default BillingTable;
