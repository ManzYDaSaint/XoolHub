import React, { useState } from 'react'
import Input from '../../components/input/input'
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/apiServices.jsx'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterData } from '../../helpers/examination/examSlice.jsx';
import { ShieldEllipsis } from 'lucide-react'
import { InfinitySpin } from 'react-loader-spinner';


const Register = () => {
    const registerData = useSelector((state) => state.exam.registerData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        try {
            const res = await api.createSchool(data);
            if (res.data.success === true) {
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
        dispatch(setRegisterData({
            schoolEmail: '',
            schoolPassword: '',
            confirm: '',
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setRegisterData({
                ...registerData,
                [name]: value,
            }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit(registerData);
    };

    return (
        <div className="notFound">
            <div className='logContainer'>
                <Toaster />
                {loading && (
                    <div className='loki'>
                        <InfinitySpin width='200' color="#007BFE" />
                    </div>
                )}
                <div className="shieldContainer">
                    <ShieldEllipsis size={110} className='shield' />
                </div>
                <div className="logSider">
                    <h4>Create an account</h4>
                    <p class="loginPT mb-4">Enter your school's email, password and confirm <br /> password to create your account.
                    </p>
                    <form onSubmit={onSubmit} className='loginForm'>
                        <Input
                            type="text"
                            name={'schoolEmail'}
                            placeholder="mail@example.com"
                            value={registerData.schoolEmail}
                            onChange={handleChange}
                            autoComplete={'off'}
                        />
                        <Input
                            type="password"
                            name={'schoolPassword'}
                            placeholder="password"
                            value={registerData.schoolPassword}
                            onChange={handleChange}
                            autoComplete={'off'}
                        />
                        <Input
                            type="password"
                            name={'confirm'}
                            placeholder="confirm password"
                            value={registerData.confirm}
                            onChange={handleChange}
                            autoComplete={'off'}
                        />
                        <button className='loginButton signin'>Register</button>
                        <p className="cont">Or Continue</p>
                        <Link to={'/'} className='linka'><button className='loginButton regIn'>Log In</button></Link>
                        <p className='mt-4 termspolicy'>By clicking continue, you agree to our <Link to={''}>Terms <br />of Service</Link> and <Link to={''}>Privacy Policy</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register