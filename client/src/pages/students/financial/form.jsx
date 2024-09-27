import React, { useState } from 'react';
import api from '../../../services/apiServices.jsx'
import FormInput from '../../../components/input/formInput.jsx'
import FormButton from '../../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setPayFormData } from '../../../helpers/examination/examSlice.jsx';
import FeesSelectInput from '../components/feesSelect.jsx';


const PfForm = ({ fetchData }) => {
  const { id } = useParams();
    const payFormData = useSelector((state) => state.exam.payFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);
    const [feeid, setSelectedId] = useState(null);
    const [feeamount, setSelectedAmount] = useState(null);

  const handleFeeChange = (data) => {
    setSelectedId(data.id);
    setSelectedAmount(data.amount);
    // Process the selected ID and amount here
  };

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updatePay(editItemId, data);
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
              const res = await api.addPay({ id, feeamount, feeid, data });
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
          dispatch(setPayFormData({
            paid: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPayFormData({
        ...payFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(payFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FeesSelectInput
          label={'Fee category'}
          onChange={handleFeeChange}
        />
        <FormInput
          label={'Amount'}
          type={'text'}
          name='paid'
          value={payFormData.paid}
          onChange={handleChange}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={isEditMode ? 'Update Pay' : 'Pay'} id="tyepButton" />
    </form>
  );
};

export default PfForm;