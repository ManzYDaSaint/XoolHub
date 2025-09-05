import React, { useState } from "react";
import FormButton from "../../components/input/formButton.jsx";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setXFormData } from "../../helpers/examination/examSlice.jsx";
import TypeSelector from "../components/examTypeSelector.jsx";
import ClassSelector from "../components/classSelector.jsx";
import TermSelector from "../components/termSelector.jsx";
import api from "../../services/apiServices.jsx";
import { InfinitySpin } from "react-loader-spinner";
import FilterTable from "../table/filterTable.jsx";
import EditModal from "../components/editModal.jsx";
import {
  setEditItemId,
  setScoreFormData,
} from "../../helpers/examination/examSlice.jsx";
import DeleteModal from "../components/deletemodal.jsx";
import { FilePenLine } from 'lucide-react'

const FilterForm = () => {
  const xFormData = useSelector((state) => state.exam.xFormData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);

  // Dependant
  const [classID, setClassID] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Handle form submission
  const handleFilterSubmit = async (data) => {
    try {
      const res = await api.getX(data);
      if (res.data.success === true) {
        const students = res.data.x;

        if (students.length === 0) {
          const filterData = data.map(() => ({
            sr: "",
            name: "No records found...",
            class: "",
            subject: "",
            score: "",
            grade: "",
            remark: "",
            actions: "",
          }));
          setFilterData(filterData);
        } else {
          const filterData = students.map((item, index) => ({
            sr: index + 1,
            name: item.student,
            class: item.class,
            subject: item.subject,
            score: item.score,
            grade: item.grade,
            remark: item.remarks,
            actions: (
              <>
                <button
                  onClick={() => handleEdit(item.resultid)}
                  className="action_icon"
                >
                  <FilePenLine size={20} className="action_edit" />
                </button>
              </>
            ),
          }));
          setFilterData(filterData);
        }
      } else {
        toast.error(res.data.message);
        setModalData("");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    dispatch(
      setXFormData({
        yearid: "",
        typeid: "",
        termid: "",
      })
    );
    setSelectedClass("");
    setSelectedSubject("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setXFormData({
        ...xFormData,
        [name]: value,
      })
    );
  };

  // Dependent Selection
  // Handle when a country is selected
  const handleClassChange = (e) => {
    const classo = e.target.value;
    setSelectedClass(classo);
    setSelectedSubject("");
  };

  // Handle when a city is selected
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = {
      ...xFormData,
      selectedClass,
      selectedSubject,
    };
    setModalData(formData);
    handleFilterSubmit(formData);
  };

  const handleEdit = async (id) => {
    setOpen(true);
    const res = await api.getScore(id);
    dispatch(
      setScoreFormData({
        score: res.data.edit.score || "",
      })
    );
    dispatch(setEditItemId(res.data.edit.id || ""));
    setClassID(res.data.edit.classid || "");
  };

  return (
    <div className="space-y-8">
      <DeleteModal modal={modal} setModal={setModal} filterData={modalData} />
      <EditModal open={open} setOpen={setOpen} classID={classID} />
      
      {/* Filter Form */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Filter Students</h3>
          </div>
          
          <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-blue-800">
              💡 <strong>Tip:</strong>{" "}
              <span className="text-blue-700">
                Select the term, examination type, class, and subject to filter student results.
              </span>
            </p>
          </div>

          <form onSubmit={handleFilter} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <TermSelector
                onChange={handleChange}
                label={"Term"}
                name={"termid"}
                value={xFormData.termid}
              />
              <TypeSelector
                onChange={handleChange}
                label={"Examination Type"}
                name={"typeid"}
                value={xFormData.typeid}
              />
              <ClassSelector
                onChange={handleChange}
                label={"Class"}
                name={"classid"}
                value={selectedClass}
                selectedClass={selectedClass}
                handleClassChange={handleClassChange}
                handleSubjectChange={handleSubjectChange}
                labell={"Subject"}
                namee={"subjectid"}
                valuee={selectedSubject}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <FormButton
                label={loading ? "Processing..." : "Filter Results"}
                icon={"arrow right"}
                id={"nextButton"}
              />
              
              {loading && (
                <div className="flex items-center gap-3">
                  <InfinitySpin width="40" color="#3B82F6" />
                  <span className="text-sm text-gray-600 font-medium">Processing...</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end">
        <button
          onClick={() => setModal(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative flex items-center gap-2">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {loading ? "Deleting..." : "Delete Results"}
          </span>
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Filtered Results</h3>
          </div>
          
          <FilterTable filterData={filterData} />
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
