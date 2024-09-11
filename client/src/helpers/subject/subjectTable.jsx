import React, { useState, useEffect } from 'react'
import UniversalTable from '../../components/table.jsx'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setSubjectFormData } from '../examination/examSlice.jsx';

const SubjectTable = ({ setShowSubject }) => {
  const dispatch = useDispatch();
  const [subjectData, setSubjectData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getSubject();
    const data = res.data.subject;
    if(data.length < 1) {
        const subjectData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        actions: ""
        }));
        setSubjectData(subjectData);
    }
    else {
        const subjectData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        code: item.code,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setSubjectData(subjectData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  // Get One exam
  const handleEdit = async(id) => {
    setShowSubject(true);
    const res = await api.editSubject(id);
    dispatch(setSubjectFormData({
      subjectName: res.data.edit.name,
      code: res.data.edit.code,
    }));
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };
  
    //   Handle Delete
    const handleDelete = async (id) => {
      try {
          const res = await api.deleteSubject(id);
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

  const subjectColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'code', label: 'Code', width: '20%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={subjectColumn} data={subjectData} />
    </div>
  )
}

export default SubjectTable