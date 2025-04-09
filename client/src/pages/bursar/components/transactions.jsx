import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import TransTable from "./transTable";
import api from "../../../services/apiServices";

const Transactions = () => {
  const [data, setData] = useState([]);

  const fetchTransactions = async () => {
    const res = await api.Transactions();
    const transactions = res.data.trans;
    if (transactions.length === 0) {
      const info = transactions.map(() => ({
        sr: "",
        fees: "No records found...",
        type: "",
        date: "",
        amount: "",
      }));
      setData(info);
    } else {
      const info = transactions.map((item, index) => ({
        sr: index + 1,
        fees: item.fees,
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
          <span className={item.type === "Income" ? "text-green-600" : "text-red-600"}>
            {item.type === "Income"
              ? `MK${Math.abs(item.amount).toLocaleString()}`
              : `MK${Math.abs(item.amount).toLocaleString()}`
            }
          </span>
        ),
      }));
      setData(info);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []); //

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
