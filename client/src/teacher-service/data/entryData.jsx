import React, { useState } from 'react'
import EntryForm from '../form/entryForm'
import { Icon } from 'semantic-ui-react';
import FormButton from '../../components/input/formButton';

const EntryData = () => {
    const handleEntryClose = () => { setShowEntry(false); };
    const handleEntryOpen = () => { setShowEntry(true); };
    const [showEntry, setShowEntry] = useState(false);

  return (
    <>
        <div className="div" style={{ display: showEntry ? 'none' : 'block' }}>
            <button type="button" onClick={handleEntryOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Filter
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showEntry ? 'block' : 'none' }}>
            <EntryForm />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleEntryClose}
            />
        </div>
    </>
  )
}

export default EntryData