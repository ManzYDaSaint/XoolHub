import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Auth0 from '../../hooks/auth'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import { useSelector } from 'react-redux'
import api from '../../services/apiServices'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../components/input/formButton'

const StudentReport = () => {
    const { id } = useParams()
    const reportFormData = useSelector((state) => state.exam.reportFormData);
    const [ students, setStudentInfo ] = useState([]);
    const [ ct, setCT ] = useState([]);
    const [ report, setReport ] = useState([]);
    const [ subjectInfo, setSubjectInfo ] = useState([]);
    const [ subjectid, setSubjectID ] = useState([]);
    const [ pos, setPos ] = useState([]);
    const [rank, setRank] = useState(null);
    const [counter, setCounter] = useState(null);
    const navigate = useNavigate();

    const fetchData = async (data, id) => {
        try {
            const res = await api.getStudentReport({...data, id});
            if(res.data.success === false) {
                navigate('/report');
            }
            const info = res.data.studentInfo;
            setStudentInfo(info);
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        fetchData(reportFormData, id); // eslint-disable-next-line
    }, [reportFormData,id]);


    const ctData = async (data) => {
        try {
            const res = await api.getCTReport({data});

            const info = res.data.ct;
            setCT(info);
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        ctData(reportFormData); // eslint-disable-next-line
    }, [reportFormData]);

    const studentData = async (data) => {
      try {
          const res = await api.getReport({data});
          const respo = res.data.students;
          setReport(respo);
      } catch (error) {
          console.error('Error fetching individual:', error);
      }
  }; 

  useEffect(() => {        
    studentData(reportFormData); // eslint-disable-next-line
  }, [reportFormData]);

  const countStudents = async (data) => {
    try {
        const res = await api.countResult({data});
        const respo = res.data.count[0].count;
        setCounter(respo);
    } catch (error) {
        console.error('Error fetching individual:', error);
    }
}; 

useEffect(() => {        
  countStudents(reportFormData); // eslint-disable-next-line
}, [reportFormData]);


const subjectPos = async (data, id) => {
  try {
      const res = await api.getSubjectPos({...data, id});
      const respo = res.data.pos;

      setSubjectInfo(respo);
  } catch (error) {
      console.error('Error fetching individual:', error);
  }
}; 

useEffect(() => {        
  subjectPos(reportFormData, id); // eslint-disable-next-line
}, [reportFormData, id]);

const subpos = async (data, id) => {
  try {
      const res = await api.realPos({...data, id});
      const respo = res.data.position;
      setPos(respo);
      console.log(respo);
  } catch (error) {
      console.error('Error fetching individual:', error);
  }
}; 

useEffect(() => {        
  subpos(reportFormData, subjectid); // eslint-disable-next-line
}, [reportFormData, subjectid]);

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
      const ids = subjectInfo.map(item => item.subjectid);
      setSubjectID(ids);
    }
  }, [subjectInfo]);

  return (
    <Auth0>
    <div className='dashboard__container'>
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
                        label={'Back'}
                        id={'tyepButton'}
                        icon={'arrow left'}
                        onClick={() => navigate('/report')}
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
                                        <h4 class="detail">Student Name: &nbsp; <span class="text-dark">{item.studentname}</span></h4>
                                        <h4 class="detail">Class: &nbsp; <span class="text-dark">{item.class}</span></h4>
                                        <h4 class="detail">Class Teacher(s): &nbsp; 
                                          {ct.map((it, index) => (
                                            <span key={index} class="text-dark">{it.name} | &nbsp;</span>
                                          ))}
                                        </h4>
                                        <h4 class="detail">Term: &nbsp; <span class="text-dark">{item.term}</span></h4>
                                    </div>
                                    <div className="left">
                                        <h4 class="detail">Exam Type: &nbsp; <span class="text-dark ">{item.exam}</span></h4>
                                        <h4 class="detail">Year: &nbsp; <span class="text-dark ">{item.year}</span></h4>
                                        <h4 class="detail">Aggregate: &nbsp; <span class="text-dark ">{item.aggregate}</span></h4>
                                    </div>
                                </div>
                            ))) : (
                              <p>No students available</p>
                            )}
                        </div>
                    </div>
                    <div class="panel-body mt-3">
                      <table class="table table-bordered table-hover">
                          <thead>
                              <tr class="text-center text-muted">
                                  <th colspan = "7"> Position: {rank} Out OF {counter}</th>
                              </tr>
                              <tr>
                                  <th>#</th>
                                  <th>Subjects</th>
                                  <th>Marks</th>
                                  <th>Grade</th>
                                  <th>Position</th>
                                  <th>Remarks</th>
                                  <th>Teacher</th>
                              </tr>
                          </thead>
                          <tbody>
                          {subjectInfo.map((item, index) => {
  // Find the rank for the current subject and score
  const matchingRank = pos
    .filter(i => i.subjectid === item.subjectid && i.score === item.score)
    .map(i => i.rank)[0];
    const tk = pos.filter(item.score);
    console.log(tk)

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.subject}</td>
      <td>{item.score}</td>
      <td>{item.grade}</td>
      <td>{matchingRank ? matchingRank : 'N/A'}</td>
      <td>{item.remarks}</td>
      <td>{''}</td>
    </tr>
  );
})}

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
  )
}

export default StudentReport