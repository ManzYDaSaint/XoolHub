import React, { useEffect, useState } from 'react'
import StudentTable from '../table/studentTable'
import api from '../../services/apiServices';
import View from '../view.png'
import { useNavigate } from 'react-router-dom';

const StudentData = () => {
    const [studData, setStudData] = useState([]);
    const navigate = useNavigate();

    // Fetch all the exams
    const fetchData = async () => {
        const res = await api.getCS();

        if(res.data.success === false) {
            const data = [
                {
                    'sr': "",
                    'student': "No records found...",
                    'age': "",
                    'class': "",
                    'gender': "",
                    'address': "",
                    'contact': "",
                    'actions': "",
                }
            ];
            const studData = data.map((item, index) => ({
            sr: '',
            student: item.student,
            age: "",
            class: "",
            gender: "",
            address: "",
            contact: "",
            actions: ""
            }));
            setStudData(studData);
        }
        else {
            const data = res.data.cs;
            const studData = data.map((item, index) => ({
            sr: index + 1,
            student: item.name,
            age: item.age,
            class: item.class,
            gender: item.gender,
            address: item.address,
            contact: item.contact,
            actions: (
                <div>
                <button onClick={() => handleEdit(item.id)} className='action_icon'><img src={View} alt="icon" /></button>
                </div>
            ),
            }));
            setStudData(studData);
        }
      };
    
      useEffect(() => {
          fetchData();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      const handleEdit = async(id) => {
        navigate(`/student/${id}`);
      };

  return (
    <div>
        <StudentTable studData={studData}/>
    </div>
  )
}

export default StudentData