import React from "react";


const Card = ({ children, className = "" }) => (
    <div className={`bg-white p-4 shadow rounded-lg ${className}`}>{children}</div>
  );
const DashboardCards = () => {
  const stats = [
    { title: "Total Fees Collected", value: "$758,490", trend: "+20.1%", color: "text-green-500" },
    { title: "Outstanding Balance", value: "$142,750", trend: "+5.4%", color: "text-red-500" },
    { title: "Total Expenses", value: "$524,360", trend: "-3.1%", color: "text-green-500" },
    { title: "Pending Invoices", value: "32", trend: "Due within next 30 days", color: "text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <h3 className="text-lg font-semibold">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className={`text-sm ${stat.color}`}>{stat.trend}</p>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;