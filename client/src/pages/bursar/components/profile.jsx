import React, {useState} from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../../../components/layout";
import ProfileData from "../../../teacher-service/components/profileTas/profile";
import Tabs from "../../../components/tabs";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <Toaster />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="px-8 py-6 pl-20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    Profile Management
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Manage and update your profile information
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <main className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTab}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
              
              <Tabs tabs={['Profile']} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              
              {selectedTab === "Profile" && (
                <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                  <div className="relative p-8">
                    <ProfileData />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
