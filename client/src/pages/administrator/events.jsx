import React from "react";
import EventPage from "../events/data.jsx";
import Layout from "../../components/layout.jsx";
import Navbar from "../../components/input/top.jsx";

const Events = () => {
  return (
    <>
      <Layout>
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                    Events Management
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Plan and manage school events and activities
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
              <div className="relative p-8">
                <EventPage />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Events;
