import React from 'react'
import Auth0 from '../../hooks/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import FormButton from '../../components/input/formButton.jsx'
import { useNavigate } from 'react-router-dom'
import '../fees/fees.css'
import { Icon } from 'semantic-ui-react'
import FeesDashboard from '../fees/dashboard/fees-dashboard.jsx'

const Fees = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/payment')
  }

  const handleRedirector = () => {
    navigate('/fees_setting')
  }

  return (
    <Auth0>
    <div className='dashboard__container'>
      <Toaster />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <div className="settingContainer">
            <div className="settingContent">
              <div className="student_container">
                <div className="splitter">
                    <div className="headerTitle">
                      <h5>Fees Management</h5>
                    </div>
                    <div className="groupRight">
                      <FormButton 
                        label={'View'}
                        id={'tyepButton'}
                        onClick={handleRedirect}
                      />
                      <Icon 
                        name='settings' 
                        alt='fees' 
                        className='feesIcon' 
                        onClick={handleRedirector}
                      />
                    </div>
                    
                </div>
                <div className="student_dashboard">
                  <FeesDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Auth0>
  )
}

export default Fees