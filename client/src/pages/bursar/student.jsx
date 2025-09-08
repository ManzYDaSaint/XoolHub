import React from "react";
import StudentData from "../../teacher-service/data/studentData";
import AuthT from "../../hooks/tauth";
import Layout from "../../components/layout";

const BStudent = () => {
  return (
    <AuthT>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="px-8 py-6 pl-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      Student Management
                    </h1>
                    <p className="text-gray-600 font-medium">
                      Manage and update student information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Profile Information */}
          <main className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Students Information</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                <div className="relative p-8">
                  <StudentData />
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </AuthT>
  );
};

export default BStudent;
