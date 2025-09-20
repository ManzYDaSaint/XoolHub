import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import { 
  CreditCard, 
  Clock, 
  CheckCircle, 
  Copy, 
  Phone, 
  Mail,
  AlertCircle,
  Banknote,
  Building2,
  RefreshCw
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/apiServices";

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const autoCheckIntervalRef = useRef(null);

  // Bank account details
  const bankAccounts = [
    {
      id: 1,
      bank: "National Bank",
      accountName: "Emmanuel Nyangazi",
      accountNumber: "1011468299",
      accountType: "Savings",
      branch: "Mchinji",
      color: "gray"
    },
    {
      id: 2,
      bank: "FDH Bank",
      accountName: "Emmanuel Nyangazi", 
      accountNumber: "1400000216196",
      accountType: "Savings",
      branch: "Lilongwe Old Town",
      color: "blue"
    },
    {
      id: 3,
      bank: "NBS Bank",
      accountName: "Emmanuel Nyangazi",
      accountNumber: "25004390", 
      accountType: "Savings",
      branch: "Mchinji",
      color: "gray"
    }
  ];

  const checkPaymentStatus = useCallback(async (isAutoCheck = false) => {
    if (!isAutoCheck) {
      setIsCheckingStatus(true);
    }
    try {
      const response = await api.getRealTimePaymentStatus();
      if (response.data.success) {
        const status = response.data.status?.status;
        setPaymentStatus(status);
        if (status === "paid") {
          // Clear auto-check interval
          if (autoCheckIntervalRef.current) {
            clearInterval(autoCheckIntervalRef.current);
            autoCheckIntervalRef.current = null;
          }
          
          toast.success("Payment approved! Your subscription is now active.");
          setTimeout(() => {
            navigate("/payment-success"); 
          }, 2000);
        } else if (status === "pending") {
          if (!isAutoCheck) {
            toast("Payment is still being processed. Please wait...");
          }
        } else {
          if (!isAutoCheck) {
            toast.error("Payment not found. Please contact support.");
          }
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      if (!isAutoCheck) {
        toast.error("failed to check payment status. Please try again.");
      }
    } finally {
      if (!isAutoCheck) {
        setIsCheckingStatus(false);
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Get payment data from location state
    if (location.state) {
      setPaymentData(location.state);
    } else {
      // If no state, redirect back to pricing
      navigate("/pricing");
    }
  }, [location.state, navigate]);

  // Auto-check payment status every 30 seconds
  useEffect(() => {
    if (paymentStatus === "pending") {
      const interval = setInterval(() => {
        checkPaymentStatus(true);
      }, 30000); // Check every 30 seconds
      
      autoCheckIntervalRef.current = interval;
      
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [paymentStatus, checkPaymentStatus]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoCheckIntervalRef.current) {
        clearInterval(autoCheckIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (!paymentData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toaster />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Instructions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              complete your payment using any of the bank accounts below. Your subscription will be activated once payment is verified.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            
            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-semibold">{paymentData.subscriptionName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Cycle:</span>
                    <span className="font-semibold">{paymentData.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-xl text-blue-600">MK{paymentData.grandTotal}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-800">
                        Payment expires in: {formatTime(timeLeft)}
                      </span>
                    </div>
                    {paymentStatus === "pending" && (
                      <div className="flex items-center text-xs text-blue-600">
                        <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        Auto-checking...
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={checkPaymentStatus}
                    disabled={isCheckingStatus}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isCheckingStatus ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>
                          {paymentStatus === "pending" ? "Check Status Now" : "Check Payment Status"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Bank Account Details</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Transfer the exact amount to any of the accounts below. Include your school name as the reference.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bankAccounts.map((account, index) => (
                    <div key={account.id} className={`border-2 rounded-xl p-6 ${
                      account.color === 'blue' 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-3 ${
                          account.color === 'blue' 
                            ? 'bg-blue-100' 
                            : 'bg-gray-100'
                        }`}>
                          <Banknote className={`w-6 h-6 ${
                            account.color === 'blue' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <h4 className={`font-semibold ${
                          account.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {account.bank}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className={`text-sm font-medium ${
                            account.color === 'blue' ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            Account Name
                          </label>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-sm ${
                              account.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {account.accountName}
                            </span>
                            <button
                              onClick={() => copyToClipboard(account.accountName, "Account Name")}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className={`text-sm font-medium ${
                            account.color === 'blue' ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            Account Number
                          </label>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-sm font-mono ${
                              account.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {account.accountNumber}
                            </span>
                            <button
                              onClick={() => copyToClipboard(account.accountNumber, "Account Number")}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className={`text-sm font-medium ${
                            account.color === 'blue' ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            Account Type
                          </label>
                          <span className={`text-sm ${
                            account.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {account.accountType}
                          </span>
                        </div>

                        <div>
                          <label className={`text-sm font-medium ${
                            account.color === 'blue' ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            Branch
                          </label>
                          <span className={`text-sm ${
                            account.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {account.branch}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Instructions */}
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Important Instructions</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Transfer the exact amount: <strong>MK{paymentData.grandTotal}</strong></li>
                        <li>• Use your school name as the reference</li>
                        <li>• Keep the payment receipt for verification</li>
                        <li>• Contact support if you need assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Support</p>
                        <p className="font-medium text-gray-900">+265 886 563 330</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Email Support</p>
                        <p className="font-medium text-gray-900">support@xoolhub.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PaymentConfirmation;
