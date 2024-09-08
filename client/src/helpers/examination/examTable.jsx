import React, { useState, useEffect } from 'react'
import UniversalTable from '../../components/table.jsx'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFormData } from './examSlice.jsx';

const ExamTable = ({ setShowDiv }) => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getExam();
    const data = res.data.exam;
    if(data.length < 1) {
        const examData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        percentage: "",
        actions: ""
        }));
        setExamData(examData);
    }
    else {
        const examData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        percentage: item.percentage,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setExamData(examData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  // Get One exam
  const handleEdit = async(id) => {
    setShowDiv(true);
    const res = await api.editExam(id);
    dispatch(setFormData({
      namer: res.data.edit.name,
      percentage: res.data.edit.percentage,
    }));
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };
  
    //   Handle Delete
    const handleDelete = async (id) => {
      try {
          const res = await api.deleteExam(id);
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

  const examColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'percentage', label: 'Percentage', width: '20%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];

  return (
    <div>
        <UniversalTable columns={examColumn} data={examData} />
    </div>
  )
}

export default ExamTable