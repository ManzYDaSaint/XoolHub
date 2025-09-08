import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import EntryForm from "../../../teacher-service/form/entryForm";
import FilterForm from "../../../teacher-service/form/filterForm";
import Tabs from "../../../components/tabs";

function Entry() {
    const [selectedTab, setSelectedTab] = useState("Entry");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="px-8 py-6 pl-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Examination Management
                </h1>
                <p className="text-gray-600 font-medium">
                  Manage examinations by entering and filtering data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTab}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            </div>
            
            <Tabs tabs={['Entry', 'Filter']} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            
            {selectedTab === "Entry" && (
              <div className="mt-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                  <div className="relative p-8">
                    <EntryForm />
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === "Filter" && (
              <div className="mt-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                  <div className="relative p-8">
                    <FilterForm />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Entry;
