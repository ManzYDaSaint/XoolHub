import React, { useEffect, useState } from "react";
import api from "../../../services/apiServices";
import { GraduationCap, Users, UsersRound } from "lucide-react";
import Card from "./card";
import TopPerforming from "../../students/dashboard/components/topcard";
import GenderPieChart from "../../students/dashboard/components/piechart";
import StudentBarChart from "../../students/dashboard/components/barchart";

const Overview = () => {
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
  const reshapedData =
    chart && Array.isArray(chart) && chart.length > 0
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
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              icon={UsersRound}
              title={count}
              description={"Student Count"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="border-2 border-gray-300 p-2 py-7 rounded-lg flex items-center gap-4">
                <p className="p-2 rounded-lg bg-blue-600">
                  <UsersRound size={30} className="w-6 h-6 text-white" />
                </p>
                <div className="card_detail">
                  <p className="text-sm text-gray-700">Male</p>
                  <h4>{male}</h4>
                </div>
              </div>
              <div className="w-full border-2 border-gray-300 p-2 py-7 rounded-lg flex items-center gap-4">
                <p className="p-2 rounded-lg bg-blue-600">
                  <Users size={30} className="w-6 h-6 text-white" />
                </p>
                <div className="card_detail">
                  <p className="text-sm text-gray-700">Female</p>
                  <h4>{female}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-300 rounded-lg w-full mt-4">
            <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md mb-4">Student Count</h4>
            <StudentBarChart data={reshapedData} />
          </div>
          <div className="p-4 border-2 border-gray-300 rounded-lg w-full mt-4">
            <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md mb-4">Gender Distribution</h4>
            <GenderPieChart />
          </div>
        </div>
        <div className="border-l-2 border-gray-300 pl-4 w-1/4">
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

export default Overview;
