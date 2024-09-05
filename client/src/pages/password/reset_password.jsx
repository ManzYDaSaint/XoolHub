import React, { useState } from 'react'
import './auth.css'
import Reseto from './assets/forgot.png'
import Input from '../../components/input/input'

const Reset = () => {
    const [activeInputId, setActiveInputId] = useState(null);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

const handlePassword
    = (event) => {
        setPassword(event.target.value);
  };
const handleConfirmPassword
    = (event) => {
        setConfirmPassword(event.target.value);
  };

  const handleFocus = (event) => {
    setActiveInputId(event.target.id);
  };

  const handleBlur = () => {
    setActiveInputId(null);
  };
  return (
    <div className='login_container'>
        <div className="shadow_container">
            <div className="content">
                <div className="header">
                    <img src={Reseto} alt="My Image Description" className='pass__master__icon' />
                </div>
                <div className="body">
                    <div className="dotted">
                        <h1>Set New Password</h1>
                        <div className="dot"></div>
                    </div>
                    <p>Your new password must be different to <br></br> previously used passwords</p>
                    <form className="custom_form forgot__new mb-5" autoComplete='off'>
                        <Input 
                            placeholder='Password'
                            name='password'
                            type='password'
                            value={password}
                            id='password'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePassword}
                        />
                        <Input 
                            placeholder='Confirm Password'
                            name='password'
                            type='password'
                            value={confirmPassword}
                            id='password'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleConfirmPassword}
                        />
                        <button type="submit" className='form_button'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reset