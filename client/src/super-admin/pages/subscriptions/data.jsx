import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices";
import Table from "./table";
import toast, { Toaster } from 'react-hot-toast'
import ToggleSwitch from "./toggle";

const Data = () => {
  const [details, setDetails] = useState([]);

  const fetchData = async () => {
    const res = await api.getSubscriptionPayment();
    const data = res.data.result;
    if (data.length === 0) {
      const planData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        plan: "",
        period: "",
        amount: "",
        date: "",
        status: "",
        billing: "",
        action: "",
      }));
      setDetails(planData);
    } else {
      const planData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        plan: item.plan,
        period: item.period,
        amount: item.amount,
        date: item.date,
        status: item.status,
        billing: item.bill,
        actions: (
            <ToggleSwitch 
                id={item.id}
                status={item.status}
                billing={item.bill}
                onToggle={handleToggle}
            />
        ),
      }));
      setDetails(planData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = async (id, currentStatus, currentBilling) => {
    // Determine the new values
    const newStatus = currentStatus === "successful" ? "pending" : "successful";
    const newBilling = currentBilling === "active" ? "inactive" : "active";

    try {
      // API call to update the data
      const res = await api.updateStatus(id, {
        status: newStatus,
        bill: newBilling,
      });
      if(res.data.success === true) {
        toast.success(res.data.message);
      }
      else {
        toast.error(res.data.message);
      }

      // Refresh the table data
      fetchData();
    } catch (error) {
      console.error("Error updating the data:", error);
    }
  };

  return (
    <div>
        <Toaster />
      <Table data={details} />
    </div>
  );
};

export default Data;
