import React, { useState, useEffect } from "react";
import FormButton from "../../../components/input/formButton.jsx";
import api from "../../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import AssignForm from "./form.jsx";
import AssignTable from "./table.jsx";
import { Plus, Trash } from "lucide-react";

const AssignData = () => {
  const [assignTeacherData, setAssignTeacherData] = useState([]);
  const [showAssign, setShowAssign] = useState(false);
  const handleAssignOpen = () => {
    setShowAssign(true);
  };
  const handleAssignClose = () => {
    setShowAssign(false);
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getAssignTeacher();
    const data = res.data.assign;
    if (data.length === 0) {
      const assignTeacherData = data.map((item, index) => ({
        sr: "",
        teacher: "No records found...",
        class: "",
        subject: "",
        actions: "",
      }));
      setAssignTeacherData(assignTeacherData);
    } else {
      const assignTeacherData = data.map((item, index) => ({
        sr: index + 1,
        teacher: item.teacher,
        class: item.classs,
        subject: item.subject,
        actions: (
          <div>
            <button
              onClick={() => handleDelete(item.id)}
              className="action_icon"
            >
              <Trash size={16} color="red"  />
            </button>
          </div>
        ),
      }));
      setAssignTeacherData(assignTeacherData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteAssignTeacher(id);
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
  return (
    <div>
      <div style={{ display: showAssign ? "none" : "block" }} className="mb-4">
        <button
          type="button"
          onClick={handleAssignOpen}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 inline-flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <Plus size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
          <span className="relative z-10">Assign Teacher</span>
        </button>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showAssign ? "block" : "none" }}
      >
        <FormButton
          label={"Close"}
          id={"closeBtn"}
          onClick={handleAssignClose}
        />
        <AssignForm fetchData={fetchData} />
      </div>
      <AssignTable
        setShowAssign={setShowAssign}
        assignTeacherData={assignTeacherData}
      />
    </div>
  );
};

export default AssignData;
