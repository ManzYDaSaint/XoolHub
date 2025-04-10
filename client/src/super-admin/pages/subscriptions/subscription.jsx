import React from "react";
import SuperAuth0 from "../../../hooks/superauth";
import SuperSidebar from "../../components/navbar/navbar";
import Menu from "../../components/Top/menu";
import { useNavigate } from "react-router-dom";
import FormButton from "../../../components/input/formButton";
import Data from "./data";
import { Toaster } from "react-hot-toast";

const Subsciptions = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/add-subscriptions");
  };

  return (
    <SuperAuth0>
      <Toaster />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="flex bg-gray-100 pb-3">
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                      <div>
                        <h1
                          className="text-lg font-semibold"
                          style={{ fontFamily: "'Poppins', san-serif" }}
                        >
                          Subscription Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage subscribed schools and their details.
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                      <FormButton
                      label={"Add Subscription Plan"}
                      id={"tyepButton"}
                      icon={"plus"}
                      onClick={handleRedirect}
                    />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5">
                      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
                      <Data />
                      </div>
                    </div>
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
