import React, { useState, useEffect } from "react";
import Card from "../../../students/dashboard/components/card";
import { DollarSign, Scale, TrendingUpDown, HandCoins } from "lucide-react";
import api from "../../../../services/apiServices.jsx";

const OverviewSection = () => {
  const [sum, setSum] = useState(0);
  const [payMonth, setPayMonth] = useState(0);
  const [count, setCount] = useState(0);
  const [tuition, setTuition] = useState(0);
  const [out, setOut] = useState(0);

  const pendingFee = count * tuition - sum;
  const OutStand = out * tuition - sum;

  const fethCount = async () => {
    try {
      const res = await api.sumPay();
      const data = res.data.sum;
      setSum(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fethCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSumMonth = async () => {
    try {
      const res = await api.sumPaymentMonth();
      const data = res.data.sum;
      setPayMonth(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchSumMonth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCount = async () => {
    try {
      const res = await api.countStudent();
      const data = res.data.counter;
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTuition = async () => {
    try {
      const res = await api.getTuition();
      const data = res.data.tuition;
      setTuition(data.amount);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchTuition();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchOutstand = async () => {
    try {
      const res = await api.getOutstanding();
      const data = res.data.outstand;
      setOut(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchOutstand();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="overview-section">
      <Card
        icon={DollarSign}
        title={sum}
        small={<span style={{ color: "green" }}>{"MK"}</span>}
        description="Fees Collected This Term"
      />
      <Card
        icon={HandCoins}
        title={payMonth}
        small={<span style={{ color: "green" }}>{"MK"}</span>}
        description="Fees Collected This Month"
      />
      <Card
        icon={TrendingUpDown}
        title={pendingFee}
        small={<span style={{ color: "grey" }}>{"MK"}</span>}
        description="Pending Payments"
      />
      <Card
        icon={Scale}
        title={"-" + OutStand}
        small={<span style={{ color: "red" }}>{"MK"}</span>}
        description="Outstanding Dues"
      />
    </div>
  );
};

export default OverviewSection;
