import React, { useState, useEffect } from 'react';
import DashboardCard from './card';
import api from '../../services/apiServices';

const StudentCard = () => {
    const [count, setCount] = useState('');

    const fetchData = async () => {
        try {
            const res = await api.countStudentByTeacher();
            const data = res.data.counter[0].count; 
            setCount(data[0]);
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    }, []);

    return (
        <>
            {count ? (
                <DashboardCard
                    label={'Students'}
                    figure={count.count}
                    icon={'student'}
                    note={'Total number of students'}
                    cardTop={'stCard'}
                    dico={'stIcon'}
                />
            ) : (
                <DashboardCard
                    label={'Students'}
                    figure={0}
                    icon={'student'}
                    note={'Total number of students'}
                    cardTop={'stCard'}
                    dico={'stIcon'}
                />
            )}
        </>
    );
};

export default StudentCard;
