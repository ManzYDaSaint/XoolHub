import React, { useState } from "react";
import Input from "../../components/input/input";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/apiServices.jsx";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterData } from "../../helpers/examination/examSlice.jsx";
import { CircleCheck, Lock, Mail } from "lucide-react";
import logo from '../../logo.png'

const Register = () => {
  const registerData = useSelector((state) => state.exam.registerData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.createSchool(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    dispatch(
      setRegisterData({
        schoolEmail: "",
        schoolPassword: "",
        confirm: "",
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setRegisterData({
        ...registerData,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(registerData);
  };

  return (
    <div className="notFound">
      <div className="logContainer">
        <Toaster />
        
        <div className="logSider">
        <p className='d-flex align-items-center justify-content-center mb-4'>
                            <img src={logo} alt="logo" />
                            </p>
          <p class="loginPT mb-4">
            One xoolHub account is all you need <br />to access to all xoolHub services.
          </p>
          <form onSubmit={onSubmit} className="loginForm">
            <Input
              type="text"
              name={"schoolEmail"}
              placeholder="mail@example.com"
              value={registerData.schoolEmail}
              onChange={handleChange}
              autoComplete={"off"}
              icon={Mail}
            />
            <Input
              type="password"
              name={"schoolPassword"}
              placeholder="password"
              value={registerData.schoolPassword}
              onChange={handleChange}
              autoComplete={"off"}
              icon={Lock}
            />
            <Input
              type="password"
              name={"confirm"}
              placeholder="confirm password"
              value={registerData.confirm}
              onChange={handleChange}
              autoComplete={"off"}
              icon={CircleCheck}
            />
            <button className="loginButton signin">
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="cont">Or</p>
            <Link to={"/login"} className="linka">
              <button className="loginButton regIn" id="nextButton">
                Log In
              </button>
            </Link>
            <p className="mt-4 termspolicy">
              By clicking continue, you agree to our{" "}
              <Link to={"/terms"}>
                Terms <br />
                of Service
              </Link>{" "}
              and <Link to={"/policy"}>Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
