import React from "react";
import AverageScore from "../../reports/dashboard/components/averagescore";

const Howa = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
                Head Of Academics Dashboard
              </h1>
              <p className="text-gray-600 font-medium">
                Manage, edit and update your academic operations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Academic Overview</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/30"></div>
            <div className="relative p-8">
              <AverageScore />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Howa;
