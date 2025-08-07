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
      <div style={{ display: showClassT ? "none" : "block" }}>
        <button
          type="button"
          onClick={handleClassTOpen}
          className="bg-gradient-to-r from-blue-700 via-gray-500 to-green-600 text-white hover:bg-gradient-to-br transition duration-300 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
        >
          <Plus size={15} className="plus" />
          Add Class Teacher
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
