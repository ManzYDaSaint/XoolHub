import React, { useState } from "react";
import Layout from "../../components/layout.jsx";
import AdminPersonal from "./components/adminPersonal.jsx";
import Billing from "./components/billing.jsx";
import Navbar from "../../components/input/top.jsx";
import Tabs from "../../components/tabs.jsx";

const AdminProfile = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  return (
    <Layout>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  School Information Management
                </h1>
                <p className="text-gray-600 font-medium">
                  Manage and update school information and billing
                </p>
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTab}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
          </div>
          <Tabs
            tabs={["Profile", "Billing"]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === "Profile" && (
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
              <div className="relative p-8">
                <AdminPersonal />
              </div>
            </div>
          )}
          {selectedTab === "Billing" && (
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
              <div className="relative p-8">
                <Billing />
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default AdminProfile;
