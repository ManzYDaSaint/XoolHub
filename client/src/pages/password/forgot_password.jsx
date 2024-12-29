import React, { useState } from "react";
import "./auth.css";
import Email from "./assets/email.png";
import Input from "../../components/input/input";
import Buttonee from "../../components/input/button.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react'

const Forgot = () => {
  const [activeInputId, setActiveInputId] = useState(null);
  const [email, setEmail] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFocus = (event) => {
    setActiveInputId(event.target.id);
  };

  const handleBlur = () => {
    setActiveInputId(null);
  };
  return (
    <div className="auth_container">
      <div className="auth_content">
        <div className="header">
          <img
            src={Email}
            alt="My Image Description"
            className="pass__master__icon"
          />
        </div>
        <div className="body">
          <div className="dotted">
            <h1>Forgot Password?</h1>
            <div className="dot"></div>
          </div>
          <p>No worries, we'll send you reset instructions.</p>
          <form className="custom_form forgot__new" autoComplete="off">
            <Input
              placeholder="Type email here.."
              value={email}
              name="email"
              id="email"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleEmail}
              className="forgot__new"
            />
            <div className="auth_buttons">
              <Buttonee
                type={"submit"}
                value={"Reset Password"}
                id={"resetPassword"}
                label={"Reset Password"}
              />
              <p>
                <Link className="back" to={"/login"}>
                 <ArrowLeft size={16} className="backarrow" />
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
