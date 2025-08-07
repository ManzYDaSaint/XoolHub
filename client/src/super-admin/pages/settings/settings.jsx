import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import Tabs from "../../../components/tabs.jsx";
import Examinations from "./components/exam.jsx";
import Grading from "./components/grading.jsx";
import Remarks from "./components/remarks.jsx";
import Term from "./components/term.jsx";
import Class from "./components/class.jsx";
import Subject from "./components/subject.jsx";
import Year from "./components/year.jsx";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState("Examination");

  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <div className="settingContainer">
              <div className="flex pb-3">
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
                  <div className="px-5">
                    <Tabs
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                      tabs={[
                        "Examination",
                        "Grading System",
                        "Remarks",
                        "Term",
                        "Class",
                        "Subject",
                        "Academic Year",
                      ]}
                    />
                    {selectedTab === "Examination" && <Examinations />}
                    {selectedTab === "Grading System" && <Grading />}
                    {selectedTab === "Remarks" && <Remarks />}
                    {selectedTab === "Term" && <Term />}
                    {selectedTab === "Class" && <Class />}
                    {selectedTab === "Subject" && <Subject />}
                    {selectedTab === "Academic Year" && <Year />}
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
