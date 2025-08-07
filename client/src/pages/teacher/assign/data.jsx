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
      <div style={{ display: showAssign ? "none" : "block" }}>
        <button
          type="button"
          onClick={handleAssignOpen}
          className="bg-gradient-to-r from-blue-700 via-gray-500 to-green-600 text-white hover:bg-gradient-to-br transition duration-300 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
        >
          <Plus size={15} className="plus" />
          Assign Teacher
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
