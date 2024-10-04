import React, { useState } from 'react'
import NavBar from './components/navbar.jsx'
import { Toaster } from 'react-hot-toast'
import AuthT from '../hooks/tauth.jsx'
import './teacher-service.css'
import LogOutModal from './components/modal.jsx'
import { Icon } from 'semantic-ui-react'

const TeacherDashboard = () => {
    const [open, setOpen] = useState(false);

  return (
    <AuthT>
        <LogOutModal open={open} setOpen={setOpen} />
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        <div className="teacherContent">
                            <div className="righter">
                                <div className="headerr">
                                    <h4>Welcome back, Emmanuel Nyangazi</h4>
                                    <p>Here's the updates you might wanna catch up <br/> while being away</p>
                                    <div className="cards">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="card">
                                                        One
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card">
                                                        Two
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card">
                                                        Three
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lefter">
                                <button onClick={() => setOpen(true)}>
                                    <Icon name='shutdown' />
                                    Log Out
                                </button>
                                <div className="teacherInfo">
                                    <Icon name='user circle outline' className='headerIcon mt-3'/>
                                    <div className="teacherDeto mt-4">
                                        <h6>Emmanuel Nyangazi</h6>
                                        <p>ManzyN@outlook.com</p>
                                        <p>0993533315</p>
                                        <p>Tembwe</p>
                                        <ul className='mt-5'>
                                            <li>
                                                <p className="classes">Form One</p>
                                                <p className="subject">Mathematics</p>
                                            </li>
                                            <li>
                                                <p className="classes">Form One</p>
                                                <p className="subject">Mathematics</p>
                                            </li>
                                        </ul>
                                        <div className="classTeacher">
                                            <Icon name='universal access' className='classtIcon' />
                                            <div className="splitLeft">
                                                <h6>Class Teacher:</h6>
                                                <p>Form Four</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default TeacherDashboard