import React from 'react';
import api from '../../../services/apiServices.jsx'
import FormInput from '../../../components/input/formInput.jsx'
import FormButton from '../../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFeesFormData } from '../../../helpers/examination/examSlice.jsx';


const FeesForm = ({ fetchData }) => {
    const feesFormData = useSelector((state) => state.exam.feesFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateFee(editItemId, data);
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
              const res = await api.addFee({ data });
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
          dispatch(setFeesFormData({
            name: '',
            amount: '',
            description: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setFeesFormData({
        ...feesFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(feesFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <FormInput
              label={'Fee Name'}
              type={'text'}
              name='name'
              value={feesFormData.name}
              onChange={handleChange}
              placeholder={'Type here...'}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <FormInput
              label={'Amount'}
              type={'text'}
              name='amount'
              value={feesFormData.amount}
              onChange={handleChange}
              placeholder={'Type here...'}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <FormInput
              label={'Description'}
              type={'text'}
              name='description'
              value={feesFormData.description}
              onChange={handleChange}
              placeholder={'Type here...'}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
      </div>
      <FormButton label={isEditMode ? 'Update Fees' : 'Add Fees'} id="tyepButton" />
    </form>
  );
};

export default FeesForm;