import React from "react";
import Navbar from "../../components/input/top";
import ExpenseSection from "./component/expense";
import Layout from "../../components/layout";

const Expense = () => {
  return (
        <Layout>
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="px-8 py-6 pl-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-pink-800 bg-clip-text text-transparent">
                      Expense Management
                    </h1>
                    <p className="text-gray-600 font-medium">
                      Track and manage school expenses and budgets
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
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/30"></div>
                <div className="relative">
                  <ExpenseSection />
                </div>
              </div>
            </div>
          </main>
        </Layout>
  );
};

export default Expense;
