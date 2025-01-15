import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setYearFormData } from '../examination/examSlice.jsx';


const YearForm = ({ fetchData }) => {
    const yearFormData = useSelector((state) => state.exam.yearFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {

        if(isEditMode) {
          const res = await api.updateYear(editItemId, data);
          if(res.data.success === true) {
            fetchData();
            toast.success(res.data.message);
            dispatch(setIsEditMode(false));
            dispatch(setEditItemId(null));
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
            try {
              const res = await api.addYear({ data });
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
          dispatch(setYearFormData({
            yearName: '',
            startDate: '',
            endDate: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setYearFormData({
        ...yearFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(yearFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormInput
          label={'Academic Year'}
          type={'text'}
          name='yearName'
          value={yearFormData.yearName}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Start Date'}
          type={'date'}
          name='startDate'
          value={yearFormData.startDate}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'End Date'}
          type={'date'}
          name='endDate'
          value={yearFormData.endDate}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Year' : 'Add Year'} id="tyepButton" />
    </form>
  );
};

export default YearForm;