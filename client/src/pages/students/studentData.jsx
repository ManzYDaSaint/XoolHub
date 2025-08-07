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
    <div className="bg-gray-100 pb-3">
      <Toaster />
      {/* Header */}
      <div className="mb-8 sm:items-center shadow p-2 flex items-center sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-md space-x-2 cursor-pointer text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2 mr-2 mb-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="border-l-2 border-gray-300 ml-4 pl-4">
          <h1
            className="text-lg font-semibold"
            style={{ fontFamily: "'Poppins', san-serif" }}
          >
            Student Admission
          </h1>
          <p className="text-sm text-gray-500">
            Manage, add and update student information.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="px-6">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <div
            className="div"
            style={{ display: showStudent ? "none" : "block" }}
          >
            <button
              type="button"
              onClick={handleStudentOpen}
              class="bg-gradient-to-r from-blue-700 via-gray-500 to-green-600 text-white hover:bg-gradient-to-br transition duration-300 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
            >
              <Plus size={15} className="plus" />
              Add Student(s)
            </button>
          </div>
          <div
            className="toggleDiv"
            style={{ display: showStudent ? "block" : "none" }}
          >
            <StudentForm fetchData={fetchData} />
            <FormButton
              label={"Close"}
              id={"closeBtn"}
              onClick={handleStudentClose}
            />
          </div>
          <div className="border-2 border-gray-300 rounded-lg mt-4">
            <StudentTable studentData={studentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
