import React, { useState, useEffect } from 'react'
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ExamTable from './examTable.jsx';
import ExamForm from './examForm';
import FormButton from '../../components/input/formButton';
import { setIsEditMode, setEditItemId, setFormData } from './examSlice.jsx';
import { Pencil, Plus, Trash } from 'lucide-react'

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
              <button onClick={() => handleEdit(item.id)} className='mr-3'><Pencil size={15} color='green' /></button>
              <button onClick={() => handleDelete(item.id)}><Trash size={15} color='red' /></button>
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
            className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md">
            <Plus size={15} className='plus' />
            Add
            </button>
        </div>
        <div className="mb-6" style={{ display: showType ? 'block' : 'none' }}>
            <ExamForm fetchData={fetchData}/>
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleClose}
            />
        </div>

            <ExamTable setShowType={setShowType} examData={examData} />
    
    </>
  )
}

export default ExamData