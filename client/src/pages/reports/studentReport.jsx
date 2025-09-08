import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import PrintComp from "./components/print";
import { ChevronLeft, FileText, Download, User, GraduationCap, Award, BookOpen, Users } from "lucide-react";

const StudentReport = () => {
  const { id } = useParams();
  const reportFormData = useSelector((state) => state.exam.reportFormData);
  const [students, setStudentInfo] = useState([]);
  const [ct, setCT] = useState([]);
  const [report, setReport] = useState([]);
  const [subjectInfo, setSubjectInfo] = useState([]);
  const [subjectid, setSubjectID] = useState([]);
  const [pos, setPos] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [rank, setRank] = useState(null);
  const [counter, setCounter] = useState(null);
  const [classid, setClass] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [rem, setRem] = useState([]);
  const [msce, setMSCE] = useState([]);
  const [jce, setJCE] = useState([]);
  const [agg, setAgg] = useState(null);
  const navigate = useNavigate();
  const [school, setSchool] = useState([]);
  const printRef = useRef();

  const handleDownload = () => {
    if (printRef.current) {
      printRef.current.generatePdf();
    }
  };

  const fetchSchool = async () => {
    try {
      const res = await api.getSchool();
      const data = res.data.details;

      setSchool(data);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchSchool(); // eslint-disable-next-line
  }, []);

  // Fetch MSCE

  const fetchMSCE = async () => {
    try {
      const res = await api.getMSCEGrade();
      const data = res.data.grade;

      setMSCE(data);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchMSCE(); // eslint-disable-next-line
  }, []);

  // Fetch MSCE

  // Fetch JCE

  const fetchJCE = async () => {
    try {
      const res = await api.getJCEGrade();
      const data = res.data.grade;

      setJCE(data);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchJCE(); // eslint-disable-next-line
  }, []);

  // Fetch JCE

  const fetchData = async (data, id) => {
    try {
      const res = await api.getStudentReport({ ...data, id });
      if (res.data.success === false) {
        navigate("/admin-report");
      }
      const info = res.data.studentInfo;
      setStudentInfo(info);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchData(reportFormData, id); // eslint-disable-next-line
  }, [reportFormData, id]);

  const ctData = async (data) => {
    try {
      const res = await api.getCTReport({ data });

      const info = res.data.ct;
      setCT(info);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    ctData(reportFormData); // eslint-disable-next-line
  }, [reportFormData]);

  const studentData = async (data) => {
    try {
      const res = await api.getReport({ data });
      const respo = res.data.students;
      setReport(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    studentData(reportFormData); // eslint-disable-next-line
  }, [reportFormData]);

  const countStudents = async (data) => {
    try {
      const res = await api.countResult({ data });
      const respo = res.data.count[0].count || 0;
      setCounter(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    countStudents(reportFormData); // eslint-disable-next-line
  }, [reportFormData]);

  const subjectPos = async (data, id) => {
    try {
      const res = await api.getSubjectPos({ ...data, id });
      const respo = res.data.pos;

      console.log(respo);
      setSubjectInfo(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    subjectPos(reportFormData, id); // eslint-disable-next-line
  }, [reportFormData, id]);

  const subpos = async (data, id) => {
    try {
      const res = await api.realPos({ ...data, id });
      const respo = res.data.position;
      setPos(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    subpos(reportFormData, subjectid); // eslint-disable-next-line
  }, [reportFormData, subjectid]);

  // Get Teacher by subject

  const getTeacher = async (id) => {
    try {
      const res = await api.getTBySubject({ id });
      const respo = res.data.info;
      setTeacher(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    getTeacher(subjectid); // eslint-disable-next-line
  }, [subjectid]);

  const fetchRemarks = async (id) => {
    try {
      const res = await api.getRemarks({ id });
      const respo = res.data.remarks;
      setRemarks(respo);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchRemarks(classid); // eslint-disable-next-line
  }, [classid]);

  // Get Teacher by subject

  useEffect(() => {
    if (report.length > 0) {
      const item = report.find((item) => item.student_id === id);
      if (item) {
        setRank(item.rank);
      } else {
        setRank(null);
      }
    }
  }, [report, id]);

  useEffect(() => {
    if (subjectInfo.length > 0) {
      const ids = subjectInfo.map((item) => item.subjectid);
      setSubjectID(ids);
    }
  }, [subjectInfo]);

  useEffect(() => {
    if (students.length > 0) {
      const classid = students.map((item) => item.classid);
      const agg = students.map((item) => item.aggregate);
      setClass(classid);
      setAgg(agg);
    }
  }, [students]);

  useEffect(() => {
    if (remarks.length > 0) {
      const matchingRemark = remarks.find(
        (item) => agg >= item.floor && agg <= item.roof
      );

      if (matchingRemark) {
        setRem(matchingRemark.remark); // Assuming `remark` is a single value, not an array.
      }
    }
  }, [remarks, agg]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300/50 font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back
            </button>
            
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Student Academic Report
                </h1>
                <p className="text-gray-600 text-sm">
                  Detailed academic performance and subject analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Information Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                <p className="text-gray-600 text-sm">Academic details and performance overview</p>
              </div>
            </div>

            {students.length > 0 ? (
              students.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Student Name</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.studentname}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">Class</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.class}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-600">Class Teacher(s)</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {ct.map((it, index) => (
                        <span key={it.id || index}>
                          {Array.isArray(it.name) ? it.name.join(", ") : it.name}
                          {index < ct.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-600">Term</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.term}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-600">Exam Type</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.exam}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-medium text-gray-600">Year</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.year}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-600">Aggregate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{item.aggregate}</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-600">Position</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {rank} out of {counter}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No student information available</p>
              </div>
            )}
          </div>
        </div>

        {/* Subject Performance Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Subject Performance</h3>
                <p className="text-gray-600 text-sm">Detailed breakdown by subject</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Marks</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Remarks</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectInfo.map((item, index) => {
                      const matchingRank = pos
                        ?.flat()
                        ?.find(
                          (i) =>
                            i.subjectid === item.subjectid && i.score === item.score
                        )?.ranko;

                      const name = teacher
                        ?.flat()
                        ?.find((i) => i.subjectid === item.subjectid)?.name;

                      return (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors duration-200">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.subject}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{item.score}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.grade}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {matchingRank ? matchingRank : "N/A"}/{counter}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.remarks}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{name ? name : "N/A"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-purple-300/50 font-medium text-lg"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Download PDF Report
          </button>
        </div>

        {/* Hidden Print Component */}
        <div className="hidden">
          <PrintComp
            ref={printRef}
            school={school}
            student={students[0] || {}}
            ct={ct}
            subjectInfo={subjectInfo}
            rank={rank}
            counter={counter}
            pos={pos}
            teacher={teacher}
            remarks={rem}
            grade={msce}
            Jgrade={jce}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
