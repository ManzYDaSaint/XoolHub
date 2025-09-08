import React, { useEffect, useState } from "react";
import ClassSelector from "../../reports/components/classSelector";
import YearSelectInput from "../components/yearSelect";
import Table from "./table";
import api from "../../../services/apiServices";
import ToggleSwitch from "./toggle";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { ChevronLeft, GraduationCap, ArrowRight, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PromotionData = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [nextClass, setNextClass] = useState("");
  const [nextYear, setNextYear] = useState("");
  const [studentIDs, setStudentIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterData = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.getStudentPromotion({ data });
      const info = res.data.info;
      if (info.length === 0) {
        const students = info.map(() => ({
          sr: "",
          tick: "",
          name: "No records found...",
          exam: "",
          agg: "",
          remark: "",
        }));
        setStudents(students);
      } else {
        const students = info.map((item, index) => ({
          sr: item.rank,
          tick: (
            <div>
              <ToggleSwitch id={item.studentid} onToggle={handleToggle} />
            </div>
          ),
          name: item.student,
          exam: item.exam,
          agg: item.agg,
          remark: item.remarks,
        }));
        setStudents(students);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update table data when class changes
  useEffect(() => {
    if (currentClass) {
      const fetchData = async () => {
        await filterData(currentClass);
      };
      fetchData();
    } // eslint-disable-next-line
  }, [currentClass]);

  const handleToggle = (studentId) => {
    setStudentIDs(
      (prevSelected) =>
        prevSelected.includes(studentId)
          ? prevSelected.filter((id) => id !== studentId) // Remove if already selected
          : [...prevSelected, studentId] // Add if not selected
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(studentIDs, currentClass, nextClass, nextYear);
  };
  const handleSubmit = async (
    studentIDs,
    currentClass,
    nextClass,
    nextYear
  ) => {
    if (
      studentIDs.length === 0 ||
      currentClass === "" ||
      nextClass === "" ||
      nextYear === ""
    ) {
      toast.error("Please select all fields.");
      return;
    }

    try {
      const res = await api.updatePro({
        studentIDs,
        currentClass,
        nextClass,
        nextYear,
      });
      if (res.data.success === true) {
        toast.success("Students promoted successfully.");
        setStudentIDs([]);
        setCurrentClass("");
        setNextClass("");
        setNextYear("");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300/50 font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back
            </button>

            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Student Promotion
                </h1>
                <p className="text-gray-600 text-sm">
                  Promote students from one class to another
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
      <form onSubmit={onSubmit}>
        <div className="p-6 space-y-6">
          {/* Promotion Configuration Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Promotion Configuration</h3>
                  <p className="text-gray-600 text-sm">Configure the promotion details for students</p>
                </div>
              </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Class Section */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Current Class</h4>
                    </div>
                    <div className="space-y-4">
                      <ClassSelector
                        label="Select Current Class:"
                        onChange={(e) => {
                          setCurrentClass(e.target.value);
                        }}
                        name="currentClass"
                        value={currentClass}
                      />
                    </div>
                  </div>

                  {/* Target Class Section */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Target Class</h4>
                    </div>
                    <div className="space-y-4">
                      <YearSelectInput
                        label={"Next Academic Year"}
                        onChange={(e) => {
                          setNextYear(e.target.value);
                        }}
                        name={"nextYear"}
                        value={nextYear}
                      />
                      <ClassSelector
                        label={"Next Class:"}
                        onChange={(e) => {
                          setNextClass(e.target.value);
                        }}
                        name={"nextClass"}
                        value={nextClass}
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Student Selection Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Students for Promotion</h3>
                  <p className="text-gray-600 text-sm">Choose which students to promote to the next class</p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden">
                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <div className="text-center">
                      <InfinitySpin width="150" color="#6366f1" />
                      <p className="text-gray-600 mt-4">Loading student data...</p>
                    </div>
                  </div>
                ) : (
                  <Table data={students} />
                )}
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-green-300/50 font-medium text-lg"
            >
              <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Promote Selected Students
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default PromotionData;
