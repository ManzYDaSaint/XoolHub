import React, { useEffect, useState } from "react";
import Card from "../../students/dashboard/components/card";
import { Presentation, Users, UsersRound } from "lucide-react";
import GenderPieChart from "./components/piechart";
import Ctcard from "./components/tcard";
import api from "../../../services/apiServices";

const TeacherBoard = () => {
  const [count, setCount] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [teacher, setTeacher] = useState([]);

  const fethCount = async () => {
    try {
      const res = await api.countTeachers();
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
      const res = await api.countMaleTeachers();
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
      const res = await api.countFemaleTeachers();
      const data = res.data.counter;
      setFemale(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchFemale();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const res = await api.getClassTeacher();
    const data = res.data.classt;
    setTeacher(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Presentation className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
              teacher Dashboard
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mx-auto"></div>
        </div>

        {/* teacher Statistics */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <UsersRound className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">teacher Statistics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card icon={UsersRound} title={count} description={"Total Teachers"} />
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <UsersRound className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{male}</h4>
                    <p className="text-gray-600 font-medium">male Teachers</p>
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
                    <p className="text-gray-600 font-medium">female Teachers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Class Teachers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                  <Presentation className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Class Teachers</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacher.map((item, index) => (
                  <Ctcard
                    key={index}
                    icon={Presentation}
                    score={item.classs}
                    student={item.teacher}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherBoard;
