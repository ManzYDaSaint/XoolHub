import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import api from '../../services/apiServices'
import GenderPieChart from './genderPieChart.jsx'

const Info = ({setOpen}) => {
    const [teacher, setTeacher] = useState('')
    const [cns, setCnS] = useState([])
    const [assign, setAssign] = useState('')

    const fetchData = async () => {
        try {
            const res = await api.getTeacher4Dashboard();
            const teacher = res.data.teacher; 

            setTeacher(teacher);
            return;
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        fetchData(); // eslint-disable-next-line
    }, []);

    const classSubjectData = async () => {
        try {
            const res = await api.getClassNSubject();
            const cns = res.data.CnS;     
                            
            setCnS(cns);
            return;
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        classSubjectData(); // eslint-disable-next-line
    }, []);

    const assignDashboard = async () => {
        try {
            const res = await api.dashboardAssignClass();
            const assign = res.data.dct;    

            setAssign(assign);
            return;
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        assignDashboard(); // eslint-disable-next-line
    }, []);

  return (
    <>
        <button onClick={() => setOpen(true)}>
            <Icon name='shutdown' />
            Log Out
        </button>
        <div className="teacherInfo">
            {/* <CircleUserRound size={25} className='headerIcon mt-3' /> */}
            <Icon name='user circle outline' className='headerIcon mt-3'/>
            <div className="teacherDeto mt-4">
                {teacher ? (
                <>
                <h6>{teacher.name}</h6>
                <p>{teacher.email}</p>
                <p>{teacher.contact}</p>
                <p>{teacher.address}</p>
                </>
                ) : (
                    <p>No teacher data found.</p>
                )}
                <ul className='mt-5'>
                    {cns.map((item, index) => (
                    <li key={index}>
                        <div className="classList">
                            <p className="classes">{item.class}</p>
                            <p className="subject">{item.subject}</p>
                        </div>
                        <div className="classPie">
                            <GenderPieChart id={item.classid} />
                        </div>
                    </li>
                    ))}
                </ul>
                {assign ? (
                <div className="classTeacher">
                    <Icon name='universal access' className='classtIcon' />
                    <div className="splitLeft">
                        <h6>Class Teacher:</h6>
                        <p>{assign.class}</p>
                    </div>
                </div>
                ) : (
                    <p>No class data found.</p>
                )}
            </div>
        </div>
    </>
  )
}

export default Info