import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/apiServices'
import Auth0 from '../../hooks/auth.jsx'
import { Toaster } from 'react-hot-toast';
import Sidebar from '../../components/input/sidebar.jsx'
import Navbar from '../../components/input/top.jsx'
import FormButton from '../../components/input/formButton';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const TeacherProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [teacherClass, setTeacherClasses] = useState(null);
    const [teacherSubject, setTeacherSubjects] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.getSingleTeacher(id);
                const data = res.data.teacherid;

                setTeacher(data);
            } catch (error) {
                console.error('Error fetching individual:', error);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchCData = async () => {
            try {
                const res = await api.getTeacherClasses(id);
                const data = res.data.classes;
                if(!data) {
                    setTeacherClasses(data)
                }
                else {
                    setTeacherClasses(data);
                }
            } catch (error) {
                console.error('Error fetching individual:', error);
            }
        };

        fetchCData();
    }, [id]);


    useEffect(() => {
        const fetchSData = async () => {
            try {
                const res = await api.getTeacherSubjects(id);
                const data = res.data.subs;
                if(!data) {
                    setTeacherClasses(data)
                }
                else {
                    setTeacherSubjects(data);
                }
            } catch (error) {
                console.error('Error fetching individual:', error);
            }
        };

        fetchSData();
    }, [id]);

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
                                <h4>TEACHER PROFILE</h4>
                            </div>
                            <div className="settingContent">
                                <div className='profile_container'>
                                    <div className="splitter">
                                        <FormButton
                                            label={'Back'}
                                            id={'tyepButton'}
                                            icon={'arrow left'}
                                            onClick={handleRedirect}
                                        />
                                        <div></div>
                                    </div>
                                    <div className="profile_content">
                                        <div className="profile_details">
                                            {teacher ? (
                                                <div className='bio'>
                                                    <Icon name='user circle outline' alt='bio_avatar' className='bio_avatar' />
                                                    <div className="bio_profile">
                                                        <p><strong>{teacher.name}</strong></p>
                                                        <p>{teacher.email}</p>
                                                        <p>{teacher.contact}</p>
                                                    </div>
                                                    <FormButton
                                                        label={'Deactivate'}
                                                        id={'dangerButton'}
                                                        icon={'shutdown'}
                                                        onClick={handleRedirect}
                                                    />
                                                </div>
                                            ) : (
                                                <p>No teacher data found.</p>
                                            )}
                                        </div>
                                        <div className="profile_attributes">
                                            <div className="attr_top">
                                                <div className="semicard">
                                                    <h6>Classes:</h6>
                                                    <ul>
                                                        {teacherClass ? (<li>{teacherClass.name}</li>) : (<li>No classes yet..</li>)}
                                                        
                                                        {/* {teacherClass.map((item) => {
                                                        })} */}
                                                    </ul>
                                                </div>
                                                <div className="semicard">
                                                    <h6>Subjects:</h6>
                                                    <ul>
                                                        {/* <li>{teacherSubject}</li> */}
                                                        <li>English</li>
                                                        <li>Mathematics</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <div className="charter">
                                                Chart
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Auth0>
    );
};

export default TeacherProfile;
