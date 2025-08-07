import React, { useState } from "react";
import Input from "../../components/input/input";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import api from "../../services/apiServices.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginData } from "../../helpers/examination/examSlice.jsx";
import { Mail, Lock } from "lucide-react";
import logo from "../../logo.png";

const Login = () => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.exam.loginData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.Logon(data);
      if (res.data.success === true) {
        toast.success(res.data.message);

        // Redirecting to administrator dashboard after successful login
        setTimeout(() => {
          navigate("/administrator");
        }, 2000);
        return;
      } else if (res.data.tsuccess === true) {
        toast.success(res.data.tmessage);
        if (res.data.role === "Bursar") {
          // Redirecting to Bursar dashboard after successful login
          setTimeout(() => {
            navigate("/bursar/dashboard");
          }, 2000);
          return;
        } else if (res.data.role === "Hoa") {
          // Redirecting to Head of academics dashboard after successful login
          setTimeout(() => {
            navigate("/hoa/dashboard");
          }, 2000);
          return;
        } else if (res.data.role === "Hod") {
          // Redirecting to Head of department dashboard after successful login
          setTimeout(() => {
            navigate("/hod/dashboard");
          }, 2000);
          return;
        } else {
          // Redirecting to Teacher dashboard after successful login
          setTimeout(() => {
            navigate("/entry");
          }, 2000);
          return;
        }
      } else if (res.data.ssuccess === true) {
        toast.success(res.data.smessage);

        // Redirecting to Super Admin dashboard after successful login
        setTimeout(() => {
          navigate("/super");
        }, 2000);
        return;
      } else if (res.data.osuccess === true) {
        navigate("/authenticate", { state: { email: res.data.email } });
      } else if (res.data.message) {
        toast.error(res.data.message);
      } else {
        toast.error(res.data.tmessage);
      }
      dispatch(
        setLoginData({
          schoolEmail: "",
          schoolPassword: "",
        })
      );
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(loginData);
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen space-y-4 bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 md:bg-none">
      <Toaster />
      <div className="bg-none md:bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 text-white px-6 py-5 text-center rounded-lg w-[400px]">
        <Link to={"/"}>
          <p className="inline-flex my-6 md:my-7 px-1 md:px-1 py-2 bg-white rounded-lg md:rounded-xl border-0 md:border-4 border-blue-600">
            <img src={logo} alt="logo" className="h-6 md:h-10" />
          </p>
        </Link>

        <h3 className="text-lg md:text-xl">Welcome Back</h3>
        <p className="text-xs md:text-sm mb-4 text-gray-300">
          Let's get you logged in
        </p>
        <form onSubmit={onSubmit} className="my-6 space-y-4 px-4">
          <Input
            type="text"
            name={"schoolEmail"}
            placeholder="mail@example.com"
            value={loginData.schoolEmail}
            onChange={handleChange}
            autoComplete={"off"}
            icon={Mail}
          />
          <Input
            type={showPassword ? "text" : "password"}
            name={"schoolPassword"}
            placeholder="password"
            value={loginData.schoolPassword}
            onChange={handleChange}
            autoComplete={"off"}
            icon={Lock}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <Link
            className="flex justify-end mt-0 text-xs md:text-sm"
            to={"/login"}
          >
            Forgot Password?
          </Link>
          <button type="submit" className="w-full bg-blue-600 px-3 py-1 md:px-2 md:py-2 text-sm md:text-md text-white rounded-md hover:bg-blue-800 transition duration-300 outline-none border-none">
            {loading ? "Signing.." : "Sign In"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-xs md:text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button type="button" className="w-full px-3 py-1 md:px-2 md:py-2 text-sm md:text-md text-white rounded-md outline-none border-2 border-gray-400 hover:bg-gray-700 transition duration-300">
            Sign In with Google
          </button>
          <p className="text-gray-300 text-xs md:text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-white">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
