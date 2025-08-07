import React, { useState, useEffect } from 'react'
import { Pencil, Plus, Trash } from 'lucide-react'
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import SubjectTable from './subjectTable.jsx'
import SubjectForm from './subjectForm.jsx'
import FormButton from '../../components/input/formButton.jsx';
import { setIsEditMode, setEditItemId, setSubjectFormData } from '../examination/examSlice.jsx';

const SubjectData = () => {
    const dispatch = useDispatch();
    const [showSubject, setShowSubject] = useState(false);
    const handleSubjectOpen = () => { setShowSubject(true); };
    const handleSubjectClose = () => { setShowSubject(false); };
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
              <button onClick={() => handleEdit(item.id)} className='mr-3'><Pencil size={15} color='green' /></button>
              <button onClick={() => handleDelete(item.id)} className='action_icon'><Trash size={15} color='red' /></button>
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

  return (
    <>
        <div className="div" style={{ display: showSubject ? 'none' : 'block' }}>
        <button type="button" onClick={handleSubjectOpen} 
            className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md">
            <Plus size={15} className='plus' />
            Add
        </button>
        </div>
        <div className="toggleDiv" style={{ display: showSubject ? 'block' : 'none' }}>
        <SubjectForm fetchData={fetchData} />
        <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleSubjectClose}
        />
        </div>
            <SubjectTable setShowSubject={setShowSubject} subjectData={subjectData} />
    </>
  )
}

export default SubjectData