"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../services/apiServices";
import XpenseTable from "../../bursar/components/expenseTable";
import ToggleSwitch from "../../../super-admin/pages/schools/toggle";


const ExpenseSection = () => {
  const [data, setData] = useState([]);

  const handleToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Pending" : "Approved";

    try {
      // API call to update the data
      const res = await api.updateStatusEx(id, {
        status: newStatus,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }


      // Refresh the table data
      fetchData();
    } catch (error) {
      console.error("Error updating the data:", error);
    }
  };



  const fetchData = async () => {
    const res = await api.getAdminExpense();
    const expensesData = res.data.expense;
    if (expensesData.length === 0) {
      const info = expensesData.map(() => ({
        sr: "",
        date: "No records found...",
        category: "",
        description: "",
        amount: "",
        status: "",
        action: "",
      }));
      setData(info);
    } else {
      const info = expensesData.map((item, index) => ({
        sr: index + 1,
        date: item.date,
        category: item.category,
        description: item.description,
        amount: item.amount,
        status: (
          <span
            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold leading-5 ${
              item.status === "Approved"
                ? "bg-green-100 text-green-800"
                : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
        ),
        action: (<span>
            <ToggleSwitch 
                id={item.id}
                onToggle={handleToggle}
                status={item.status}
            />
            </span>)
      }));
      setData(info);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex bg-gray-100 pb-3 mt-16">
        <Toaster />
      <div className="flex-1 flex flex-col mt-16">

        {/* Expenses Table */}
        <div className="p-6 bg-white shadow-lg rounded-lg mx-10">
          <XpenseTable Data={data} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseSection;
