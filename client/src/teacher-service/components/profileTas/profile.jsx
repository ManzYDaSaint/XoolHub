import React, { useEffect, useState } from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import FormInput from "../../../components/input/formInput";
import FormButton from "../../../components/input/formButton";
import api from "../../../services/apiServices";
import LogOutModal from "../modal";
import { setPasswordFormData } from "../../../helpers/examination/examSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
    const res = await api.tLogout();
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
    <div className="personalContainer">
      <LogOutModal open={open} setOpen={setOpen} />
      <div className="profileUpdate">
        <h5>Profile Information</h5>
        <p>
          Here you can view information about yourself. <br /> You can not
          change any of the information displayed here.
        </p>
        <form autoComplete="off" className="mt-5">
          {teacher && (
            <Grid divided="vertically">
              <GridRow columns={3}>
                <GridColumn>
                  <FormInput
                    label={"Full Name:"}
                    type={"text"}
                    name={"name"}
                    placeholder={"Type here.."}
                    value={teacher.name}
                    disabled
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    label={"Contact:"}
                    type={"text"}
                    name={"address"}
                    placeholder={"Type here.."}
                    value={teacher.contact}
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    label={"Gender:"}
                    type={"text"}
                    name={"address"}
                    placeholder={"Type here.."}
                    value={teacher.gender}
                  />
                </GridColumn>
              </GridRow>
              <GridRow columns={2}>
                <GridColumn>
                  <FormInput
                    label={"Email Address:"}
                    type={"text"}
                    name={"address"}
                    placeholder={"Type here.."}
                    value={teacher.email}
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    label={"Address:"}
                    type={"text"}
                    placeholder={"Type here.."}
                    value={teacher.address}
                    disabled
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          )}
        </form>
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
                    value={passwordFormData.current}
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
                    value={passwordFormData.newPassword}
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
                    value={passwordFormData.confirm}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
            <FormButton
              label={processing ? "Saving..." : "Save"}
              id="tyepButton"
            />
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
              <FormButton
                label={"Log Out"}
                id="nextButton"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
