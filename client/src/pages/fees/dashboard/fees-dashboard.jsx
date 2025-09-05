import React from "react";
import OverviewSection from "./components/OverviewSection";
import PaymentTracking from "./components/PaymentTracking";

const FeesDashboard = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
              Fees Dashboard
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto"></div>
        </div>

        {/* Overview Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
          <div className="relative p-8">
            <OverviewSection />
          </div>
        </div>

        {/* Payment Tracking */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative p-8">
            <PaymentTracking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesDashboard;