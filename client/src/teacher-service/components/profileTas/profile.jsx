import React, { useEffect, useState } from "react";
import FormInput from "../../../components/input/formInput";
import FormButton from "../../../components/input/formButton";
import api from "../../../services/apiServices";
import LogOutModal from "../modal";
import { setPasswordFormData } from "../../../helpers/examination/examSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileData = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState("");
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const passwordFormData = useSelector((state) => state.exam.passwordFormData);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await api.getTeacher4Dashboard();
      const teacher = res.data.teacher;

      setTeacher(teacher);
      return;
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  //   Log Out Section

  const handleLogOut = async () => {
    const res = await api.Logout();
    if (res.data.success === true) {
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
  };

  //   Log Out Section

  const handlePasswordSubmit = async (data) => {
    try {
      const res = await api.updateTeacherPassword(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
        handleLogOut();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setProcessing(false);
      dispatch(
        setPasswordFormData({
          current: "",
          newPassword: "",
          confirm: "",
        })
      );
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPasswordFormData({
        ...passwordFormData,
        [name]: value,
      })
    );
  };

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    handlePasswordSubmit(passwordFormData);
  };

  return (
    <div className="space-y-8">
      <LogOutModal open={open} setOpen={setOpen} />
      
      {/* Profile Information Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
            <p className="text-gray-600 text-sm">
              View your personal information. Some fields cannot be modified.
            </p>
          </div>
        </div>
        
        <form autoComplete="off" className="space-y-6">
          {teacher && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <FormInput
                  label={"Full Name"}
                  type={"text"}
                  name={"name"}
                  placeholder={"Enter full name"}
                  value={teacher.name}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  label={"Contact Number"}
                  type={"text"}
                  name={"contact"}
                  placeholder={"Enter contact number"}
                  value={teacher.contact}
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  label={"Gender"}
                  type={"text"}
                  name={"gender"}
                  placeholder={"Enter gender"}
                  value={teacher.gender}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <FormInput
                  label={"Email Address"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Enter email address"}
                  value={teacher.email}
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  label={"Address"}
                  type={"text"}
                  placeholder={"Enter address"}
                  value={teacher.address}
                  disabled
                />
              </div>
            </div>
          )}
        </form>
      </div>
      {/* Change Password Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
            <p className="text-gray-600 text-sm">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>
        
        <form onSubmit={onPasswordSubmit} autoComplete="off" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <FormInput
                label={"Current Password"}
                type={"password"}
                name={"current"}
                placeholder={"Enter current password"}
                onChange={handlePasswordChange}
                value={passwordFormData.current}
              />
            </div>
            <div className="space-y-2">
              <FormInput
                label={"New Password"}
                type={"password"}
                name={"newPassword"}
                placeholder={"Enter new password"}
                onChange={handlePasswordChange}
                value={passwordFormData.newPassword}
              />
            </div>
            <div className="space-y-2">
              <FormInput
                label={"Confirm Password"}
                type={"password"}
                name={"confirm"}
                placeholder={"Confirm new password"}
                onChange={handlePasswordChange}
                value={passwordFormData.confirm}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <FormButton
              label={processing ? "Saving..." : "Update Password"}
              id="tyepButton"
            />
          </div>
        </form>
      </div>
      {/* Logout Section */}
      <div className="bg-gradient-to-r from-red-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-8 border border-red-200/40 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Log Out Session</h3>
              <p className="text-gray-600 text-sm">
                End your current session. All unsaved data will be lost.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <FormButton
              label={"Log Out"}
              id="nextButton"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
