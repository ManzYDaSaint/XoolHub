import React from 'react'
import Auth0 from '../../hooks/auth'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import { Toaster } from 'react-hot-toast'
import StudentData from './studentData'

const AddStudents = () => {
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
                                <div className="student_containo">
                                    <StudentData />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Auth0>
    )
}

export default AddStudents