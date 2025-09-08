import React from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar.jsx";
import Navbar from "../../components/input/top.jsx";
import { useNavigate } from "react-router-dom";
import FeesData from "./components/feesData.jsx";
import { ArrowLeft } from "lucide-react";

const Setting = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/fees");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <main className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm mb-8">
                <div className="px-8 py-6 pl-20">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleRedirect}
                      className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group"
                    >
                      <ArrowLeft size={24} className="text-gray-600 group-hover:text-gray-800" />
                    </button>
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                        Fees Settings
                      </h1>
                      <p className="text-gray-600 font-medium">
                        Configure and manage fee structures
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fees Data */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                <div className="relative p-8">
                  <FeesData />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Setting;
