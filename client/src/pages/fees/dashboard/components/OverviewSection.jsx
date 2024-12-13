import React from "react";
import Card from "../../../students/dashboard/components/card";
import { DollarSign, Scale, TrendingUpDown, HandCoins } from 'lucide-react'

const OverviewSection = () => {

  return (
    <div className="overview-section">
      <Card 
        icon={DollarSign}
        title="5,000"
        small={'MK'}
        description="Total Fees Collected"
      />
      <Card 
        icon={HandCoins}
        title= "5,000"
        small={'MK'}
        description="Fees Collected this month"
      />
      <Card 
        icon={TrendingUpDown}
        title="1,250"
        small={'MK'}
        description="Pending Payments"
      />
      <Card 
        icon={Scale}
        title="5,000"
        small={'MK'}
        description="Outstanding Dues"
      />
      
    </div>
  );
};

export default OverviewSection;