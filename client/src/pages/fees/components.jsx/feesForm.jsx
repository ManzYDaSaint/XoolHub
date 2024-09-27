import React from 'react';
import api from '../../../services/apiServices.jsx'
import FormInput from '../../../components/input/formInput.jsx'
import FormButton from '../../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFeesFormData } from '../../../helpers/examination/examSlice.jsx';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';


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
            start: '',
            end: '',
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
        <Grid>
          <GridRow columns={3}>
            <GridColumn>
              <FormInput
                label={'Fee Name'}
                type={'text'}
                name='name'
                value={feesFormData.name}
                onChange={handleChange}
                placeholder={'Type here...'}
              />
            </GridColumn>
            <GridColumn>
              <FormInput
                label={'Amount'}
                type={'text'}
                name='amount'
                value={feesFormData.amount}
                onChange={handleChange}
                placeholder={'Type here...'}
              />
            </GridColumn>
            <GridColumn>
              <FormInput
                label={'Description'}
                type={'text'}
                name='description'
                value={feesFormData.description}
                onChange={handleChange}
                placeholder={'Type here...'}
              />
            </GridColumn>
          </GridRow>
          <GridRow columns={3}>
            <GridColumn>
              <FormInput
                label={'Start Date'}
                type={'date'}
                name='start'
                value={feesFormData.start}
                onChange={handleChange}
                placeholder={'Type here...'}
              />
            </GridColumn>
            <GridColumn>
              <FormInput
                label={'End Date'}
                type={'date'}
                name='end'
                value={feesFormData.end}
                onChange={handleChange}
                placeholder={'Type here...'}
              />
            </GridColumn>
          </GridRow>
        </Grid>
      </div>
      <FormButton label={isEditMode ? 'Update Fees' : 'Add Fees'} id="tyepButton" />
    </form>
  );
};

export default FeesForm;