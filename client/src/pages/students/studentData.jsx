import React, { useState, useEffect } from "react";
import FormButton from "../../components/input/formButton.jsx";
import api from "../../services/apiServices.jsx";
import { toast, Toaster } from "react-hot-toast";
import StudentForm from "./studentForm.jsx";
import StudentTable from "./studentTable.jsx";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, FilePenLine, Plus, Trash } from "lucide-react";

const StudentData = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [showStudent, setShowStudent] = useState(false);
  const handleStudentOpen = () => {
    setShowStudent(true);
  };
  const handleStudentClose = () => {
    setShowStudent(false);
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getStudent();
    const data = res.data.student;
    if (data.length < 0) {
      const studentData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        class: "",
        dob: "",
        gender: "",
        address: "",
        actions: "",
      }));
      setStudentData(studentData);
    } else {
      const studentData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        class: item.class,
        dob: item.dob,
        gender: item.gender,
        address: item.address,
        actions: (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDelete(item.id)}
              className="action_icon"
            >
              <Trash size={18} color="red" />
            </button>
            <button onClick={() => handleView(item.id)} className="action_icon">
              <FilePenLine size={18} color="green" />
            </button>
          </div>
        ),
      }));
      setStudentData(studentData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteStudent(id);
      if (res.data.success === true) {
        fetchData();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleView = (id) => {
    navigate(`/student_profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
      <Toaster />
      
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Student Admission
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage, add and update student information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Add Student Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative p-8">
            <div
              className="transition-all duration-300"
              style={{ display: showStudent ? "none" : "block" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Add New Students</h3>
              </div>
              <button
                type="button"
                onClick={handleStudentOpen}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-green-300/50 font-medium text-sm"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                Add Student(s)
              </button>
            </div>
            
            <div
              className="transition-all duration-300"
              style={{ display: showStudent ? "block" : "none" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <FilePenLine className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Student Registration Form</h3>
              </div>
              <StudentForm fetchData={fetchData} />
              <div className="mt-6 flex justify-end">
                <FormButton
                  label={"Close"}
                  id={"closeBtn"}
                  onClick={handleStudentClose}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Student Table Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Student Records</h3>
            </div>
            <StudentTable studentData={studentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
