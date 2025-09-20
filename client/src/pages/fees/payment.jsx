import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar.jsx";
import Navbar from "../../components/input/top.jsx";
import { useNavigate } from "react-router-dom";
import PayTable from "./components/payTable.jsx";
import api from "../../services/apiServices.jsx";
import { Timer, CircleCheckBig, View, ArrowLeft } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [payData, setPayData] = useState([]);

  const handleRedirect = () => {
    navigate("/fees");
  };

  const handleView = (id) => {
    navigate(`/student_profile/${id}`);
  };

  const fetchData = async () => {
    const res = await api.getPay();
    const data = res.data.pay;
    if (data.length === 0) {
      const payData = data.map((item, index) => ({
        sr: "",
        date: "",
        name: "No records found...",
        term: "",
        class: "",
        fee: "",
        amount: "",
        status: "",
        actions: "",
      }));
      setPayData(payData);
    } else {
      const payData = data.map((item, index) => ({
        sr: index + 1,
        date: item.updated_at.slice(0, 10),
        name: item.student,
        term: item.term + " (" + item.year + ")",
        class: item.class,
        fee: item.fee,
        amount: item.paid,
        status: (
          <>
            {item.status === "pending" ? (
              <>
                <Timer size={16} className="iconLucide" color="orange" />{" "}
                Ongoing
              </>
            ) : item.status === "complete" ? (
              <>
                <CircleCheckBig
                  size={15}
                  className="iconLucide"
                  color="green"
                />{" "}
                complete
              </>
            ) : (
              item.status
            )}
          </>
        ),
        actions: (
          <div>
            <button onClick={() => handleView(item.id)} className="action_icon">
              <View size={15} className="action_view" />
            </button>
          </div>
        ),
      }));
      setPayData(payData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                        Payment Records
                      </h1>
                      <p className="text-gray-600 font-medium">
                        View and manage student payment records
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Table */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                <div className="relative p-8">
                  <PayTable payData={payData} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Payment;
