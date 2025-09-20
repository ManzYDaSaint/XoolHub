import React, { useState, useEffect } from "react";
import FormButton from "../../../components/input/formButton.jsx";
import api from "../../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import ClassTForm from "./form.jsx";
import ClassTTable from "./table.jsx";
import { Plus, Trash } from "lucide-react";

const ClassTData = () => {
  const [classTeacherData, setClassTeacherData] = useState([]);
  const [showClassT, setShowClassT] = useState(false);
  const handleClassTOpen = () => {
    setShowClassT(true);
  };
  const handleClassTClose = () => {
    setShowClassT(false);
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getClassTeacher();
    const data = res.data.classt;
    if (data.length === 0) {
      const classTeacherData = data.map((item, index) => ({
        sr: "",
        teacher: "No records found...",
        class: "",
        actions: "",
      }));
      setClassTeacherData(classTeacherData);
    } else {
      const classTeacherData = data.map((item, index) => ({
        sr: index + 1,
        teacher: item.teacher,
        class: item.classs,
        actions: (
          <div>
            <button onClick={() => handleDelete(item.id)}>
              <Trash size={16} color="red" />
            </button>
          </div>
        ),
      }));
      setClassTeacherData(classTeacherData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteClassTeacher(id);
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
      <div style={{ display: showClassT ? "none" : "block" }} className="mb-4">
        <button
          type="button"
          onClick={handleClassTOpen}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 inline-flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <Plus size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
          <span className="relative z-10">Add Class teacher</span>
        </button>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showClassT ? "block" : "none" }}
      >
        <FormButton
          label={"Close"}
          id={"closeBtn"}
          onClick={handleClassTClose}
        />
        <ClassTForm fetchData={fetchData} />
      </div>
      <ClassTTable
        setShowClassT={setShowClassT}
        classTeacherData={classTeacherData}
      />
    </div>
  );
};

export default ClassTData;
