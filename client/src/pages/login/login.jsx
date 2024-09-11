import React from 'react'
import './login.css'
import 'semantic-ui-css/semantic.min.css'
import logImg from './assets/lgin_image.svg';
import Input from '../../components/input/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import api from '../../services/apiServices.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginData } from '../../helpers/examination/examSlice.jsx';


const Login = () => {
    const navigate = useNavigate();
    const loginData = useSelector((state) => state.exam.loginData);
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        try {
            const res = await api.Logon(data);
            if(res.data.success === true) {
                toast.success(res.data.message);

                // Redirecting to dashboard after successful login
                setTimeout(() => {
                    navigate('/administrator');
                  }, 2000);
                
            }
            else {
            toast.error(res.data.message);
            }
            dispatch(setLoginData({
                schoolEmail: '',
                schoolPassword: '',
              }));
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error:', error);
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
        handleSubmit(loginData);
      };
  return (
    <main class="login__page">
        <Toaster />
        <div class="login__container">
            <div class="container-fluid">
                <div class="even__space">
                    <div class="col-lg-6">
                        <div class="login__image__container">
                            <img src={logImg} alt="login__image" className='login__image' />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form action="" class="ui form login__form" onSubmit={onSubmit} id="login__form" autoComplete='off'>
                            <h2 class="login__header">Welcome Back :)</h2>
                            <p class="login__paragraph mb-4">To log in to the system, provide your credentials which 
                                you registerd with the system for authentication!
                            </p>
                            <Input 
                                icon='user outline'
                                label="Email"
                                type="text"
                                name={'schoolEmail'}
                                placeholder="Type email here.."
                                value={loginData.schoolEmail}
                                onChange={handleChange}
                            />
                            <Input 
                                icon='lock'
                                label="Password"
                                type="password"
                                name={'schoolPassword'}
                                placeholder="Type password here.."
                                value={loginData.schoolPassword}
                                onChange={handleChange}
                            />
                            <Link class="login__forgot__password" to={'./forgot'}>Forgot Password?</Link>
                            <div class="form__button">
                                <button id="sign__in">Sign In</button>
                            </div>
                            <p class="login__already__text ml-5">
                                Haven't registered already? <Link to={'/register'}>Register Here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Login