import React, { useEffect, useState } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import FormInput from '../../../components/input/formInput';
import FormButton from '../../../components/input/formButton';
import api from '../../../services/apiServices';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminFormData } from '../../../helpers/examination/examSlice';
import { toast } from 'react-hot-toast';
import { InfinitySpin } from 'react-loader-spinner';

const AdminPersonal = () => {
    const dispatch = useDispatch();
    const adminFormData = useSelector((state) => state.exam.adminFormData);
    const [loading, setLoading] = useState(false);
    const [logoFile, setLogoFile] = useState(null); // Handle file separately

    const fetchData = async () => {
        try {
            const res = await api.getSchool();
            const data = res.data.details;

            dispatch(setAdminFormData({
                name: data.name || '',
                address: data.address || '',
                city: data.city || '',
                country: data.country || '',
                email: data.email || '',
                contact: data.contact || '',
            }));

            // If the logo is retrieved as a URL, display it
            if (data.logo) {
                setLogoFile(data.logo); // URL to show the image
            }
        } catch (error) {
            console.error('Error fetching individual:', error);
        }
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setAdminFormData({
            ...adminFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setLogoFile(e.target.files[0]); // Handle file selection
    };

    const handleSubmit = async (data) => {
        // console.log(data)
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('country', data.country);
            formData.append('email', data.email);
            formData.append('contact', data.contact);
            if (logoFile) {
                formData.append('logo', logoFile); // Append logo file
            }

            const res = await api.updateSchool(formData);
            if (res.data.success) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit(adminFormData);
    };

    return (
        <div className='personalContainer'>
            {loading && (
                <div className='loki'>
                    <InfinitySpin width='200' color="#007BFE" />
                </div>
            )}
            <div className="profileUpdate">
                <h5><strong>Administrator Information</strong></h5>
                <p>Here you can edit information about yourself. <br /> The changes will be displayed and effective once updated.</p>
                <form onSubmit={onSubmit} autoComplete='off'>
                    <Grid divided='vertically'>
                        <GridRow columns={2}>
                            <GridColumn>
                                <FormInput
                                    label={'Name'}
                                    type={'text'}
                                    name={'name'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.name}
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
                                    value={adminFormData.address}
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={3}>
                            <GridColumn>
                                <FormInput
                                    label={'City'}
                                    type={'text'}
                                    name={'city'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.city}
                                    disabled
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    label={'Country'}
                                    type={'text'}
                                    name={'country'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.country}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    label={'Email'}
                                    type={'email'}
                                    name={'email'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.email}
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={2}>
                            <GridColumn>
                                <FormInput
                                    label={'Contact'}
                                    type={'text'}
                                    name={'contact'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.contact}
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={1}>
                            <GridColumn>
                                <label>Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {logoFile && (
                                    <img
                                        // Check if logoFile is a File object or a URL
                                        src={logoFile instanceof File ? URL.createObjectURL(logoFile) : logoFile}
                                        alt="Logo Preview"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }}
                                    />
                                )}
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <FormButton label={'Update Information'} id="tyepButton" />
                </form>
            </div>
        </div>
    );
};

export default AdminPersonal;
