import React from 'react'
import Sidebar from '../../components/input/sidebar'
import './dashboard.css'
import Navbar from '../../components/input/top'
import ReportData from '../reports/reportData'

const Report = () => {
  return (
    <div className='dashboard__container'>
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <div className="settingContainer">
            <div className="settingContent">
              <div className="student_container">
                <div className="splitter">
                    <div className="headerTitle">
                      <h5>Reports Management</h5>
                    </div>                    
                </div>
                <div className="student_dashboard">
                  <ReportData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report