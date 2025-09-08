import React, { useEffect, useState } from "react";
import { Trophy, Star, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import HeaderBtn from "../landing/components/ui/headerBtn";
import api from "../../services/apiServices";

const PlanOptions = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [expiryTime, setExpiryTime] = useState(0);

  const plans = [
    { 
      name: "Starter",
      description: "Perfect for small schools and academies",
      price: "150,000",
      students: "Up to 100",
      studentCount: "100",
      popular: false,
      pricePerStudent: "1500",
    },
    {
      name: "Professional",
      description: "Ideal for growing educational institutions",
      price: "250,000",
      students: "Up to 250",
      studentCount: "250",
      popular: true,
      pricePerStudent: "1000",
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for large institutions",
      price: "375,000",
      students: "Up to 500",
      studentCount: "500",
      popular: false,
      pricePerStudent: "750",
    },
  ];

  const allFeatures = [
    "Complete student information management",
    "Comprehensive grade & assessment management",
    "Parent & student communication portal",
    "Staff management",
    "Timetable & class scheduling",
    "Fee management & invoicing",
    "Transport & hostel management",
    "Exam management & downloadable report cards",
    "Custom reports & analytics dashboard",
    "Mobile app for all users (In development)",
    "SMS & email notifications",
    "Multi-campus support",
    "24/7 priority support",
    "Data backup & security",
    "Advanced Analytics",
    "White-label Branding",
    "API Access & Integrations",
    "WhatsApp Integrations",
    "Dedicated Accounts Managements",
    "Bulk Data Import/Export",
  ];

  const fetchStatus = async () => {
    try {
      const res = await api.checkSubscriptionStatus();
      const strata = res.data.status || "";
      setSubscriptionStatus(strata.status);
      setExpiryTime(strata.expiry);

      if (strata.status === "Pending" && strata.expiry) {
        const timeRemaining = Math.max(
          0,
          Math.floor((new Date(strata.expiry).getTime() - Date.now()) / 1000)
        );
        setTimeLeft(timeRemaining);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer for pending status
  useEffect(() => {
    if (subscriptionStatus === "Pending" && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [subscriptionStatus, timeLeft]);

  // Update subscription status to Suspended
  useEffect(() => {
    // Calculate remaining time in milliseconds
    const calculateRemainingTime = () => {
      const now = new Date();
      const expiryDate = new Date(expiryTime);
      return Math.max(expiryDate - now, 0);
    };

    const updateTime = () => {
      const timeLeft = calculateRemainingTime();

      // If the countdown ends, automatically suspend the subscription
      if (timeLeft <= 0 && subscriptionStatus === "Pending") {
        updateStatusToSuspended();
      }
    };

    const interval = setInterval(updateTime, 1000); // Update every second
    updateTime(); // Run initially to set the correct time

    return () => clearInterval(interval); // Cleanup on unmount
  }, [expiryTime, subscriptionStatus]);

  const updateStatusToSuspended = async () => {
    try {
      const res = await api.updateSubscriptionStatus({ status: "Cancelled" });
      if (res.data.success === true) {
        toast.error("Your Payment was suspended");
      }
    } catch (error) {
      console.error("Failed to update subscription status:", error);
    }
  };

  // Format time in seconds to days, hours, minutes, and seconds
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds / (60 * 60)) % 24);
    const minutes = Math.floor((seconds / 60) % 60);
    const secs = Math.floor(seconds % 60);
    return { days, hours, minutes, seconds: secs };
  };

  const formattedTime = formatTime(timeLeft);

  const handleID = (plan) => {
    navigate(`/invoicing/${plan}`);
  };

  // Features Section Component (inline)
  function SubscriptionOptions({ features }) {
    return (
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Every Plan Includes Full System Access
          </h2>
          <p className="text-md md:text-lg text-gray-600">
            No feature restrictions. Pay only based on your student capacity.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="text-center">
              <div className="text-emerald-800 font-semibold mb-2">
                🚀 No Hidden Limits or Restrictions
              </div>
              <div className="text-sm text-emerald-700">
                Access every feature from day one, regardless of which plan you
                choose. Scale your subscription based only on student
                enrollment.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Format as '1M', '2.5M', etc.
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Format as '50K', '350K', etc.
    }
    return price.toString(); // Return the original price for smaller values
  };

  return (
    <>
      <Toaster />
      {subscriptionStatus === "Pending" ? (
        <div className="border-b-2 border-gray-300 pb-4 text-center pt-6">
          <h2 className="mt-24 text-center inline-flex">
            <HeaderBtn>Payment Confirmation</HeaderBtn>
          </h2>
          <p className="text-gray-700 text-md md:text-lg mt-6">
            Please contact the System Administrator to activate your account{" "}
            <br />
            to be able to access the features and help the <br />
            System be molded to your preferences by clicking{" "}
            <Link to="/contact" style={{ color: "red" }}>
              Here
            </Link>
          </p>
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 py-16 mt-4">
            <div className="grid grid-cols-4 text-center">
              {timeLeft > 0 ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-semibold text-blue-700">
                      {formattedTime.days}
                    </span>
                    <span className="text-gray-700 font-semibold">Days</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-semibold text-blue-700">
                      {formattedTime.hours}
                    </span>
                    <span className="text-gray-700 font-semibold">Hours</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-semibold text-blue-700">
                      {formattedTime.minutes}
                    </span>
                    <span className="text-gray-700 font-semibold">Minutes</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-semibold text-blue-700">
                      {formattedTime.seconds}
                    </span>
                    <span className="text-gray-700 font-semibold">Seconds</span>
                  </div>
                </>
              ) : (
                <p className="flex justify-center items-center col-span-4">
                  <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                    Expired!
                  </h1>
                </p>
              )}
            </div>
             </div>
          

          {/* Payment Details */}
          <div className="max-w-7xl mx-auto">
          <h2 className="mt-24 text-center inline-flex">
            <HeaderBtn>Payment Details</HeaderBtn>
          </h2>
          <p className="text-gray-700 text-md md:text-lg mt-6">
            Please make the payment to any of the payment details below before the countdown runs out, then contact the system <br /> Administrator to activate your account to be able to enjoy the services of the system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="border-2 border-gray-300 rounded-lg">
              <table className="w-full">
                <tbody className="text-left text-md">
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Bank Account</td>
                    <td className="pl-4">National Bank</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Name</td>
                    <td className="pl-4">Emmanuel Nyangazi</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account #</td>
                    <td className="pl-4">1011468299</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Type:</td>
                    <td className="pl-4">Savings</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Branch</td>
                    <td className="pl-4">Mchinji</td>
                  </tr>
                </tbody>
              </table>
              </div>
            <div className="border-2 border-blue-400 rounded-lg">
              <table className="w-full">
                <tbody className="text-left text-md">
                  <tr className="border-b border-blue-400">
                    <td className="text-blue-800 bg-blue-200 px-2 py-2 font-semibold">Bank Account</td>
                    <td className="pl-4">FDH</td>
                  </tr>
                  <tr className="border-b border-blue-400">
                    <td className="text-blue-800 bg-blue-200 px-2 py-2 font-semibold">Account Name</td>
                    <td className="pl-4">Emmanuel Nyangazi</td>
                  </tr>
                  <tr className="border-b border-blue-400">
                    <td className="text-blue-800 bg-blue-200 px-2 py-2 font-semibold">Account #</td>
                    <td className="pl-4">1400000216196</td>
                  </tr>
                  <tr className="border-b border-blue-400">
                    <td className="text-blue-800 bg-blue-200 px-2 py-2 font-semibold">Account Type:</td>
                    <td className="pl-4">Savings</td>
                  </tr>
                  <tr className="border-b border-blue-400">
                    <td className="text-blue-800 bg-blue-200 px-2 py-2 font-semibold">Account Branch</td>
                    <td className="pl-4">Lilongwe Old Town</td>
                  </tr>
                </tbody>
              </table>
              </div>
            <div className="border-2 border-gray-300 rounded-lg">
              <table className="w-full">
                <tbody className="text-left text-md">
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Bank Account</td>
                    <td className="pl-4">NBS</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Name</td>
                    <td className="pl-4">Emmanuel Nyangazi</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account #</td>
                    <td className="pl-4">25004390</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Type:</td>
                    <td className="pl-4">Savings</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="text-gray-600 bg-gray-200 px-2 py-2 font-semibold">Account Branch</td>
                    <td className="pl-4">Mchinji</td>
                  </tr>
                </tbody>
              </table>
              </div>
         
          </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="min-h-screen px-14 py-20 space-y-8">
        <div className="max-w-7xl mx-auto mt-14">
          {/* Header */}
          <div className="text-center mb-16 space-y-8">
            <p className="inline-flex">
              <HeaderBtn>Pricing</HeaderBtn>
            </p>
            <h5 className="text-xl font-bold text-blue-900 md:text-4xl">
              Flexible Plans to Grow with Your <br /> School either Public or
              Private
            </h5>
            <p className="text-gray-700 text-md md:text-lg">
              Check out our pricing options and choose the best
              <br /> plan depending on your school's needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative transition-all duration-300 hover:shadow-2xl rounded-2xl p-6 ${
                  plan.popular
                    ? "border-2 border-emerald-500 shadow-xl scale-105"
                    : "border border-gray-200 hover:border-emerald-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 flex items-center gap-1 text-sm md:text-md rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
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
                        MK{formatPrice(plan.price)}
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
                      🎯 Complete System Access
                    </div>
                    <div className="text-xs text-slate-600">
                      All features included in every plan
                    </div>
                  </div>
                </div>

                <section className="px-6 pt-6">
                  {subscriptionStatus === "Pending" ? (
                    ""
                  ) : (
                    <button
                      className={`w-full py-3 text-base font-semibold transition-all duration-200 rounded-lg ${
                        plan.popular
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-600 hover:border-emerald-700"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => {handleID(plan.name)}}
                    >
                      Select Plan
                    </button>
                  )}
                </section>
              </div>
            ))}
          </div>

          {/* Full Features List */}
          <SubscriptionOptions features={allFeatures} />

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">
              All plans include a One(1)-term free trial. No credit card
              required.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Data migration support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>

          {/* Enterprise Contact */}
          <div className="text-center">
            <div className="mt-10 max-w-4xl mx-auto inline-flex p-[3px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-green-400">
              <div className="flex flex-col md:flex-row items-center justify-center text-left gap-0">
                <div className="text-white p-3 md:p-8 rounded-lg">
                  <Trophy size={40} />
                </div>
                <div className="bg-white/80 rounded-2xl px-2 py-1 md:px-4 md:py-2">
                  <h5 className="text-md font-bold text-blue-900 md:text-lg">
                    Need More Than 500 Students or add features?
                  </h5>
                  <p className="text-gray-600 text-sm md:text-md">
                    Contact our sales team for custom pricing on higher student
                    capacities and added features. With added features and full
                    system access, tailored to your institution's size and
                    requirements. <br />
                    <Link to={"/contact"} className="text-blue-600 font-bold">
                      Get Custom Quote
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanOptions;
