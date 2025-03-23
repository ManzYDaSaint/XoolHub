import React, { useState } from "react";
import Reseto from "./assets/forgot.png";
import Input from "../../components/input/input";
import Buttonee from "../../components/input/button.jsx";

const Reset = () => {
  const [activeInputId, setActiveInputId] = useState(null);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFocus = (event) => {
    setActiveInputId(event.target.id);
  };

  const handleBlur = () => {
    setActiveInputId(null);
  };

  console.log(activeInputId);

  return (
    <div className="notFound">
      <div className="logContainer">
        <div className="logSider">
          <div className="header">
            <img
              src={Reseto}
              alt="My"
              className="pass__master__icon"
            />
          </div>
          <div className="body">
            <div className="dotted">
              <h1>Set New Password</h1>
              <div className="dot"></div>
            </div>
            <p>
              Your new password must be different to <br></br> previously used
              passwords
            </p>
            <form className="loginForm mb-5" autoComplete="off">
              <Input
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                id="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handlePassword}
              />
              <Input
                placeholder="Confirm Password"
                name="password"
                type="password"
                value={confirmPassword}
                id="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleConfirmPassword}
              />
              <div className="auth_buttons">
                <Buttonee
                  type={"submit"}
                  value={"Reset Password"}
                  id={"resetPassword"}
                  label={"Reset Password"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
