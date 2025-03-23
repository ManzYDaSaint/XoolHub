import React, { useState, useEffect } from "react";
import FormInput from "../../../../components/input/formInput";
import FormButton from "../../../../components/input/formButton";
import { useSelector, useDispatch } from "react-redux";
import { setSuperPassword, setSuperDetail } from "../../../../helpers/examination/examSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import api from "../../../../services/apiServices";

const SuperProfile = () => {
  const dispatch = useDispatch();
  const superPassword = useSelector((state) => state.exam.superPassword);
  const superDetail = useSelector((state) => state.exam.superDetail);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
      try {
        const res = await api.getAdmin();
        const data = res.data.checker;

        dispatch(
          setSuperDetail({
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            email_address: data.email_address || "",
            whatsapp: data.whatsapp || "",
          })
        );
      } catch (error) {
        console.error("Error fetching individual:", error);
      }
    };
  
    useEffect(() => {
      fetchData(); // eslint-disable-next-line
    }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSuperPassword({
        ...superPassword,
        [name]: value,
      })
    );
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSuperDetail({
        ...superDetail,
        [name]: value,
      })
    );
  };

  const handlePasswordSubmit = async (data) => {
    try {
      const res = await api.updateSuperPassword(data);
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
      dispatch(setSuperPassword({
        current: "",
        newPassword: "",
        confirm: "",
      }));
    }
  };

  const handleDetail = async (data) => {

    try {
      const res = await api.updateAdmin(data);

      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    handlePasswordSubmit(superPassword);
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    handleDetail(superDetail);
  };

//   Log Out Section
    
    const handleLogOut = async() => {
        const res = await api.superLogout();
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
    <div className="personalContainer">
      <div className="profileUpdate">
        <h5 className="text-lg font-bold mb-3">Super Administrator Information</h5>
        <p className="text-md">
          Here you can update the password of the Super Administrator. <br /> The changes
          will be displayed and effective once updated.
        </p>

        <div className="cutter">
          <h1 className="text-xl py-4 text-gray-800" style={{fontFamily: '"Poppins", sans-serif'}}>Update Details</h1>
          <p className="text-md">
            Changes that will be made will update <br />the whole system details.
          </p>
          <form onSubmit={onUpdateSubmit} autoComplete="off" className="mt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormInput
                  label={"Email"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Type here.."}
                  onChange={handleDetailChange}
                  value={superDetail.email}
                />
              </div>
              <div>
                <FormInput
                  label={"Phone"}
                  type={"text"}
                  name={"phone"}
                  placeholder={"Type here.."}
                  onChange={handleDetailChange}
                  value={superDetail.phone}
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  label={"Address"}
                  type={"text"}
                  name={"address"}
                  placeholder={"Type here.."}
                  onChange={handleDetailChange}
                  value={superDetail.address}
                />
              </div>
              <div>
                <FormInput
                  label={"Email Address"}
                  type={"text"}
                  name={"email_address"}
                  placeholder={"Type here.."}
                  onChange={handleDetailChange}
                  value={superDetail.email_address}
                />
              </div>
              <div>
                <FormInput
                  label={"WhatsApp"}
                  type={"text"}
                  name={"whatsapp"}
                  placeholder={"Type here.."}
                  onChange={handleDetailChange}
                  value={superDetail.whatsapp}
                />
              </div>
            </div>
            <FormButton label={processing ? 'Saving...' : 'Update Settings'} id="tyepButton" />
          </form>
        </div>

        <div className="cutter">
          <h1 className="text-lg py-4 text-gray-800" style={{fontFamily: '"Poppins", sans-serif'}}>Change Password</h1>
          <p className="text-md">
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
                  value={superPassword.current}
                />
              </div>
              <div>
                <FormInput
                  label={"New Password"}
                  type={"password"}
                  name={"newPassword"}
                  placeholder={"Type here.."}
                  onChange={handlePasswordChange}
                  value={superPassword.newPassword}
                />
              </div>
              <div>
                <FormInput
                  label={"Confirm Password"}
                  type={"password"}
                  name={"confirm"}
                  placeholder={"Type here.."}
                  onChange={handlePasswordChange}
                  value={superPassword.confirm}
                />
              </div>
            </div>
            <FormButton label={processing ? 'Saving...' : 'Save'} id="tyepButton" />
          </form>
        </div>
        <div className="cutter">
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg py-4 text-gray-800" style={{fontFamily: '"Poppins", sans-serif'}}>Log out your session</h1>
              <p className="text-md">
                Are you sure want to log out? All your <br /> unsaved data will
                be lost.
              </p>
            </div>
            <div className="text-center">
              <FormButton label={"Log Out"} id="nextButton" onClick={handleLogOut} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperProfile;
