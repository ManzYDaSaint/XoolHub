import React from 'react'
import FormButton from '../../components/input/formButton';
import FilterForm from '../form/filterForm';

const FilterData = ({ showX, handleXClose }) => {
    
  return (
    <>
        <div className="toggleDiv" style={{ display: showX ? 'block' : 'none' }}>
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleXClose}
            />
            <FilterForm />
            
        </div>
    </>
  )
}

export default FilterData