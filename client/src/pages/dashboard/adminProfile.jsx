import React from 'react';
import Auth0 from '../../hooks/auth.jsx'
import { Toaster } from 'react-hot-toast';
import Sidebar from '../../components/input/sidebar.jsx'
import Navbar from '../../components/input/top.jsx'
import AdminTabs from './components/adminTabs.jsx';

const AdminProfile = () => {

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
                                    <div>
                                        <AdminTabs />
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

export default AdminProfile;
