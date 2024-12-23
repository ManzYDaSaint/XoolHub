import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setTermFormData } from '../examination/examSlice.jsx';
import YearSelectInput from '../../pages/students/components/yearSelect.jsx';


const TermForm = ({ fetchData }) => {
    const termFormData = useSelector((state) => state.exam.termFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateTerm(editItemId, data);
          if(res.data.success === true) {
            fetchData();
            toast.success(res.data.message);
          }
          else {
            toast.error(res.data.message);
          }
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
        }
        else {
            try {
              const res = await api.addTerm({ data });
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
            dispatch(setIsEditMode(false));
            dispatch(setEditItemId(null));
          }
          dispatch(setTermFormData({
            termName: '',
            year: '',
            startDate: '',
            endDate: '',
          }));
          setIsEditMode(false);
          setEditItemId(null);
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
        setTermFormData({
        ...termFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(termFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormInput
          label={'Term'}
          type={'text'}
          name='termName'
          value={termFormData.termName}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <YearSelectInput 
          label={'Academic Year'}
          name='year'
          value={termFormData.year}
          onChange={handleChange}
        />
        </div>
        <div className='formGroup mt-4'>
        <FormInput
          label={'Start Date'}
          type={'date'}
          name='startDate'
          value={termFormData.startDate}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'End Date'}
          type={'date'}
          name='endDate'
          value={termFormData.endDate}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Term' : 'Add Term'} id="tyepButton" />
    </form>
  );
};

export default TermForm;