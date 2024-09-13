import React from 'react';
import api from '../../services/apiServices.jsx'
import FormInput from '../../components/input/formInput.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setGradeFormData } from '../examination/examSlice.jsx';
import FormSelect from '../../components/input/formSelect.jsx';


const GradeForm = ({ fetchData }) => {
    const gradeFormData = useSelector((state) => state.exam.gradeFormData);
    const dispatch = useDispatch();
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);

      // Handle submit
      const handleSubmit = async(data) => {
        if(isEditMode) {
          const res = await api.updateGrade(editItemId, data);
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
              const res = await api.addGrade({ data });
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
          dispatch(setGradeFormData({
            denom: '',
            roof: '',
            floor: '',
            grade: '',
            remark: '',
          }));
          dispatch(setIsEditMode(false));
          dispatch(setEditItemId(null));
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
        setGradeFormData({
        ...gradeFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(gradeFormData);
  };


  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='formGroup'>
        <div className="outSide">
          <div className="inSide">
            <FormSelect 
              label={'Denom'}
              name={'denom'}
              value={gradeFormData.denom}
              onChange={handleChange}
            />
            <FormInput
              label={'Roof'}
              type={'text'}
              name='roof'
              value={gradeFormData.roof}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
          <div className="inSide">
            <FormInput
              label={'Floor'}
              type={'text'}
              name='floor'
              value={gradeFormData.floor}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
            <FormInput
              label={'Grade'}
              type={'text'}
              name='grade'
              value={gradeFormData.grade}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
            <FormInput
              label={'Remark'}
              type={'text'}
              name='remark'
              value={gradeFormData.remark}
              onChange={handleChange}
              placeholder={'Type here...'}
            />
          </div>
      </div>
      <FormButton label={isEditMode ? 'Update Grade' : 'Add Grade'} id="tyepButton" />
    </form>
  );
};

export default GradeForm;