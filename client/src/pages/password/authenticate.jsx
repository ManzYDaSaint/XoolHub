import React, { useState, useRef } from 'react'
import './auth.css'
import Shield from './assets/auth.png'
import { useLocation } from 'react-router-dom';

const Authenticate = () => {
  const location = useLocation();
  const email = location.state?.email || '';
    const [activeInputId, setActiveInputId] = useState(null);
    const [inputs, setInputs] = useState(Array(6).fill(''));
  const inputRefs = useRef(Array(6).fill(null)); // Array of refs for focusing

  const handleChange = (index, event) => {
    const newValue = event.target.value.slice(0, 1); // Get only the first character
    if (!isNaN(newValue)) {
      const updatedInputs = [...inputs]; // Create a copy of the state
      updatedInputs[index] = newValue; // Update the specific input

      setInputs(updatedInputs);

      // Focus the next input (if it exists and not the last one)
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1].focus(); // Focus using ref
      }
    }
  };

  const handleFocus = (event) => {
    setActiveInputId(event.target.id);
  };

  const handleBlur = () => {
    setActiveInputId(null);
  };
  return (
    <div className='auth_container'>
            <div className="auth_content">
                <div className="header">
                    <img src={Shield} alt="My Image Description" className='pass__master__icon' />
                </div>
                <div className="body">
                    <div className="dotted">
                        <h1>Authenticate Your Account</h1>
                        <div className="dot"></div>
                    </div>
                    <p>Protecting your tickets is our priority. Please confirm your <br></br>account by entering the authrization code sent to <br></br><strong>{email}</strong></p>
                    <form className="custom_form" autoComplete='off'>
                        <div className="codeBase">
                            <div id='hols' className={`one_field ${activeInputId ==='5' ? 'active' : ''}`}>
                                <div id='hola' className="input_right">
                                    {inputs.map((input, index) => (
                                        <input
                                        key={index}
                                        type="text"
                                        value={input}
                                        maxLength="1"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className='auth_code'
                                        onChange={(event) => handleChange(index, event)}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="auth_page">
                            <p>It may take a minute to receive your code. <br></br> Haven't received it? <span className='colour'>Resend a new code.</span></p>
                            <button type="submit" className='form_button' id='resetBtn'>Verify</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
  )
}

export default Authenticate