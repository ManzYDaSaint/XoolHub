import React from 'react';
import api from '../../../services/apiServices.jsx'
import FormButton from '../../../components/input/formButton.jsx'

import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setAssignTeacherFormData } from '../../../helpers/examination/examSlice.jsx';
import TeacherSelectInput from '../components/teacherSelect.jsx';
import ClassSelectInput from '../components/classSelect.jsx';
import SubjectSelectInput from '../components/subjectSelect.jsx';


const AssignForm = ({ fetchData }) => {
    const assignTeacherFormData = useSelector((state) => state.exam.assignTeacherFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    // const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
          try {
            const res = await api.addAssignTeacher({ data });
            if (res.data.success === true) {
              fetchData();
              toast.success(res.data.message);
            } 
            else {
              toast.error(res.data.message);
            }
          } catch (error) {
            toast.error('An error occurred. Please try again.');
          }
          dispatch(setAssignTeacherFormData({
            teacherid: '',
            classid: '',
            subjectid: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setAssignTeacherFormData({
        ...assignTeacherFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(assignTeacherFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off' className='w-1/2 py-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <TeacherSelectInput 
          label={'teacher'}
          handleChange={handleChange}
          name={'teacherid'}
          value={assignTeacherFormData.teacherid}
        />
        <ClassSelectInput
          label={'Classs'}
          handleChange={handleChange}
          name={'classid'}
          value={assignTeacherFormData.classid}
        />
        <SubjectSelectInput
          label={'Subject'}
          handleChange={handleChange}
          name={'subjectid'}
          value={assignTeacherFormData.subjectid}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Assigned teacher' : 'Assign teacher'} id="tyepButton" />
    </form>
  );
};

export default AssignForm;