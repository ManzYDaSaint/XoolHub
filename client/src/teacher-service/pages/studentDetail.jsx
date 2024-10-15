import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/navbar'
import AuthT from '../../hooks/tauth'
import { useParams } from 'react-router-dom'
import ProImage from '../student.png'
import Cap from '../cap.png'
import FormButton from '../../components/input/formButton'
import { useNavigate } from 'react-router-dom'
import api from '../../services/apiServices'
import StudentHistory from '../components/history'

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState('')

    const handleRedirect = () => {
        navigate('/tstudent')
    }

    const fetchData = async (id) => {
        try {
            const res = await api.getSingleStud(id);
            const data = res.data.studentid[0];
            setStudent(data);

        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    }; 

    useEffect(() => {        
        fetchData(id); // eslint-disable-next-line
    }, [id]);
  return (
    <AuthT>
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        <FormButton
                            label={'Back'}
                            id={'tyepButton'}
                            icon={'arrow left'}
                            onClick={handleRedirect}
                        />
                        <div className="studentContainer">
                        {student ? (
                            <>
                                <header>
                                    <img src={ProImage} alt="imager" className='studentIcon' />
                                    <div className="info">
                                        <h4 className='text-uppercase'>{student.name}</h4>
                                        <p>Class: {student.class}</p>
                                    </div>
                                    <img src={Cap} alt="imager" className='cap' />
                                </header>
                                <section>
                                    <h6 className='baso mt-3'>Basic Details:</h6>
                                    <div className="row mt-4">
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Admission Date:</h6>
                                                <p>{student.admission}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Date Of Birth:</h6>
                                                <p>{student.dob}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Gender:</h6>
                                                <p>{student.gender}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Address:</h6>
                                                <p>{student.address}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Contact:</h6>
                                                <p>{student.contact}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="chunk">
                                                <h6 className='text-secondary'>Email:</h6>
                                                <p>{student.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        ) : (
                            <p>No teacher data found.</p>
                        )}
                        <div className="history">
                            <div className="insideHistory">
                                <h6 className='his mb-4'>Student History</h6>
                            <StudentHistory />
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

export default StudentDetail