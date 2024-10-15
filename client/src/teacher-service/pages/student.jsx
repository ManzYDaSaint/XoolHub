import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/navbar'
import AuthT from '../../hooks/tauth'
import StudentData from '../data/studentData'

const TStudent = () => {
  return (
    <AuthT>
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        <div className="studentContainer">
                            <h5>STUDENT MANAGEMENT</h5>
                            <p>This page displays students from only the class from which you are assigned as a Class Teacher. <br />
                            You can view academic progress of the student, fees history and generate reports for individual student.</p>
                            <StudentData />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default TStudent