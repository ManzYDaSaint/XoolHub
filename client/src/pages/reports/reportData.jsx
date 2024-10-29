import React, { useState } from 'react'
import ReportForm from './reportForm.jsx'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../components/input/formButton.jsx'

const ReportData = () => {
    // const dispatch = useDispatch();
    const [showReport, setShowReport] = useState(false);
    const handleReportOpen = () => { setShowReport(true); };
    const handleReportClose = () => { setShowReport(false); };

  return (
    <>
        <div className="div" style={{ display: showReport ? 'none' : 'block' }}>
            <button type="button" onClick={handleReportOpen} 
            className="add__rows__btn">
            <Icon name='filter' className='filter' />
            Filter
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showReport ? 'block' : 'none' }}>
            <FormButton 
              label={'Close'}
              id={'closeBtn'}
              onClick={handleReportClose}
            />
            <ReportForm />
        </div>
    </>
  )
}

export default ReportData