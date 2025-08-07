import React, { useState } from "react";
import AuthT from "../../hooks/tauth.jsx";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Personal from "./components/personal.jsx";
import Financial from "./components/financial.jsx";
import Tabs from "../../components/tabs.jsx";

const StudentProfile = () => {
  const navigate = useNavigate();
const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <AuthT>
      <Toaster />
      <div className="mb-8 sm:items-center shadow p-2 flex items-center sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center rounded-md space-x-2 cursor-pointer text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2 mr-2 mb-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="border-l-2 border-gray-300 ml-4 pl-4">
                <h1
                  className="text-lg font-semibold"
                  style={{ fontFamily: "'Poppins', san-serif" }}
                >
                  Update Student Information
                </h1>
                <p className="text-sm text-gray-500">
                  Manage fees, edit and update student information.
                </p>
              </div>
            </div>

                <main className="p-6 border-2 border-gray-300 rounded-lg m-5">
          <h1 className="text-xl font-bold">{selectedTab}</h1>
          <Tabs tabs={['Profile', 'Financial']}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === "Profile" && (
            <div className="border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white">
                <Personal />
            </div>
          )}
          {selectedTab === "Financial" && (
            <div className="border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white">
              <Financial />
            </div>
          )}
        </main>
    </AuthT>
  );
};

export default StudentProfile;
