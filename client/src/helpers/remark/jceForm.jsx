import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setJCEFormData } from '../examination/examSlice.jsx';


const JceForm = ({ fetchJCE }) => {
    const jceFormData = useSelector((state) => state.exam.jceFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateJCE(editItemId, data);
          fetchJCE();
          if(res.data.success === true) {
            toast.success(res.data.message);
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
            try {
              const res = await api.addJCE({ data });
              if (res.data.success === true) {
                fetchJCE();
                toast.success(res.data.message);
              } 
              else {
                toast.error(res.data.message);
              }
            } catch (error) {
              toast.error('An error occurred. Please try again.');
            }
          }
          dispatch(setJCEFormData({
            denom: 'JCE',
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
        setJCEFormData({
        ...jceFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(jceFormData);
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
              value={jceFormData.denom}
              onChange={handleChange}
            />
          </div>
          <div className="inSide">
            <FormInput
              label={'Roof'}
              type={'text'}
              name='roof'
              value={jceFormData.roof}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
            <FormInput
              label={'Floor'}
              type={'text'}
              name='floor'
              value={jceFormData.floor}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
            <FormInput
              label={'Remark'}
              type={'text'}
              name='remark'
              value={jceFormData.remark}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
      </div>
      <FormButton label={isEditMode ? 'Update JCE Remark' : 'Add JCE Remark'} id="tyepButton" />
    </form>
  );
};

export default JceForm;