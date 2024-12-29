import React, { useEffect, useState } from "react";
import Card from "../../students/dashboard/components/card";
import { GraduationCap, UsersRound, DollarSign, Scale } from "lucide-react";
import api from "../../../services/apiServices";

const MasterCards = () => {
  const [count, setCount] = useState(0);
  const [tCount, setTeacherCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [stand, setOut] = useState(0);
  const [tuition, setTuition] = useState(0);

  const OutStand = stand * tuition - sum;

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

  const fethCount = async () => {
    try {
      const res = await api.countStudent();
      const data = res.data.counter;
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fethCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const teacherCount = async () => {
    try {
      const res = await api.countTeachers();
      const data = res.data.counter;
      setTeacherCount(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    teacherCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fethSum = async () => {
    try {
      const res = await api.sumPay();
      const data = res.data.sum;
      setSum(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fethSum();
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
      <Card icon={GraduationCap} title={count} description="Total Students" />
      <Card icon={UsersRound} title={tCount} description="Total Teachers" />
      <Card
        icon={DollarSign}
        title={sum}
        small={"MK"}
        description="Fees Collected"
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

export default MasterCards;
