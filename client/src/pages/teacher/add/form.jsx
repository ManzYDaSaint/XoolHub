import React from 'react';
import api from '../../../services/apiServices.jsx'
import FormInput from '../../../components/input/formInput.jsx'
import FormButton from '../../../components/input/formButton.jsx'

import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setTeacherFormData } from '../../../helpers/examination/examSlice.jsx';
import GenderSelect from '../../students/components/genderSelect.jsx';
import Roles from '../components/roles.jsx';


const AddForm = ({ fetchData }) => {
    const teacherFormData = useSelector((state) => state.exam.teacherFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateTeacher(editItemId, data);
          if(res.data.success === true) {
            fetchData();
            toast.success(res.data.message);
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
            try {
              const res = await api.addTeacher({ data });
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
          }
          dispatch(setTeacherFormData({
            name: '',
            contact: '',
            email: '',
            address: '',
            gender: '',
            role: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setTeacherFormData({
        ...teacherFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(teacherFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off' className='mt-5'>
      <div className='formGroup'>
        <FormInput
          label={'Full Name'}
          type={'text'}
          name='name'
          value={teacherFormData.name}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Contact'}
          type={'text'}
          name={'contact'}
          value={teacherFormData.contact}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Email'}
          type={'text'}
          name={'email'}
          value={teacherFormData.email}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        
      </div>
      <div className="formGroup mt-4">
      <FormInput
          label={'Address'}
          type={'text'}
          name={'address'}
          value={teacherFormData.address}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <GenderSelect 
          label={'Gender'}
          type={'text'}
          name={'gender'}
          value={teacherFormData.gender}
          onChange={handleChange}
        />
        <Roles 
          label={'Role'}
          type={'text'}
          name={'role'}
          value={teacherFormData.role}
          onChange={handleChange}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Teacher' : 'Add Teacher'} id="tyepButton" />
    </form>
  );
};

export default AddForm;