import React, { useState, useEffect } from 'react'
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import GradeForm from './gradingForm.jsx'
import GradeTable from './gradingTable.jsx'
import FormButton from '../../components/input/formButton.jsx';
import { setIsEditMode, setEditItemId, setGradeFormData } from '../examination/examSlice.jsx';
import { Pencil, Plus, Trash } from 'lucide-react'

const GradingData = () => {

    const dispatch = useDispatch();
    const [gradeData, setGradeData] = useState([]);
    const handleGradeClose = () => { setShowGrade(false); };
    const handleGradeOpen = () => { setShowGrade(true); };
    const [showGrade, setShowGrade] = useState(false);
  
    // Fetch all the exams
    const fetchData = async () => {
      const res = await api.getGrade();
      const data = res.data.grade;
      if(data.length === 0) {
          const gradeData = data.map((item, index) => ({
          sr: "",
          denom: "",
          roof: "No records found...",
          floor: "",
          grade: "",
          remark: "",
          actions: ""
          }));
          setGradeData(gradeData);
      }
      else {
          const gradeData = data.map((item, index) => ({
          sr: index + 1,
          denom: item.denom,
          roof: item.roof,
          floor: item.floor,
          grade: item.grade,
          remark: item.remark,
          actions: (
              <div>
              <button onClick={() => handleEdit(item.id)} className='action_icon'><Pencil size={15} className='action_edit' /></button>
              <button onClick={() => handleDelete(item.id)} className='action_icon'><Trash size={15} className='action_delete' /></button>
              </div>
          ),
          }));
          setGradeData(gradeData);
      }
    };
  
    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  
    // Get One exam
    const handleEdit = async(id) => {
      setShowGrade(true);
      const res = await api.editGrade(id);
      dispatch(setGradeFormData({
        denom: res.data.edit.denom || '',
        roof: res.data.edit.roof || '',
        floor: res.data.edit.floor || '',
        grade: res.data.edit.grade || '',
        remark: res.data.edit.remark || '',
      }));
      dispatch(setIsEditMode(true));
      dispatch(setEditItemId(res.data.edit.id));
    };
    
      //   Handle Delete
      const handleDelete = async (id) => {
        try {
            const res = await api.deleteGrade(id);
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
        <div className="div" style={{ display: showGrade ? 'none' : 'block' }}>
            <button type="button" onClick={handleGradeOpen} 
                class="add__rows__btn">
                <Plus size={15} className='plus' />
                Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showGrade ? 'block' : 'none' }}>
            <GradeForm fetchData={fetchData}/>
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleGradeClose}
            />
        </div>
        <table class="custom__table table-hover mt-3" id="grade__table">
            <GradeTable setShowGrade={setShowGrade} gradeData={gradeData} />
        </table>
    </>
  )
}

export default GradingData