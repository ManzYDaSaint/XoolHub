import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setMSCEFormData } from '../examination/examSlice.jsx';


const MsceForm = ({ fetchData }) => {
    const msceFormData = useSelector((state) => state.exam.msceFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateMSCE(editItemId, data);
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
              const res = await api.addMSCE({ data });
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
          dispatch(setMSCEFormData({
            denom: 'MSCE',
            roof: '',
            floor: '',
            remark: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
        setMSCEFormData({
        ...msceFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(msceFormData);
  };


  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <div className="outSide">
          <div className="inSide">
            <FormInput 
              // label={'Denom'}
              name={'denom'}
              type={'hidden'}
              value={msceFormData.denom}
              onChange={handleChange}
            />
          </div>
          <div className="inSide">
            <FormInput
              label={'Roof'}
              type={'text'}
              name='roof'
              value={msceFormData.roof}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
            <FormInput
              label={'Floor'}
              type={'text'}
              name='floor'
              value={msceFormData.floor}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
            <FormInput
              label={'Remark'}
              type={'text'}
              name='remark'
              value={msceFormData.remark}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
      </div>
      <FormButton label={isEditMode ? 'Update MSCE Remark' : 'Add MSCE Remark'} id="tyepButton" />
    </form>
  );
};

export default MsceForm;