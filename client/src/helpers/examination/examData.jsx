import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ExamTable from './examTable.jsx';
import ExamForm from './examForm';
import FormButton from '../../components/input/formButton';
import { setIsEditMode, setEditItemId, setFormData } from './examSlice.jsx';

const ExamData = () => {

    const dispatch = useDispatch();
    const [examData, setExamData] = useState([]);
    const handleClose = () => { setShowType(false); };
    const handleOpen = () => { setShowType(true); };
    const [showType, setShowType] = useState(false);
  
    // Fetch all the exams
    const fetchData = async () => {
      const res = await api.getExam();
      const data = res.data.exam;
      if(data.length === 0) {
          const examData = data.map(() => ({
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
      setShowType(true);
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

  return (
    <>
        <div className="div" style={{ display: showType ? 'none' : 'block' }}>
            <button type="button" onClick={handleOpen} 
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showType ? 'block' : 'none' }}>
            <ExamForm fetchData={fetchData}/>
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleClose}
            />
        </div>
        <table class="custom__table table-hover mt-3" id="grade__table">
            <ExamTable setShowType={setShowType} examData={examData} />
        </table>
    </>
  )
}

export default ExamData