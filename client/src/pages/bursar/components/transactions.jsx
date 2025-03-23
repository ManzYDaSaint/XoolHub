import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import TransTable from "./transTable";

const transactions = [
  {
    description: "School fees - Grade 10",
    type: "Income",
    date: "Nov 1, 2023",
    amount: 15000,
  },
  {
    description: "Teacher salaries",
    type: "Expense",
    date: "Nov 2, 2023",
    amount: -8500,
  },
  {
    description: "School fees - Grade 9",
    type: "Income",
    date: "Nov 3, 2023",
    amount: 12500,
  },
  {
    description: "Maintenance",
    type: "Expense",
    date: "Nov 4, 2023",
    amount: -3200,
  },
  {
    description: "Library fees",
    type: "Income",
    date: "Nov 5, 2023",
    amount: 7500,
  },
  {
    description: "Utilities",
    type: "Expense",
    date: "Nov 6, 2023",
    amount: -4800,
  },
  {
    description: "School fees - Grade 12",
    type: "Income",
    date: "Nov 7, 2023",
    amount: 18500,
  },
  {
    description: "Educational materials",
    type: "Expense",
    date: "Nov 8, 2023",
    amount: -6300,
  },
  {
    description: "Canteen income",
    type: "Income",
    date: "Nov 9, 2023",
    amount: 9200,
  },
  {
    description: "Administrative expenses",
    type: "Expense",
    date: "Nov 10, 2023",
    amount: -7200,
  },
];

const Transactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (transactions.length === 0) {
      const info = transactions.map(() => ({
        sr: "",
        description: "No records found...",
        type: "",
        date: "",
        amount: "",
      }));
      setData(info);
    } else {
      const info = transactions.map((item, index) => ({
        sr: index + 1,
        description: item.description,
        type: (
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              item.type === "Income"
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100"
            }`}
          >
            {item.type === "Income" ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownLeft className="w-4 h-4 mr-1" />
            )}
            {item.type}
          </span>
        ),
        date: item.date,
        amount: (
          <span className={item.amount > 0 ? "text-green-600" : "text-red-600"}>
            {item.amount > 0
              ? `+$${item.amount.toLocaleString()}`
              : `-$${Math.abs(item.amount).toLocaleString()}`}
          </span>
        ),
      }));
      setData(info);
    }
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <p className="text-sm text-gray-500 mb-4">
        View all income and expense transactions
      </p>
      <TransTable Data={data} />
    </div>
  );
};

export default Transactions;
