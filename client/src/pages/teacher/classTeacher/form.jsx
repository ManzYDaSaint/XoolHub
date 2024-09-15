import React from 'react';
import api from '../../../services/apiServices.jsx'
import FormButton from '../../../components/input/formButton.jsx'

import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setClassTeacherFormData } from '../../../helpers/examination/examSlice.jsx';
import TeacherSelectInput from '../components/teacherSelect.jsx';
import ClassSelectInput from '../components/classSelect.jsx';


const ClassTForm = ({ fetchData }) => {
    const classTeacherFormData = useSelector((state) => state.exam.classTeacherFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);

      // Handle submit
      const handleSubmit = async(data) => {
          try {
            const res = await api.addClassTeacher({ data });
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
          dispatch(setClassTeacherFormData({
            teacherid: '',
            classid: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setClassTeacherFormData({
        ...classTeacherFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(classTeacherFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <TeacherSelectInput 
          label={'Teacher'}
          handleChange={handleChange}
          name={'teacherid'}
          value={classTeacherFormData.teacherid}
        />
        <ClassSelectInput
          label={'Class'}
          handleChange={handleChange}
          name={'classid'}
          value={classTeacherFormData.classid}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Assigned Teacher' : 'Add Class Teacher'} id="tyepButton" />
    </form>
  );
};

export default ClassTForm;