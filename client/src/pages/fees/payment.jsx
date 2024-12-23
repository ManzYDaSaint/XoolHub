import React, { useState, useEffect } from 'react';
import Auth0 from '../../hooks/auth.jsx'
import { Toaster } from 'react-hot-toast';
import Sidebar from '../../components/input/sidebar.jsx'
import Navbar from '../../components/input/top.jsx'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PayTable from './components.jsx/payTable.jsx';
import api from '../../services/apiServices.jsx';
import { Timer, CircleCheckBig } from 'lucide-react';

const Payment = () => {
    const navigate = useNavigate();
    const [payData, setPayData] = useState([]);

    const handleRedirect = () => {
        navigate('/fees')
    }

    const handleView = (id) => {
        navigate(`/student_profile/${id}`);
    };

    const fetchData = async () => {
        const res = await api.getPay();
        const data = res.data.pay;
        if(data.length < 1) {
            const payData = data.map((item, index) => ({
            sr: "",
            date: "",
            name: "No records found...",
            term: "",
            class: "",
            fee: "",
            amount: "",
            status: "",
            actions: ""
            }));
            setPayData(payData);
        }
        else {
            const payData = data.map((item, index) => ({
            sr: index + 1,
            date: item.updated_at.slice(0, 10),
            name: item.student,
            term: item.term + " (" + item.year + ")",
            class: item.class,
            fee: item.fee,
            amount: item.paid,
            status: (
                <>
                    {item.status === 'ongoing' ? (
                        <>
                            <Timer size={16} className='iconLucide' color='orange' /> Ongoing
                        </>
                    ) : item.status === 'complete' ? (
                        <>
                            <CircleCheckBig size={15} className='iconLucide' color='green' /> Complete
                        </>
                    ) : (
                        item.status
                    )}
                </>
              ),
            actions: (
                <div>
                    <button onClick={() => handleView(item.id)} className='action_icon'><Icon name='eye' className='action_view' /></button>
                </div>
            ),
            }));
            setPayData(payData);
        }
      };
    
      useEffect(() => {
          fetchData();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps


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
                                <div className="h">
                                    <PayTable payData={payData} />
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

export default Payment;
