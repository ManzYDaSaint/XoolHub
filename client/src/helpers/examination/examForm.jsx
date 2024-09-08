import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFormData } from './examSlice.jsx';


const ExamForm = () => {
    const formData = useSelector((state) => state.exam.formData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateExam(editItemId, data);
          if(res.data.success === true) {
            toast.success(res.data.message);
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
            try {
              const res = await api.addExam({ data });
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
          dispatch(setFormData({
            namer: '',
            percentage: '',
            // reset other fields
          }));
          setIsEditMode(false);
          setEditItemId(null);
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setFormData({
        ...formData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormInput
          label={'Examination Type'}
          type={'text'}
          name='namer'
          value={formData.namer}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Percentage'}
          type={'text'}
          name={'percentage'}
          value={formData.percentage}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Type' : 'Add Type'} id="tyepButton" />
    </form>
  );
};

export default ExamForm;