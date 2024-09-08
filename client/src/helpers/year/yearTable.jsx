import React, { useState, useEffect } from 'react'
import UniversalTable from '../../components/table.jsx'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFormData } from '../examination/examSlice.jsx';

const YearTable = ({ setShowYear }) => {
  const dispatch = useDispatch();
  const [yearData, setYearData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getYear();
    const data = res.data.year;
    if(data.length < 1) {
        const yearData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        actions: ""
        }));
        setYearData(yearData);
    }
    else {
        const yearData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setYearData(yearData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  // Get One exam
  const handleEdit = async(id) => {
    setShowYear(true);
    const res = await api.editYear(id);
    dispatch(setFormData({
      yearName: res.data.edit.name,
    }));
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };
  
    //   Handle Delete
    const handleDelete = async (id) => {
      try {
          const res = await api.deleteYear(id);
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

  const yearColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '70%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={yearColumn} data={yearData} />
    </div>
  )
}

export default YearTable