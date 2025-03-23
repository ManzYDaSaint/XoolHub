import React, { useEffect, useState } from 'react'

import FormButton from '../../../components/input/formButton'
import GenderSelect from './genderSelect'
import { useParams } from 'react-router-dom'
import api from '../../../services/apiServices'
import { useSelector, useDispatch } from 'react-redux';
import { setStudentUpdateFormData } from '../../../helpers/examination/examSlice'
import { toast } from 'react-hot-toast';
import FormInput from '../../../components/input/formInput'

const Personal = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const updateFormData = useSelector((state) => state.exam.studentUpdateFormData);
    const [studentID, setStudentID] = useState(false);

    const fetchData = async (id) => {
        try {
            const res = await api.getSingleStudent(id);
            const data = res.data.studentid[0];

            dispatch(setStudentUpdateFormData({
                student: data.name || '',
                email: data.email || '',
                class: data.class || '',
                address: data.address || '',
                contact: data.contact || '',
                gender: data.gender || '',
                dob: data.dob || ''
            }));
            setStudentID(data.id);
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    };

    useEffect(() => {
        fetchData(id); // eslint-disable-next-line
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            const res = await api.updateStudent(studentID, data);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setStudentUpdateFormData({
                ...updateFormData,
                [name]: value,
            }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(updateFormData);
    };

    return (
        <div className='personalContainer p-6'>
            <div className="profileUpdate">
                <h5 className="text-lg font-bold py-4"><strong>Profile Information</strong></h5>
                <p className="text-gray-600 pb-5">Here you can edit information about yourself. <br /> The changes will be displaced and effective once it's updated.</p>
                <form onSubmit={onSubmit} autoComplete='off' className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <FormInput
                                label={'Name'}
                                type='text'
                                name='student'
                                placeholder='Type here..'
                                onChange={handleChange}
                                value={updateFormData.student}
                                disabled
                            />
                        </div>
                        <div>
                            <FormInput
                                label={'Email'}
                                type='email'
                                name='email'
                                placeholder='example@mail.com'
                                onChange={handleChange}
                                value={updateFormData.email}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <FormInput
                                label={'Class'}
                                type='text'
                                name='class'
                                placeholder='Type here..'
                                onChange={handleChange}
                                value={updateFormData.class}
                                disabled
                            />
                        </div>
                        <div>
                            <FormInput
                                label={'Address'}
                                type='text'
                                name='address'
                                placeholder='Type here..'
                                onChange={handleChange}
                                value={updateFormData.address}
                            />
                        </div>
                        <div>
                            <FormInput
                                label={'Contact'}
                                type='text'
                                name='contact'
                                placeholder='Type here..'
                                onChange={handleChange}
                                value={updateFormData.contact}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <GenderSelect
                                label={'Gender'}
                                name='gender'
                                onChange={handleChange}
                                value={updateFormData.gender}
                            />
                        </div>
                        <div>
                            <FormInput
                                label={'Date Of Birth'}
                                type='date'
                                name='dob'
                                onChange={handleChange}
                                value={updateFormData.dob}
                            />
                        </div>
                    </div>
                    <FormButton label={'Update Information'} id="tyepButton" className="mt-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600" />
                </form>
            </div>
        </div>
    )
}

export default Personal