import React, { useState } from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import FormInput from "../../../../components/input/formInput";
import FormButton from "../../../../components/input/formButton";
import { useSelector, useDispatch } from "react-redux";
import { setSuperPassword } from "../../../../helpers/examination/examSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import api from "../../../../services/apiServices";

const SuperProfile = () => {
  const dispatch = useDispatch();
  const superPassword = useSelector((state) => state.exam.superPassword);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSuperPassword({
        ...superPassword,
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

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    handlePasswordSubmit(superPassword);
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
        <h5>Super Administrator Information</h5>
        <p>
          Here you can update the password of the Super Administrator. <br /> The changes
          will be displayed and effective once updated.
        </p>

        <div className="cutter">
          <h1 className="text-xl mt-4 text-gray-800 xoolinfo">
            Change Password
          </h1>
          <p>
            Update your password associated with your <br /> account.
          </p>
          <form onSubmit={onPasswordSubmit} autoComplete="off" className="mt-5">
            <Grid divided="vertically">
              <GridRow columns={1}>
                <GridColumn>
                  <FormInput
                    label={"Current Password"}
                    type={"password"}
                    name={"current"}
                    placeholder={"Type here.."}
                    onChange={handlePasswordChange}
                    value={superPassword.current}
                  />
                </GridColumn>
              </GridRow>
              <GridRow columns={1}>
                <GridColumn>
                  <FormInput
                    label={"New Password"}
                    type={"password"}
                    name={"newPassword"}
                    placeholder={"Type here.."}
                    onChange={handlePasswordChange}
                    value={superPassword.newPassword}
                  />
                </GridColumn>
              </GridRow>
              <GridRow columns={1}>
                <GridColumn>
                  <FormInput
                    label={"Confirm Password"}
                    type={"password"}
                    name={"confirm"}
                    placeholder={"Type here.."}
                    onChange={handlePasswordChange}
                    value={superPassword.confirm}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
            <FormButton label={processing ? 'Saving...' : 'Save'} id="tyepButton" />
          </form>
        </div>
        <div className="cutter">
          <div className="sides">
            <div className="left">
              <h1 className="text-xl mt-4 text-gray-800 xoolinfo">
                Log out your session
              </h1>
              <p>
                Are you sure want to log out? All your <br /> unsaved data will
                be lost.
              </p>
            </div>
            <div className="right text-center">
              <FormButton label={"Log Out"} id="nextButton" onClick={handleLogOut} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperProfile;
