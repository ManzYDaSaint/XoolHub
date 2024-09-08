import React, { useState } from 'react';
import FormInput from './input/formInput';
import FormButton from './input/formButton';


const CustomisedForm = ({ formData, setFormData, handleSubmit, isEditMode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
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

export default CustomisedForm;