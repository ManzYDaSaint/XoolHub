import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import api from '../../services/apiServices'

const Topstudent = () => {
    const [top, setTop] = useState([])

    const fetchData = async () => {
        try {
            const res = await api.getTopStudent();
            const data = res.data.topStudents[0];     

            setTop(data.top);
            return;
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        fetchData(); // eslint-disable-next-line
    }, []);

  return (
    <div className='top_UL'>
        <ul>
        {top.map((item, index) => (
            <li key={index}>
                <User size={25} className='topStudentIcon' />
                <div className="topStudentDetails">
                    <h6>{item.name}</h6>
                    <p>{item.subject}: {item.score}</p>
                </div>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Topstudent