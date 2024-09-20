import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../components/input/formButton.jsx'
import api from '../../services/apiServices.jsx';
// import { useDispatch } from 'react-redux';
// import { setStudentFormData } from '../../helpers/examination/examSlice.jsx';
import { toast } from 'react-hot-toast';
import StudentForm from './studentForm.jsx'
import StudentTable from './studentTable.jsx'

const StudentData = () => {
    // const dispatch = useDispatch();
    const [studentData, setStudentData] = useState([]);
    const [showStudent, setShowStudent] = useState(false);
    const handleStudentOpen = () => { setShowStudent(true); };
    const handleStudentClose = () => { setShowStudent(false); };

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getStudent();
    const data = res.data.student;
    console.log(res);
    if(data.length < 0) {
        const studentData = data.map((item, index) => ({
        sr: "",
        admission: "",
        name: "No records found...",
        class: "",
        dob: "",
        gender: "",
        address: "",
        actions: ""
        }));
        setStudentData(studentData);
    }
    else {
        const studentData = data.map((item, index) => ({
        sr: index + 1,
        admission: item.admission,
        name: item.name,
        class: item.class,
        dob: item.dob,
        gender: item.gender,
        address: item.address,
        actions: (
            <div>
            {/* <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button> */}
            <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setStudentData(studentData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
    //   Handle Delete
    const handleDelete = async (id) => {
        try {
            const res = await api.deleteStudent(id);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

  return (
    <>
        <div className="div" style={{ display: showStudent ? 'none' : 'block' }}>
            <button type="button" onClick={handleStudentOpen} 
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showStudent ? 'block' : 'none' }}>
            <StudentForm fetchData={fetchData} />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleStudentClose}
            />
        </div>
        <table className="custom__table table-hover mt-3" id="student__table">
            <StudentTable studentData={studentData} />
        </table>
    </>
  )
}

export default StudentData