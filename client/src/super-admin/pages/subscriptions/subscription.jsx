import React from "react";
import SuperAuth0 from "../../../hooks/superauth";
import SuperSidebar from "../../components/navbar/navbar";
import Menu from "../../components/Top/menu";
import { useNavigate } from "react-router-dom";
import FormButton from "../../../components/input/formButton";
import './subscription.css'

const Subsciptions = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/add-subscriptions");
  };

  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="profile_container">
                  <div className="splitter">
                    <div className="headerTitle">
                      <h5>Subscription Management</h5>
                    </div>
                    <FormButton
                      label={"Add Subscription Plan"}
                      id={"tyepButton"}
                      icon={"plus"}
                      onClick={handleRedirect}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default Subsciptions;
