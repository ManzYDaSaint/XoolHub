import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Auth0 from "../../hooks/auth";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import { useSelector } from "react-redux";
import api from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/input/formButton";
import PrintComp from "./components/print";

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
        navigate("/report");
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
      const respo = res.data.count[0].count;
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
    <Auth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Navbar />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="student_container">
                  <div className="splitter">
                    <div className="headerTitle">
                      <FormButton
                        label={"Back"}
                        id={"tyepButton"}
                        icon={"arrow left"}
                        onClick={() => navigate("/report")}
                      />
                      <h5>Student Academic Report</h5>
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-title text-muted mt-5 mb-5">
                        {students.length > 0 ? (
                          students.map((item, index) => (
                            <div className="studentInfo" key={index}>
                              <div className="right">
                                <h4 class="detail">
                                  Student Name: &nbsp;{" "}
                                  <span class="text-dark">
                                    {item.studentname}
                                  </span>
                                </h4>
                                <h4 class="detail">
                                  Class: &nbsp;{" "}
                                  <span class="text-dark">{item.class}</span>
                                </h4>
                                <h4 class="detail">
                                  Class Teacher(s): &nbsp;
                                  {ct.map((it, index) => (
                                    <span
                                      key={it.id || index}
                                      className="text-dark"
                                    >
                                      {Array.isArray(it.name)
                                        ? it.name.join(", ")
                                        : it.name}
                                      {index < ct.length - 1 &&
                                      it.name &&
                                      (Array.isArray(it.name) ||
                                        ct[index + 1].name)
                                        ? ", "
                                        : ""}{" "}
                                      {/* Comma logic */}
                                    </span>
                                  ))}
                                </h4>
                                <h4 class="detail">
                                  Term: &nbsp;{" "}
                                  <span class="text-dark">
                                    <p className="text-sm">{item.term}</p>
                                  </span>
                                </h4>
                              </div>
                              <div className="left">
                                <h4 class="detail">
                                  Exam Type: &nbsp;{" "}
                                  <span class="text-dark ">
                                    <p className="text-sm">{item.exam}</p>
                                  </span>
                                </h4>
                                <h4 class="detail">
                                  Year: &nbsp;{" "}
                                  <span class="text-dark ">
                                    <p className="text-sm">{item.year}</p>
                                  </span>
                                </h4>
                                <h4 class="detail">
                                  Aggregate: &nbsp;{" "}
                                  <span class="text-dark ">
                                    <p className="text-sm">{item.aggregate}</p>
                                  </span>
                                </h4>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm">No students available</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <table className="table table-bordered table-hover w-full">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th colspan="7" className="border p-3">
                              {" "}
                              Position: {rank} Out OF {counter}
                            </th>
                          </tr>
                          <tr className="bg-gray-100 text-gray-700 uppercase text-sm text-left">
                      <th className="border p-3">#</th>
                      <th className="border p-3">Subjects</th>
                      <th className="border p-3">Marks</th>
                      <th className="border p-3">Grade</th>
                      <th className="border p-3">Position</th>
                      <th className="border p-3">Remarks</th>
                      <th className="border p-3">Teacher</th>
                    </tr>
                        </thead>
                        <tbody>
                          {subjectInfo.map((item, index) => {
                            // Get Rank
                            const matchingRank = pos
                              ?.flat()
                              ?.find(
                                (i) =>
                                  i.subjectid === item.subjectid &&
                                  i.score === item.score
                              )?.rank;

                            // Get teacher
                            const name = teacher
                              ?.flat()
                              ?.find(
                                (i) => i.subjectid === item.subjectid
                              )?.name;

                            return (
                              <tr key={index} className="bg-gray-100 text-gray-700 uppercase text-sm text-left">
                                <td className="border p-3">{index + 1}</td>
                                <td className="border p-3">{item.subject}</td>
                                <td className="border p-3">{item.score}</td>
                                <td className="border p-3">{item.grade}</td>
                                <td className="border p-3">
                                  {matchingRank ? matchingRank : "N/A"}/
                                  {counter}
                                </td>
                                <td className="border p-3">{item.remarks}</td>
                                <td className="border p-3">{name ? name : "N/A"}</td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td colspan="6" className="border p-3">Download</td>
                            <td className="border p-3">
                              <button onClick={handleDownload}>
                                Download PDF
                              </button>
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
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth0>
  );
};

export default StudentReport;
