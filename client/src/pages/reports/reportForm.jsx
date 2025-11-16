import React, { useState } from "react";
import api from "../../services/apiServices.jsx";
import FormButton from "../../components/input/formButton.jsx";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setReportFormData } from "../../helpers/examination/examSlice.jsx";
import TermSelector from "./components/termSelector.jsx";
import ClassSelector from "./components/classSelector.jsx";
import ExamSelector from "./components/typeSelector.jsx";
import { View } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./components/detelemodal.jsx";

const ReportForm = () => {
  const reportFormData = useSelector((state) => state.exam.reportFormData);
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.getReport({ data });
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        const students = res.data.students;
        const subjects = res.data.subjects;
        setStudents(students);
        setSubjects(subjects);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromote = async (data) => {
    try {
      const res = await api.insertPromotion({ data });
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setReportFormData({ ...reportFormData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmit(reportFormData);
    handlePromote(reportFormData);
  };

  const handleAcademics = (id) => {
    navigate(`/student-report/${id}`);
  };

  return (
    <>
      <div className="border-2 border-gray-300 rounded-lg mb-4 px-4 mt-3">
        <form onSubmit={onSubmit} autoComplete="off" className="py-4 w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TermSelector
              onChange={handleChange}
              label="Term"
              name="termid"
              value={reportFormData.termid}
            />
            <ExamSelector
              onChange={handleChange}
              label="Exam Type"
              name="typeid"
              value={reportFormData.typeid}
            />
            <ClassSelector
              onChange={handleChange}
              label="Class"
              name="classid"
              value={reportFormData.classid}
            />
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <FormButton
              label={isLoading ? "Filtering..." : "Filter"}
              id="tyepButton"
            />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              reportFormData={reportFormData}
            />
          </div>
        </form>
      </div>

      <div className="border-2 border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="text-sm text-gray-700 bg-gray-200">
            <tr className="text-left">
              <th className="py-3 px-3 text-left">Sr</th>
              <th>Action</th>
              <th>Aggregate</th>
              <th>Student Name</th>
              {subjects.map((subject, index) => (
                <th key={index}>{subject}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {students.map((item, index) => (
              <tr
                key={index}
                className="py-3 px-3 text-left border-b border-gray-300"
              >
                <td className="py-3 px-3 text-left">{item.rank}</td>
                <td>
                  <button
                    onClick={() => handleAcademics(item.student_id)}
                    className="action_icon"
                  >
                    <View size={18} />
                  </button>
                </td>
                <td>{item.agg}</td>
                <td>{item.student_name}</td>
                {subjects.map((subject, index) => (
                  <td key={index}>
                    {item.score[subject] !== undefined
                      ? item.score[subject]
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportForm;
