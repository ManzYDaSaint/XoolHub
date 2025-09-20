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
    <div className="space-y-8">
      {/* Main Statistics Section */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Student Statistics</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card
              icon={UsersRound}
              title={count}
              description={"Total Students"} 
            />
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <UsersRound size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-1">male Students</p>
                    <h4 className="text-2xl font-bold text-gray-900">{male}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/30"></div>
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-1">female Students</p>
                    <h4 className="text-2xl font-bold text-gray-900">{female}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Student Count by Class</h3>
            </div>
            <StudentBarChart data={reshapedData} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Gender Distribution</h3>
            </div>
            <GenderPieChart />
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
            </div>
            <div className="space-y-4">
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
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Needs Improvement</h3>
            </div>
            <div className="space-y-4">
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
