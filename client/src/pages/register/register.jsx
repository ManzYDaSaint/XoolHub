import React, {useState} from 'react'
import regIcon from './assets/files (2).png'
import './register.css'
import Input from '../../components/input/input'
import 'react-toastify/dist/ReactToastify.css';
import useFormik from 'formik'
import SchoolServices from '../../services/authServices.jsx'
import { registerVerify } from '../../helpers/validate.jsx';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Register = () => {
    const [ schoolName, setSchoolName ] = useState([]);
    const [ schoolEmail, setSchoolEmail ] = useState([]);
    const [ schoolPhone, setSchoolPhone ] = useState([]);
    const [ schoolPassword, setSchoolPassword ] = useState([]);
    const [ confirmPassword, setConfirmPassword ] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await SchoolServices.createSchool({schoolName, schoolEmail, schoolPhone, schoolPassword});

            console.log('Success:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <main className="register__page">
        <Toaster position='top-center'reverseOrder='false' />
        <div className="register__container">
            <img src={regIcon} alt="register__image" className="register__image mr-0" />
            <div className="col-lg-12">
                <h5 className="register__header">Register</h5>
                <p className="register__paragraph">Complete the required fields in the inputs below to register to the system.</p>
                <small className="register__small">NB: Please keep the details which you use to register <br></br>the system with, because it will be the same details to be used when logging into the system.</small>
            </div>
            <div className="row divider">
                <div className="col-lg-12 mt-4">
                    <form className="ui form reg__form" onSubmit={handleSubmit} method="post" id="register__form" autoComplete="off">
                        <div className="top__form register__form" id="top__form">
                            <div className="field">
                                <Input 
                                    icon='student'
                                    label='School name'
                                    type='text'
                                    name='Name'
                                    id='school__name'
                                    placeholder='type school name here..'
                                    value={schoolName}
                                    onChange={e => setSchoolName(e.target.value)}
                                />
                                <p className="info">Add school name eg:. 'EA PRIVATE SECONDARY SCHOOL'</p>
                            </div>
                            <div className="field">
                                <div className="two fields">
                                    <div className="field">
                                        <Input 
                                            icon='mail'
                                            label='School Email'
                                            type='email'
                                            name='schoolEmail'
                                            id='email'
                                            placeholder='type school email here..'
                                            value={schoolEmail}
                                            onChange={e => setSchoolEmail(e.target.value)}
                                        />
                                        <p className="info">Add school email address eg:. 'example@mail.com'</p>
                                    </div>
                                    <div className="field">
                                        <Input 
                                            icon='phone'
                                            label='School Contact'
                                            type='text'
                                            name='schoolPhone'
                                            id='phone'
                                            placeholder='type school contact here..'
                                            value={schoolPhone}
                                            onChange={e => setSchoolPhone(e.target.value)}
                                        />
                                        <p className="info">Add school contact (one)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="two fields">
                                    <div className="field">
                                        <Input 
                                            icon='lock'
                                            label='Password'
                                            type='text'
                                            name='schoolPassword'
                                            id='password'
                                            placeholder='type password here..'
                                            value={schoolPassword}
                                            onChange={e => setSchoolPassword(e.target.value)}
                                        />
                                        <p className="info">Add login password</p>
                                    </div>
                                    <div className="field">
                                        <Input 
                                            icon='check circle'
                                            label='Confirm Password'
                                            type='text'
                                            name='confirmPassword'
                                            id='confirm'
                                            placeholder='type confirm password here..'
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                        <p className="info">Confirm login password</p>
                                    </div>
                                </div>
                            </div>
                            <div className="register__button mb-3">
                                <button type="submit" id="register__button" name="register">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <p className="register__already__text mb-3" id="tempo">
                Already have an account? <Link to={'/'}> Login</Link>
            </p>
        </div>
    </main>
  )
}

export default Register