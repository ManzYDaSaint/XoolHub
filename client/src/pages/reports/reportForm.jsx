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
import Auth0 from "../../hooks/auth.jsx";
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

  const handlePromote = async(data) => {
    try {
      const res = await api.insertPromotion({ data });
      if (res.data.success === false) {
        toast.error(res.data.message);
      }
      else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

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
    <Auth0>
      <>
        <DeleteModal
          open={open}
          setOpen={setOpen}
          reportFormData={reportFormData}
        />
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="formGroup">
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
          <div className="buttonSplitter">
            <FormButton
              label={isLoading ? "Filtering..." : "Filter"}
              id="tyepButton"
            />
          </div>
        </form>
        <div className="buttonSplitter">
          <div></div>
          <div className="report__button__container">
            <FormButton
              label={"Delete"}
              id="dangerButton"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        <table className="table customisedTable mt-3 w-100" id="fees__table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Action</th>
              <th>Aggregate</th>
              <th>Student Name</th>
              {subjects.map((subject, index) => (
                <th key={index}>{subject}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
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
      </>
    </Auth0>
  );
};

export default ReportForm;
