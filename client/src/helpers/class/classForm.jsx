import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setClassFormData } from '../examination/examSlice.jsx';
import FormSelect from '../../components/input/formSelect.jsx';


const ClassForm = ({ fetchData }) => {
    const classFormData = useSelector((state) => state.exam.classFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateClass(editItemId, data);
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
              const res = await api.addClass({ data });
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
          dispatch(setClassFormData({
            denom: '',
            className: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
        setClassFormData({
        ...classFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(classFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormSelect 
          label={'Denom'}
          name={'denom'}
          value={classFormData.denom}
          onChange={handleChange}
        />
        <FormInput
          label={'Class'}
          type={'text'}
          name='className'
          value={classFormData.className}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Class' : 'Add Class'} id="tyepButton" />
    </form>
  );
};

export default ClassForm;