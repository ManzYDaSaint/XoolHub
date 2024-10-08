import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setClassFormData } from '../examination/examSlice.jsx';
import ClassForm from './classForm.jsx';
import ClassTable from './classTable.jsx';
import FormButton from '../../components/input/formButton.jsx';

const ClassData = () => {
    const handleClassClose = () => { setShowClass(false); };
    const handleClassOpen = () => { setShowClass(true); };
    const [showClass, setShowClass] = useState(false);

    const dispatch = useDispatch();
    const [classData, setClassData] = useState([]);
  
    // Fetch all the exams
    const fetchData = async () => {
      const res = await api.getClass();
      const data = res.data.classs;
      if(data.length === 0) {
          const classData = data.map((item, index) => ({
          sr: "",
          denom: "",
          name: "No records found...",
          actions: ""
          }));
          setClassData(classData);
      }
      else {
          const classData = data.map((item, index) => ({
          sr: index + 1,
          denom: item.denom,
          name: item.name,
          actions: (
              <div>
              <button onClick={() => handleEdit(item.classid)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
              <button onClick={() => handleDelete(item.classid)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
              </div>
          ),
          }));
          setClassData(classData);
      }
    };
  
    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  
    // Get One exam
    const handleEdit = async(id) => {
      setShowClass(true);
      const res = await api.editClass(id);
      dispatch(setClassFormData({
        denom: res.data.edit.denom || '',
        className: res.data.edit.name || '',
      }));
      dispatch(setIsEditMode(true));
      dispatch(setEditItemId(res.data.edit.classid || ''));
    };
    
      //   Handle Delete
      const handleDelete = async (id) => {
        try {
            const res = await api.deleteClass(id);
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
        <div className="div" style={{ display: showClass ? 'none' : 'block' }}>
            <button type="button" onClick={handleClassOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showClass ? 'block' : 'none' }}>
            <ClassForm fetchData={fetchData} />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleClassClose}
            />
        </div>
        <table class="custom__table table-hover mt-4" id="class__table">
            <ClassTable setShowClass={setShowClass} classData={classData}/>
        </table>
    </>
  )
}

export default ClassData