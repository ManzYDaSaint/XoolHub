import React from 'react'
import Auth0 from '../../hooks/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import FormButton from '../../components/input/formButton.jsx'
import { useNavigate } from 'react-router-dom'
import '../teacher/teacher.css'

const Teachers = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/config')
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
              <h4>TEACHER DASHBOARD</h4>
            </div>
            <div className="settingContent">
              <div className="teacher_container">

                <div className="splitter">
                    <div></div>
                    <FormButton 
                        label={'Configuration'}
                        id={'tyepButton'}
                        icon={'settings'}
                        onClick={handleRedirect}
                        />
                </div>
                <div className="teacher_dashboard">
                  Dashboard starts here....
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

export default Teachers