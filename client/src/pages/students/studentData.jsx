import React, { useState, useEffect } from "react";
import FormButton from "../../components/input/formButton.jsx";
import api from "../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import StudentForm from "./studentForm.jsx";
import StudentTable from "./studentTable.jsx";
import { useNavigate } from "react-router-dom";
import { FilePenLine, Plus, Trash } from "lucide-react";
import { Toaster } from "react-hot-toast";

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
          <div>
            <button
              onClick={() => handleDelete(item.id)}
              className="action_icon"
            >
              <Trash size={18} className="action_delete" />
            </button>
            <button onClick={() => handleView(item.id)} className="action_icon">
              <FilePenLine size={18} className="action_edit" />
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
    <div className="flex bg-gray-100 pb-3">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 sm:items-center shadow p-4">
          <div>
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Student Admission
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, add and update student information.
            </p>
          </div>
        </div>
        <div className="px-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div
              className="div"
              style={{ display: showStudent ? "none" : "block" }}
            >
              <button
                type="button"
                onClick={handleStudentOpen}
                class="add__rows__btn"
              >
                <Plus size={15} className="plus" />
                Add
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
            <table
              className="custom__table table-hover mt-3"
              id="student__table"
            >
              <StudentTable studentData={studentData} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
