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
    <div>
      <DeleteModal modal={modal} setModal={setModal} filterData={modalData} />
      <EditModal open={open} setOpen={setOpen} classID={classID} />
      <form onSubmit={handleFilter}>
        <div className="multi_step mt-3">
          <h3>
            <span className="m-3">Step 1:</span> Filter the students
          </h3>
          <div className="formGroup">
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
          </div>
          <div className="formGroup mt-4">
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
          <FormButton
            label={loading ? "Processing..." : "Filter"}
            icon={"arrow right"}
            id={"nextButton"}
          />
          {loading && (
            <div className="loki">
              <InfinitySpin width="200" color="#007BFE" />
            </div>
          )}
        </div>
      </form>
      <FormButton
        label={loading ? "Deleting..." : "Delete"}
        id="dangerButton"
        onClick={() => setModal(true)}
      />
      <table className="custom__table table-hover mt-5 w-100" id="year__table">
        <FilterTable filterData={filterData} />
      </table>
    </div>
  );
};

export default FilterForm;
