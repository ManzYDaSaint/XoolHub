import React, { useState, useEffect } from "react";
import FormButton from "../../../components/input/formButton.jsx";
import api from "../../../services/apiServices.jsx";
import { useDispatch } from "react-redux";
import {
  setIsEditMode,
  setEditItemId,
  setTeacherFormData,
} from "../../../helpers/examination/examSlice.jsx";
import { toast } from "react-hot-toast";
import AddForm from "./form.jsx";
import AddTable from "./table.jsx";
import { Pencil, Plus, Trash } from "lucide-react";

const Data = () => {
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handleAddOpen = () => {
    setShowAdd(true);
  };
  const handleAddClose = () => {
    setShowAdd(false);
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getTeacher();
    const data = res.data.teacher;
    if (data.length === 0) {
      const teacherData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        gender: "",
        contact: "",
        email: "",
        address: "",
        password: "",
        actions: "",
      }));
      setTeacherData(teacherData);
    } else {
      const teacherData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        gender: item.gender,
        role: item.role,
        contact: item.contact,
        email: item.email,
        address: item.address,
        password: item.password,
        actions: (
          <div className="flex items-center gap-4">
            <button onClick={() => handleEdit(item.id)}>
              <Pencil size={16} color="green" />
            </button>
            <button onClick={() => handleDelete(item.id)}>
              <Trash size={16} color="red" />
            </button>
            {/* <button onClick={() => handleView(item.id)} className='action_icon'><Icon name='eye' className='action_view' /></button> */}
          </div>
        ),
      }));
      setTeacherData(teacherData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get One exam
  const handleEdit = async (id) => {
    setShowAdd(true);
    const res = await api.editTeacher(id);
    dispatch(
      setTeacherFormData({
        name: res.data.edit.name,
        contact: res.data.edit.contact,
        email: res.data.edit.email,
        address: res.data.edit.address,
        gender: res.data.edit.gender,
        role: res.data.edit.role,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteTeacher(id);
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
      <div style={{ display: showAdd ? "none" : "block" }} className="mb-4">
        <button
          type="button"
          onClick={handleAddOpen}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 inline-flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <Plus size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
          <span className="relative z-10">Add teacher</span>
        </button>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showAdd ? "block" : "none" }}
      >
        <FormButton label={"Close"} onClick={handleAddClose} />
        <AddForm fetchData={fetchData} />
      </div>
      <AddTable setShowAdd={setShowAdd} teacherData={teacherData} />
    </div>
  );
};

export default Data;
