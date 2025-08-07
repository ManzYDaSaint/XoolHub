import React, { useState, useEffect } from 'react'
import YearForm from './yearForm'
import YearTable from './yearTable'
import { Pencil, Plus, Trash } from 'lucide-react'
import FormButton from '../../components/input/formButton'
import api from '../../services/apiServices'
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setYearFormData } from '../examination/examSlice.jsx';
import { toast } from 'react-hot-toast';

const YearData = () => {
    const dispatch = useDispatch();
    const [yearData, setYearData] = useState([]);
    const [showYear, setShowYear] = useState(false);
    const handleYearOpen = () => { setShowYear(true); };
    const handleYearClose = () => { setShowYear(false); };

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getYear();
    const data = res.data.year;
    if(data.length === 0) {
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
        start: item.start_date,
        end: item.end_date,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.id)} className='mr-3'><Pencil size={15} color='green' /></button>
            <button onClick={() => handleDelete(item.id)}><Trash size={15} color='red' /></button>
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
        dispatch(setYearFormData({
            yearName: res.data.edit.name,
            startDate: res.data.edit.start_date,
            endDate: res.data.edit.end_date,
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

  return (
    <>
        <div className="div" style={{ display: showYear ? 'none' : 'block' }}>
            <button type="button" onClick={handleYearOpen} 
            className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md">
            <Plus size={15} className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showYear ? 'block' : 'none' }}>
            <YearForm fetchData={fetchData} />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleYearClose}
            />
        </div>
            <YearTable setShowYear={setShowYear} yearData={yearData} fetchData={fetchData} />
    </>
  )
}

export default YearData