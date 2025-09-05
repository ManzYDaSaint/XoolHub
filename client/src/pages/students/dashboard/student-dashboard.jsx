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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Student Dashboard
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Student Statistics */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <UsersRound className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Student Statistics</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card
                    icon={UsersRound}
                    title={count}
                    description={"Total Students"}
                  />
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                        <UsersRound className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">{male}</h4>
                        <p className="text-gray-600 font-medium">Male Students</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">{female}</h4>
                        <p className="text-gray-600 font-medium">Female Students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Count Chart */}
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

            {/* Gender Distribution */}
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

          {/* Right Column - Performance */}
          <div className="space-y-8">
            {/* Top Performers */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Top Performers This Term</h3>
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

            {/* Worst Performers */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/30"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
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
      </div>
    </div>
  );
};

export default StudentDashboard;
