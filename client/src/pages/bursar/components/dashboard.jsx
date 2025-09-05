import { useState } from "react";
import Navbar from "./navbar";
import FinancialChart from "./financialchart";
import Notifications from "./notifications";
import Transactions from "./transactions";
import FeePayments from "./payments";
import OverviewSection from "../../fees/dashboard/components/OverviewSection";
import Tabs from "../../../components/tabs";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    {selectedTab}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2"></div>
                </div>
              </div>
            </div>

            <Tabs tabs={['Overview', 'Transactions', 'Fee Payments']} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            
            {selectedTab === "Overview" && (
              <div className="mt-8 space-y-8">
                {/* Overview Section */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                  <div className="relative p-8">
                    <OverviewSection />
                  </div>
                </div>

                {/* Charts and Notifications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                      <div className="relative p-8">
                        <FinancialChart />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
                      <div className="relative p-8">
                        <Notifications />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === "Transactions" && (
              <div className="mt-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30"></div>
                  <div className="relative p-8">
                    <Transactions />
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === "Fee Payments" && (
              <div className="mt-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/30"></div>
                  <div className="relative p-8">
                    <FeePayments />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
