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
    const [logoFile, setLogoFile] = useState(null);

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
                slogan: data.slogan || '',
                option1: data.option1 || '',
                option2: data.option2 || '',
                option3: data.option3 || '',
                option4: data.option4 || '',
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
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('country', data.country);
            formData.append('email', data.email);
            formData.append('contact', data.contact);
            formData.append('slogan', data.slogan);
            formData.append('option1', data.option1);
            formData.append('option2', data.option2);
            formData.append('option3', data.option3);
            formData.append('option4', data.option4);
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
                <div className="imgContainer mt-3 mb-4">
                    {logoFile && (
                        <img
                            // Check if logoFile is a File object or a URL
                            src={logoFile instanceof File ? URL.createObjectURL(logoFile) : logoFile}
                            alt="Logo Preview"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', marginTop: '10px' }}
                        />
                    )}
                </div>
                <form onSubmit={onSubmit} autoComplete='off'>
                    <Grid divided='vertically'>
                        <GridRow columns={1}>
                            <GridColumn>
                                <label>Select Logo: </label>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/jpeg, image/png, image/gif, image/jpg"
                                    onChange={handleFileChange}
                                />
                            </GridColumn>
                        </GridRow>
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
                        <GridRow columns={3}>
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
                            <GridColumn>
                                <FormInput
                                    label={'Slogan'}
                                    type={'text'}
                                    name={'slogan'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.slogan}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    label={'Option 1'}
                                    type={'text'}
                                    name={'option1'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.option1}
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={3}>
                            <GridColumn>
                                <FormInput
                                    label={'Option 2'}
                                    type={'text'}
                                    name={'option2'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.option2}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    label={'Option 3'}
                                    type={'text'}
                                    name={'option3'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.option3}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    label={'Option 4'}
                                    type={'text'}
                                    name={'option4'}
                                    placeholder={'Type here..'}
                                    onChange={handleChange}
                                    value={adminFormData.option4}
                                />
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
