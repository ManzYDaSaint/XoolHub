import React, {useState} from 'react'
import './login.css'
import 'semantic-ui-css/semantic.min.css'
import logImg from './assets/lgin_image.svg';
import Input from '../../components/input/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import schoolServices from '../../services/authServices.jsx'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ schoolEmail, setSchoolEmail ] = useState([]);
    const [ schoolPassword, setSchoolPassword ] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!schoolEmail) {
            toast.error('Please enter the email address..');
            return;
        }
        else if(!schoolPassword) {
            toast.error('Please enter the password..');
            return;
        }

        try {
            const response = await schoolServices.Logon({schoolEmail, schoolPassword});

            if (response) {
                toast.success(response.data.msg);
                localStorage.setItem('token', response.data.token);

                // Redirect to the dashboard or another page
                navigate('/administrator')
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error:', error);
        }
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
                        <form action="" class="ui form login__form" onSubmit={handleSubmit} id="login__form" autoComplete='off'>
                            <h2 class="login__header">Welcome Back :)</h2>
                            <p class="login__paragraph mb-4">To log in to the system, provide your credentials which 
                                you registerd with the system for authentication!
                            </p>
                            <Input 
                                icon='user outline'
                                label="Email"
                                type="text"
                                placeholder="Type email here.."
                                value={schoolEmail}
                                onChange={e => setSchoolEmail(e.target.value)}
                            />
                            <Input 
                                icon='lock'
                                label="Password"
                                type="password"
                                placeholder="Type password here.."
                                value={schoolPassword}
                                onChange={e => setSchoolPassword(e.target.value)}
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