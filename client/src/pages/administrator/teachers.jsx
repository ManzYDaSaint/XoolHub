import React from "react";
import Navbar from "../../components/input/top";
import { useNavigate } from "react-router-dom";
import TeacherBoard from "../teacher/dashboard/teacher-dashboard";
import FormButton from "../../components/input/formButton";
import Layout from "../../components/layout";

const Teachers = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/config");
  };

  return (
    <Layout>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
                  Teacher Management
                </h1>
                <p className="text-gray-600 font-medium">
                  Manage and oversee teacher information and activities
                </p>
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-8">
            <FormButton
              type="button"
              label="Create teacher"
              id={"tyepButton"}
              onClick={handleRedirect}
            />
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30"></div>
            <div className="relative p-8">
              <TeacherBoard />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Teachers;
