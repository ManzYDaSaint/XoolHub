import React, { useState, useEffect } from 'react'
import YearForm from './yearForm'
import YearTable from './yearTable'
import { Icon } from 'semantic-ui-react'
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
            <button onClick={() => handleEdit(item.yearid)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.yearid)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
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
        dispatch(setEditItemId(res.data.edit.yearid));
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
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
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
        <table className="custom__table table-hover mt-3" id="year__table">
            <YearTable setShowYear={setShowYear} yearData={yearData} fetchData={fetchData} />
        </table>
    </>
  )
}

export default YearData