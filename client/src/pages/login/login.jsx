import React, { useState } from 'react'
import './login.css'
import 'semantic-ui-css/semantic.min.css'
import Input from '../../components/input/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import api from '../../services/apiServices.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginData } from '../../helpers/examination/examSlice.jsx';
import { Mail, Lock } from 'lucide-react'
import logo from '../../logo.png'

const Login = () => {
    const navigate = useNavigate();
    const loginData = useSelector((state) => state.exam.loginData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        try {
            const res = await api.Logon(data);
            if (res.data.success === true) {
                toast.success(res.data.message);

                // Redirecting to dashboard after successful login
                setTimeout(() => {
                    navigate('/administrator');
                }, 2000);
                return;
            }
            else if (res.data.tsuccess === true) {
                toast.success(res.data.tmessage);

                // Redirecting to dashboard after successful login
                setTimeout(() => {
                    navigate('/tdashboard');
                }, 2000);
                return;
            }
            else if (res.data.ssuccess === true) {
                toast.success(res.data.smessage);

                // Redirecting to dashboard after successful login
                setTimeout(() => {
                    navigate('/super');
                }, 2000);
                return;
            }
            else if(res.data.osuccess === true) {
                navigate('/authenticate', { state: { email: res.data.email } });
            }
            else if (res.data.message) {
                toast.error(res.data.message);
            }
            else {
                toast.error(res.data.tmessage);
            }
            dispatch(setLoginData({
                schoolEmail: '',
                schoolPassword: '',
            }));
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setLoginData({
                ...loginData,
                [name]: value,
            }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit(loginData);
    };
    return (
        <div className="notFound">
            <div className='logContainer'>
                <Toaster />
                <div className="logSider">
                    <p className='d-flex align-items-center justify-content-center mb-4'>
                        <Link to={'/'}>
                            <img src={logo} alt="logo" />
                        </Link>
                    </p>
                    <p className="login__paragraph mb-4">Only login using a registered email <br />address to log into the system.
                    </p>
                    <form onSubmit={onSubmit} className='loginForm'>
                        <Input
                            type="text"
                            name={'schoolEmail'}
                            placeholder="mail@example.com"
                            value={loginData.schoolEmail}
                            onChange={handleChange}
                            autoComplete={'off'}
                            icon={Mail}
                        />
                        <Input
                            type="password"
                            name={'schoolPassword'}
                            placeholder="password"
                            value={loginData.schoolPassword}
                            onChange={handleChange}
                            autoComplete={'off'}
                            icon={Lock}
                        />
                        <Link className="forgot" to={'/forgot'}>Forgot Password?</Link>
                        <button className='loginButton signin'>{loading ? 'Signing..' : 'Sign In'}</button>
                        <p className="cont">Or</p>
                        <Link to={'/register'} className='linka'><button className='loginButton regIn' id='nextButton'>Register</button></Link>
                        <p className='mt-4 termspolicy'>By clicking continue, you agree to our <Link to={'/terms'}>Terms <br />of Service</Link> and <Link to={'/policy'}>Privacy Policy</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login