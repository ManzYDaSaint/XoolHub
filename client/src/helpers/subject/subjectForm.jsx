import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setSubjectFormData } from '../examination/examSlice.jsx';


const SubjectForm = () => {
    const subjectFormData = useSelector((state) => state.exam.subjectFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateSubject(editItemId, data);
          if(res.data.success === true) {
            toast.success(res.data.message);
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
            try {
              const res = await api.addSubject({ data });
              if (res.data.success === true) {
                toast.success(res.data.message);
              } 
              else {
                toast.error(res.data.message);
              }
            } catch (error) {
              toast.error('An error occurred. Please try again.');
            }
          }
          dispatch(setSubjectFormData({
            subjectName: '',
            code: '',
          }));
          setIsEditMode(false);
          setEditItemId(null);
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSubjectFormData({
        ...subjectFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(subjectFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormInput
          label={'Subject Name'}
          type={'text'}
          name='subjectName'
          value={subjectFormData.subjectName}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Code'}
          type={'text'}
          name='code'
          value={subjectFormData.code}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Subject' : 'Add Subject'} id="tyepButton" />
    </form>
  );
};

export default SubjectForm;