import React from "react";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import FeedbackForm from "../feedback/feedback";

const Feedback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="px-8 py-6 pl-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent">
                      Feedback Management
                    </h1>
                    <p className="text-gray-600 font-medium">
                      Collect and manage user feedback and suggestions
                    </p>
                  </div>
                </div>
                <Navbar />
              </div>
            </div>
          </header>
          <main className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30"></div>
                <div className="relative p-8">
                  <FeedbackForm />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
