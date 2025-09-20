import React, { useState, useEffect } from "react";
// import SubscriptionOptions from './subscription'
import BillingData from "./data";
import { Star } from "lucide-react";
import api from "../../../services/apiServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const navigate = useNavigate();
  const [plane, setPlan] = useState([]);
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small schools and academies",
      price: "150,000",
      students: "Up to 100",
      studentCount: "100",
      pricePerStudent: "1500",
    },
    {
      name: "Professional",
      description: "Ideal for growing educational institutions",
      price: "250,000",
      students: "Up to 250",
      studentCount: "250",
      pricePerStudent: "1000",
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for large institutions",
      price: "375,000",
      students: "Up to 500",
      studentCount: "500",
      pricePerStudent: "750",
    },
  ];

  const handleLogOut = async () => {
    const res = await api.Logout();
    if (res.data.success === true) {
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
  };

  const fetchData = async () => {
    const res = await api.getSubsByID();
    const data = res.data.subs || [];

    if (Array.isArray(data) && data.length > 0) {
      const activeSub = data.find(
        (sub) => sub.status === "paid" || sub.status === "active"
      );
      if (activeSub) {
        setPlan(activeSub.name);
      } else {
        setPlan(""); // or null, or handle as needed
      }
    } else {
      setPlan(""); // or null, or handle as needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.cancelSubscription();
      if (response.data.success === true) {
        toast.success(response.data.message);
        handleLogOut();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="text-center py-12 mb-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-300 hover:shadow-2xl rounded-2xl p-6 ${
                plane === plan.name
                  ? "border-2 border-emerald-500 shadow-xl scale-105"
                  : "border border-gray-200 hover:border-emerald-300"
              }`}
            >
              {plane === plan.name && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 flex items-center gap-1 text-sm md:text-md rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    Current Plan
                    <Star className="w-3 h-3 fill-current" />
                  </span>
                </div>
              )}

              <header className="text-center pb-8">
                <h3 className="text-sm md:text-xl font-semibold text-gray-700">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>

                {/* Student Capacity - Main Differentiator */}
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-3xl font-bold text-emerald-700">
                    {plan.students}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">
                    Students
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-lg md:text-4xl font-bold text-gray-900">
                      MK{plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/term</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Billed termly
                  </div>
                </div>
              </header>

              <div className="px-6">
                {/* Student Capacity Highlight */}
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">
                      {plan.studentCount}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium mb-2">
                      Students Maximum
                    </div>
                    <div className="text-xs text-gray-600">
                      MK{plan.pricePerStudent} per student per term
                    </div>
                  </div>
                </div>

                {/* Full Feature Access Badge */}
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <div className="text-sm font-semibold text-slate-700 mb-1">
                    🎯 complete System Access
                  </div>
                  <div className="text-xs text-slate-600">
                    All features included in every plan
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cancel subscription button */}
        <div className="mt-20 space-y-3">
          <p className="text-md font-semibold text-slate-700">
            Want to cancel your subscription?, click the button below. <br />{" "}
            <span className="text-red-700 font-semibold text-sm">
              Note: This action is irrevesible!
            </span>{" "}
          </p>
          <form onSubmit={handleSubmit}>
            <button className="bg-transparent border-2 border-red-500 hover:bg-red-600 hover:text-white text-red-500 font-semibold px-8 py-3 rounded-full shadow-md transition-colors duration-300">
              Cancel Subscription Plan
            </button>
          </form>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white">
        {/* <SubscriptionOptions /> */}
        <BillingData />
      </div>
    </div>
  );
};

export default Billing;
