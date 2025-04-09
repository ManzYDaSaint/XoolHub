import React, { useEffect, useState } from "react";
import Card from "./components/card";
import { GraduationCap, Users, UsersRound } from "lucide-react";
import StudentBarChart from "./components/barchart";
import TopPerforming from "./components/topcard";
import GenderPieChart from "./components/piechart";
import api from "../../../services/apiServices";

const StudentDashboard = () => {
  const [count, setCount] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [chart, setChart] = useState([]);
  const [worst, setWorst] = useState([]);
  const [best, setBest] = useState([]);

// Best Students
const fethBest = async () => {
  try {
    const res = await api.getBestStudents();
    const data = res.data.best || [];
    setBest(data);
  } catch (error) {
    console.error("Error fetching student count:", error);
  }
};

useEffect(() => {
  fethBest();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

// Worst Students
const fethWorst = async () => {
  try {
    const res = await api.getWorstStudents();
    const data = res.data.worst || [];
    setWorst(data);
  } catch (error) {
    console.error("Error fetching student count:", error);
  }
};

useEffect(() => {
  fethWorst();
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

  const fetchMale = async () => {
    try {
      const res = await api.countMale();
      const data = res.data.counter;
      setMale(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchMale();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchFemale = async () => {
      try {
        const res = await api.countFemale();
        const data = res.data.counter;
        setFemale(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchFemale();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const fetchGenderClass = async () => {
      try {
        const res = await api.countGenderByClass();
        const data = res.data.counter;
        setChart(data);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchGenderClass();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

      // Reshape Data
      const reshapedData = (chart && Array.isArray(chart) && chart.length > 0) 
  ? chart.reduce((acc, item) => { 
      const existingClass = acc.find((entry) => entry.class === item.class);
      if (existingClass) {
        existingClass[item.gender] = parseInt(item.count, 10);
      } else {
        acc.push({
          class: item.class,
          [item.gender]: parseInt(item.count, 10),
        });
      }
      return acc;
    }, [])
  : [];

      

  return (
    <div className="p-6">
    <div className="p-6 bg-white shadow-lg rounded-lg flex gap-4">
      <div className="flex-1">
        <div className="flex justify-between align-center gap-3">
          <Card
            icon={UsersRound}
            title={count}
            description={"Student Count"}
          />
          <div className="card_container">
            <div className="flex justify-between align-center gap-3">
              <div className="counter">
                <UsersRound size={30} className="card_icon" />
                <div className="card_detail">
                  <h4>{male}</h4>
                  <p>Male</p>
                </div>
              </div>
              <div className="vr"></div>
              <div className="counter">
                <Users size={30} className="card_icon" />
                <div className="card_detail">
                  <h4>{female}</h4>
                  <p>Female</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="graph_card mt-5">
          <h4 className="graph_title">Student Count</h4>
          <StudentBarChart data={reshapedData} />
        </div>
        <div className="pie_card mt-5">
          <h4 className="pie_title">Gender Distribution</h4>
          <GenderPieChart />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="top_performing_title">Top performance this term</h4>
        <div className="top_performing">
          {best.map((item, index) => (
            <TopPerforming
              key={index}
              icon={GraduationCap}
              score={item.agg}
              student={item.student}
              term={item.term}
              exam={item.exam}
              form={item.class}
            />
          ))}
        </div>
        <div className="worst_students">
          <h4 className="worst_performing_title">
            Worst performance this term
          </h4>
          <div className="top_performing">
            {worst.map((item, index) => (
              <TopPerforming
                key={index}
                icon={GraduationCap}
                score={item.agg}
                student={item.student}
                term={item.term}
                exam={item.exam}
                form={item.class}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StudentDashboard;
