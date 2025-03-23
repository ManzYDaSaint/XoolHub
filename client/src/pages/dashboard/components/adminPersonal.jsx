import React, { useEffect, useState } from "react";
import FormInput from "../../../components/input/formInput";
import FormButton from "../../../components/input/formButton";
import api from "../../../services/apiServices";
import { useSelector, useDispatch } from "react-redux";
import { setAdminFormData } from "../../../helpers/examination/examSlice";
import { setPasswordFormData } from "../../../helpers/examination/examSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import TypeSelect from "./typeSelector";

const AdminPersonal = () => {
  const dispatch = useDispatch();
  const adminFormData = useSelector((state) => state.exam.adminFormData);
  const passwordFormData = useSelector((state) => state.exam.passwordFormData);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.getSchool();
      const data = res.data.details;

      dispatch(
        setAdminFormData({
          name: data.name || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          email: data.email || "",
          contact: data.contact || "",
          slogan: data.slogan || "",
          type: data.type || "",
        })
      );

      // If the logo is retrieved as a URL, display it
      if (data.logo) {
        setLogoFile(data.logo); // URL to show the image
      }
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setAdminFormData({
        ...adminFormData,
        [name]: value,
      })
    );
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

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]); // Handle file selection
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("slogan", data.slogan);
      formData.append("type", data.type);
      if (logoFile) {
        formData.append("logo", logoFile); // Append logo file
      }

      const res = await api.updateSchool(formData);
      if (res.data.success) {
        fetchData();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (data) => {
    try {
      const res = await api.updatePassword(data);
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
      dispatch(setPasswordFormData({
        current: "",
        newPassword: "",
        confirm: "",
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(adminFormData);
  };

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    handlePasswordSubmit(passwordFormData);
  };

//   Log Out Section
    
    const handleLogOut = async() => {
        const res = await api.Logout();
        if(res.data.success === true) {
            toast.success(res.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 1000);
            return;
        }
    }

//   Log Out Section

  return (
    <div className="personalContainer p-6">
      <div className="profileUpdate">
        <h5 className="text-2xl font-bold">Administrator Information</h5>
        <p className="mt-2">
          Here you can edit information about your school. <br /> The changes
          will be displayed and effective once updated.
        </p>
        <div className="imgContainer mt-3 mb-4">
          {logoFile && (
            <img
              // Check if logoFile is a File object or a URL
              src={
                logoFile instanceof File
                  ? URL.createObjectURL(logoFile)
                  : logoFile
              }
              alt="Logo Preview"
              className="w-20 h-20 object-cover mt-5"
            />
          )}
        </div>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium">Select Logo: </label>
              <input
                type="file"
                name="logo"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>
            <h1 className="text-xl mt-4 text-gray-800">School Information</h1>
            <p>
              Update school information here by filling in the form. <br />{" "}
              Then save the changes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <FormInput
                  label={"Name"}
                  type={"text"}
                  name={"name"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.name}
                  disabled
                />
              </div>
              <div>
                <TypeSelect 
                  label={"School Type"}
                  name={"type"}
                  value={adminFormData.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FormInput
                  label={"Address"}
                  type={"text"}
                  name={"address"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.address}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <FormInput
                  label={"City"}
                  type={"text"}
                  name={"city"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.city}
                  disabled
                />
              </div>
              <div>
                <FormInput
                  label={"Country"}
                  type={"text"}
                  name={"country"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.country}
                />
              </div>
              <div>
                <FormInput
                  label={"Email"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.email}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label={"Contact"}
                  type={"text"}
                  name={"contact"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.contact}
                />
              </div>
              <div>
                <FormInput
                  label={"Slogan"}
                  type={"text"}
                  name={"slogan"}
                  placeholder={"Type here.."}
                  onChange={handleChange}
                  value={adminFormData.slogan}
                />
              </div>
            </div>
          </div>
          <FormButton label={loading ? "Saving..." : "Save"} id="tyepButton" />
        </form>
        <div className="cutter mt-6">
          <h1 className="text-xl mt-4 text-gray-800">Change Password</h1>
          <p>
            Update your password associated with your <br /> account.
          </p>
          <form onSubmit={onPasswordSubmit} autoComplete="off" className="mt-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <FormInput
                  label={"Current Password"}
                  type={"password"}
                  name={"current"}
                  placeholder={"Type here.."}
                  onChange={handlePasswordChange}
                  value={passwordFormData.current}
                />
              </div>
              <div>
                <FormInput
                  label={"New Password"}
                  type={"password"}
                  name={"newPassword"}
                  placeholder={"Type here.."}
                  onChange={handlePasswordChange}
                  value={passwordFormData.newPassword}
                />
              </div>
              <div>
                <FormInput
                  label={"Confirm Password"}
                  type={"password"}
                  name={"confirm"}
                  placeholder={"Type here.."}
                  onChange={handlePasswordChange}
                  value={passwordFormData.confirm}
                />
              </div>
            </div>
            <FormButton label={processing ? 'Saving...' : 'Save'} id="tyepButton" />
          </form>
        </div>
        <div className="cutter mt-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl mt-4 text-gray-800">
                Log out your session
              </h1>
              <p>
                Are you sure want to log out? All your <br /> unsaved data will
                be lost.
              </p>
            </div>
            <div className="text-center">
              <FormButton label={"Log Out"} id="nextButton" onClick={handleLogOut} />
            </div>
          </div>
        </div>
        <div className="cutter mt-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl mt-4 text-gray-800">
                Delete account
              </h1>
              <p>
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>
            <div className="text-center">
              <FormButton label={"Yes, Delete Account"} id="dangerButton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPersonal;
