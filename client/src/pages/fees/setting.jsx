import React from 'react';
import Auth0 from '../../hooks/auth.jsx'
import { Toaster } from 'react-hot-toast';
import Sidebar from '../../components/input/sidebar.jsx'
import Navbar from '../../components/input/top.jsx'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import FeesData from './components.jsx/feesData.jsx';

const Setting = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/fees')
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
                                        <Icon 
                                            name='arrow left'
                                            onClick={handleRedirect}
                                            className='feesIcon'
                                        />
                                        <div></div>
                                    </div>
                                    <div className='fees_container'>
                                        <FeesData />
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

export default Setting;
