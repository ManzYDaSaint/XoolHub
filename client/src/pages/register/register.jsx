import React, { useState } from "react";
import Input from "../../components/input/input";
import api from "../../services/apiServices.jsx";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterData } from "../../helpers/examination/examSlice.jsx";
import { CircleCheck, Lock, Mail } from "lucide-react";
import logo from "../../logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const registerData = useSelector((state) => state.exam.registerData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.createSchool(data);
      if (res.data.success === true) {
        toast.success(res.data.message);

        // Redirecting to dashboard after successful login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
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
    <div className="flex justify-center items-center h-screen w-screen space-y-4 bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 md:bg-none">
      <Toaster />
      <div className="bg-none md:bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 text-white px-6 py-5 text-center rounded-lg w-[400px]">
        <Link to={"/"}>
          <p className="inline-flex my-6 md:my-7 px-1 md:px-1 py-2 bg-white rounded-lg md:rounded-xl border-0 md:border-4 border-blue-600">
            <img src={logo} alt="logo" className="h-6 md:h-10" />
          </p>
        </Link>

        <h3 className="text-lg md:text-xl">Get Started</h3>
        <p className="text-xs md:text-sm mb-4 text-gray-300">
          Let's get you started
        </p>
        <form onSubmit={onSubmit} className="my-6 space-y-4 px-4">
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
            type={showPassword ? "text" : "password"}
            name={"schoolPassword"}
            placeholder="password"
            value={registerData.schoolPassword}
            onChange={handleChange}
            autoComplete={"off"}
            icon={Lock}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <Input
            type={confirmPassword ? "text" : "password"}
            name={"confirm"}
            placeholder="confirm password"
            value={registerData.confirm}
            onChange={handleChange}
            autoComplete={"off"}
            icon={CircleCheck}
            showPassword={confirmPassword}
            setShowPassword={setConfirmPassword}
          />
          <button type="submit" className="w-full bg-blue-600 px-3 py-1 md:px-2 md:py-2 text-sm md:text-md text-white rounded-md hover:bg-blue-800 transition duration-300 outline-none border-none">
            {loading ? "Signing up..." : "Sign up"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-xs md:text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button type="button" className="w-full px-3 py-1 md:px-2 md:py-2 text-sm md:text-md text-white rounded-md outline-none border-2 border-gray-400 hover:bg-gray-700 transition duration-300">
            Sign Up with Google
          </button>
          <p className="text-gray-300 text-xs md:text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-white">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
