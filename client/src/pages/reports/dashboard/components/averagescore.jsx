import React, { useEffect, useState } from "react";
import SubjectChart from "./subject-chart";
import api from "../../../../services/apiServices";
import ClassSelector from "../../components/classSelector";
import { BarChart3, TrendingUp, BookOpen } from "lucide-react";

const AverageScore = () => {
  const [data, setData] = useState([]);
  const [classID, setClassID] = useState("");

  const filterData = async() => {
    const res = await api.avSubject({classID});
    setData(res.data.get);
  };

  useEffect(() => {
      if (classID) {
        const fetchData = async () => {
          await filterData(classID);
        };
        fetchData();
      } // eslint-disable-next-line
  }, [classID]);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
      <div className="relative p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Average Score by Subject</h3>
              <p className="text-gray-600 text-sm">Performance analysis across different subjects</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-[200px]">
              <ClassSelector 
                onChange={(e) => {
                  setClassID(e.target.value);
                }}
                name="classID"
                value={classID}
              />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Subject Performance Chart</h4>
          </div>
          
          <div className="chart-container">
            <SubjectChart data={data} />
          </div>
          
          {data.length === 0 && classID && (
            <div className="text-center py-8">
              <div className="p-4 bg-gray-100/50 rounded-xl inline-block">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No data available for the selected class</p>
              </div>
            </div>
          )}
          
          {!classID && (
            <div className="text-center py-8">
              <div className="p-4 bg-blue-100/50 rounded-xl inline-block">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-600 text-sm">Select a class to view average scores</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AverageScore;
