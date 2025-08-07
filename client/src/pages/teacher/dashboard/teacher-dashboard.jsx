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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
        <Card icon={UsersRound} title={count} description={"Users"} />
        <div className="flex items-center gap-4 w-full">
          <div className="w-full border-2 border-gray-300 p-2 py-7 rounded-lg flex items-center gap-4">
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

      <div className="flex gap-4 px-6 py-4">
        <div className="p-4 border-2 border-gray-300 rounded-lg w-full">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md">Gender Distribution</h4>
          <GenderPieChart />
        </div>
        <div className="p-4 border-2 border-gray-300 rounded-lg w-full">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md mb-5">Class Teachers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teacher.map((item) => (
            <Ctcard
              icon={Presentation}
              score={item.classs}
              student={item.teacher}
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherBoard;
