import React from 'react';
import Auth0 from '../../hooks/auth.jsx'
import { Toaster } from 'react-hot-toast';
import Sidebar from '../../components/input/sidebar.jsx'
import Navbar from '../../components/input/top.jsx'
import FormButton from '../../components/input/formButton';
import { useNavigate } from 'react-router-dom';
import Tabs from './components/tabs.jsx';

const StudentProfile = () => {
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
                                    <div>
                                        <Tabs />
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

export default StudentProfile;
