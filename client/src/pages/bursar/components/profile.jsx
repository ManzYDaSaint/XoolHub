import React, {useState} from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../../../components/layout";
import ProfileData from "../../../teacher-service/components/profileTas/profile";
import Tabs from "../../../components/tabs";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  return (
    <Layout>
    <div className="flex bg-gray-100 pb-3">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center shadow py-2 px-4 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="ml-16">
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Profile Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage and update profile information
            </p>
          </div>
          <div className="mt-4 sm:mt-0"></div>
        </div>

        {/* Profile Information */}
        <main className="p-6">
          <h1 className="text-xl font-bold">{selectedTab}</h1>
          <Tabs tabs={['Profile']} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === "Profile" && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <ProfileData />
            </div>
          )}
        </main>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
