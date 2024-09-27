import React, { useEffect, useState } from 'react'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import FormInput from '../../../components/input/formInput'
import FormButton from '../../../components/input/formButton'
import GenderSelect from './genderSelect'
import { useParams } from 'react-router-dom'
import api from '../../../services/apiServices'
import { useSelector, useDispatch } from 'react-redux';
import { setStudentUpdateFormData } from '../../../helpers/examination/examSlice'
import { toast } from 'react-hot-toast';

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

    const handleSubmit = async(data) => {
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
    <div className='personalContainer'>
        <div className="profileUpdate">
            <h5><strong>Profile Information</strong></h5>
            <p>Here you can edit information about yourself. <br /> The changes will be displaced and effective once it's updated.</p>
            <form onSubmit={onSubmit} autoComplete='off'>
                <Grid divided='vertically'>
                    <GridRow columns={2}>
                        <GridColumn>
                            <FormInput 
                                label={'Name'}
                                type={'text'}
                                name={'student'}
                                placeholder={'Type here..'}
                                onChange={handleChange}
                                value={updateFormData.student}
                                disabled
                            />
                        </GridColumn>
                        <GridColumn>
                            <FormInput 
                                label={'Email'}
                                type={'email'}
                                name={'email'}
                                placeholder={'example@mail.com'}
                                onChange={handleChange}
                                value={updateFormData.email}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={3}>
                        <GridColumn>
                            <FormInput 
                                label={'Class'}
                                type={'text'}
                                name={'class'}
                                placeholder={'Type here..'}
                                onChange={handleChange}
                                value={updateFormData.class}
                                disabled
                            />
                        </GridColumn>
                        <GridColumn>
                            <FormInput 
                                label={'Address'}
                                type={'text'}
                                name={'address'}
                                placeholder={'Type here..'}
                                onChange={handleChange}
                                value={updateFormData.address}
                            />
                        </GridColumn>
                        <GridColumn>
                            <FormInput 
                                label={'Contact'}
                                type={'text'}
                                name={'contact'}
                                placeholder={'Type here..'}
                                onChange={handleChange}
                                value={updateFormData.contact}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={2}>
                        <GridColumn>
                            <GenderSelect 
                                label={'Gender'}
                                name={'gender'}
                                onChange={handleChange}
                                value={updateFormData.gender}
                            />
                        </GridColumn>
                        <GridColumn>
                            <FormInput 
                                label={'Date Of Birth'}
                                type={'date'}
                                name={'dob'}
                                placeholder={'Type here..'}
                                onChange={handleChange}
                                value={updateFormData.dob}
                            />
                        </GridColumn>
                    </GridRow>
                </Grid>
                <FormButton label={'Update Information'} id="tyepButton" />
            </form>
        </div>
    </div>
  )
}

export default Personal