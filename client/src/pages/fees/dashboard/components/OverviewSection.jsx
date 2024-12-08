import React from "react";
import Card from "../../../students/dashboard/components/card";
import { Receipt } from 'lucide-react'

const OverviewSection = () => {

  return (
    <div className="overview-section">
      <Card 
        icon={Receipt}
        title="5,000"
        small={'MK'}
        description="Total Fees Collected"
      />
      <Card 
        icon={Receipt}
        title="1,250"
        small={'MK'}
        description="Pending Payments"
      />
      <Card 
        icon={Receipt}
        title="5,000"
        small={'MK'}
        description="Outstanding Dues"
      />
      <Card 
        icon={Receipt}
        title= "5,000"
        small={'MK'}
        description="Total Fees Collected"
      />
    </div>
  );
};

export default OverviewSection;