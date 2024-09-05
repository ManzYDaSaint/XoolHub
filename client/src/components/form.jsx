import React, { useState } from 'react';
import FormInput from './input/formInput';
// import { FormGroup } from 'semantic-ui-react';
import FormButton from './input/formButton';
import { toast } from 'react-hot-toast';
import schoolServices from '../services/authServices.jsx'

const CustomisedForm = () => {
  const [typeName, setTypeName] = useState([]);
  const [percentage, setPercentage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Truthy/Falsy Check
    if (!typeName.length) {
      toast.error('Enter examination type please..');
      return;
    } else if (!percentage.length) {
      toast.error('Enter percentage please..');
      return;
    }

    try {
      const response = await schoolServices.newType({ typeName, percentage });

      if (response) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg); // Assuming your API provides error messages
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <div className='formGroup'>
        <FormInput
          label={'Examination Type'}
          type={'text'}
          name={'type'}
          value={typeName}
          onChange={e => setTypeName(e.target.value)}
          placeholder={'Type here...'}
        />
        <FormInput
          label={'Percentage'}
          type={'text'}
          name={'percentage'}
          value={percentage}
          onChange={e => setPercentage(e.target.value)}
          placeholder={'Type here...'}
        />
      </div>
      <FormButton label={'Add Type'} id="tyepButton" />
    </form>
  );
};

export default CustomisedForm;