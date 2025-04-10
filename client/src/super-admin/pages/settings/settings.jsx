import React from "react";
import Tabs from "./components/tabs.jsx";
import { Toaster } from "react-hot-toast";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import Menu from "../../components/Top/menu.jsx";

const Setting = () => {
  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="flex bg-gray-100 pb-3">
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                    <div>
                      <h1
                        className="text-lg font-semibold"
                        style={{ fontFamily: "'Poppins', san-serif" }}
                      >
                        Settings
                      </h1>
                      <p className="mt-1 text-sm text-gray-500">
                        Manage the whole application settings.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0"></div>
                  </div>
                  <div className="mt-10 px-5">
                    <Tabs />
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

export default Setting;
