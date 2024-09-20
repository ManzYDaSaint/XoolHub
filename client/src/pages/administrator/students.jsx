import React from 'react'
import Auth0 from '../../hooks/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import FormButton from '../../components/input/formButton.jsx'
import { useNavigate } from 'react-router-dom'
import '../students/students.css'

const Students = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/addstudents')
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
            <div className="headerTitle">
              <h4>STUDENT DASHBOARD</h4>
            </div>
            <div className="settingContent">
              <div className="student_container">
                <div className="splitter">
                    <div></div>
                    <FormButton 
                        label={'Add Students'}
                        id={'tyepButton'}
                        icon={'plus'}
                        onClick={handleRedirect}
                        />
                </div>
                <div className="student_dashboard">
                  Dashboard under construction....
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

export default Students