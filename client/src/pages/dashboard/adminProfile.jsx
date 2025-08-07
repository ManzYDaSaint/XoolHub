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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex items-center justify-between w-full">
            <div className="ml-16 border-l-2 border-blue-600 pl-6">
              <h1 className="text-lg bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent font-semibold">
                School Information Management
              </h1>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <main className="p-6 border-2 border-gray-300 rounded-lg m-5">
        <h1 className="text-xl font-bold">{selectedTab}</h1>
        <Tabs
          tabs={["Profile", "Billing"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "Profile" && (
          <div className="border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white">
            <AdminPersonal />
          </div>
        )}
        {selectedTab === "Billing" && <Billing />}
      </main>
    </Layout>
  );
};

export default AdminProfile;
