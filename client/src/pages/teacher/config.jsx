import React, { useState } from "react";
import Navbar from "../../components/input/top";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Data from "./add/data";
import { Toaster } from "react-hot-toast";
import AssignData from "./assign/data";
import ClassTData from "./classTeacher/data";
import Tabs from "../../components/tabs";

const Config = () => {
  const [selectedTab, setSelectedTab] = useState("Add");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={"/teachers"}>
                <button className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200">
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back
                </button>
              </Link>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
                  Teacher Configuration
                </h1>
                <p className="text-gray-600 font-medium">
                  Configure teacher settings and assignments
                </p>
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTab}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
          </div>
          <Tabs
            tabs={["Add", "Assign", "Class"]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === "Add" && (
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30"></div>
              <div className="relative p-8">
                <Data />
              </div>
            </div>
          )}
          {selectedTab === "Assign" && (
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
              <div className="relative p-8">
                <AssignData />
              </div>
            </div>
          )}
          {selectedTab === "Class" && (
            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
              <div className="relative p-8">
                <ClassTData />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Config;
