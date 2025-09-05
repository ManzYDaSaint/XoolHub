import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import TermSelector from "../../reports/components/termSelector.jsx";
import ClassSelector from "../../reports/components/classSelector.jsx";
import { View } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthT from "../../../hooks/tauth.jsx";
import Modal from "./delete.jsx";
import ExamSelector from "../../reports/components/typeSelector.jsx";
import { setReportFormData } from "../../../helpers/examination/examSlice.jsx";
import FormButton from "../../../components/input/formButton.jsx";
import api from "../../../services/apiServices.jsx";

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
    <AuthT>
      <>
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Report Filters</h3>
            </div>
            
            <form onSubmit={onSubmit} autoComplete="off" className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
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
              <div className="flex justify-end gap-4">
                <FormButton
                  label={isLoading ? "Filtering..." : "Filter"}
                  id="tyepButton"
                />
                <Modal
                  open={open}
                  setOpen={setOpen}
                  reportFormData={reportFormData}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="w-full space-y-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Student Report Data</h3>
              </div>
              
              <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-blue-800">
                  💡 <strong>Tip:</strong>{" "}
                  <span className="text-blue-700">
                    Click on the <strong>View</strong> button to see detailed student reports.
                  </span>
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200/50">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Sr
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Aggregate
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Student Name
                      </th>
                      {subjects.map((subject, index) => (
                        <th key={index} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {subject}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-gray-200/50">
                    {students.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50/50 transition-all duration-200 group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700">
                          {item.rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700">
                          <button
                            onClick={() => handleAcademics(item.student_id)}
                            className="group/btn flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <View size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                            View
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
                            {item.agg}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {item.student_name}
                        </td>
                        {subjects.map((subject, subjectIndex) => (
                          <td key={subjectIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700">
                            {item.score[subject] !== undefined ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                {item.score[subject]}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500">
                                N/A
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No Data State */}
              {students.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
                  <p className="mt-1 text-sm text-gray-500">Apply filters to view student report data.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </AuthT>
  );
};

export default ReportForm;
