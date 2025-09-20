import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer"; 
import Input from "../../components/input/input";
import { 
  Mail, 
  School, 
  Phone, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  Sparkles
} from "lucide-react";
import api from "../../services/apiServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Invoicing = () => {
  const navigate = useNavigate();
  const { plan } = useParams();
  const [isYearly, setIsYearly] = useState(false);
  const [school, setSchool] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Subscription, setSubscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubs = async (plan) => {
    try {
      const res = await api.gotsubs(plan);
      const hasPilotProgram = res.data.hasPilotProgram;
      const subscriptionData = res.data.data;
      const price = hasPilotProgram === true ? parseFloat(subscriptionData?.pilot_price) : parseFloat(subscriptionData?.price) || 0;
      const subscription = subscriptionData?.name;
      setPrice(price);
      setSubscription(subscription);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  useEffect(() => {
    fetchSubs(plan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  const displayedPrice = isYearly ? ((Price || 0) * 3).toFixed(2) : (Price || 0).toFixed(2);

  const discount = isYearly
    ? (0.1 * parseFloat(displayedPrice || 0)).toFixed(2)
    : (0).toFixed(2);
  const sub = (parseFloat(displayedPrice || 0) - parseFloat(discount || 0)).toFixed(2);

  const fetchData = async () => {
    try {
      const res = await api.getSchool();
      const data = res.data.details;
      setSchool(data);
    } catch (error) {
      console.error("Error fetching school info:", error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        subscriptionName: Subscription,
        grandTotal: sub,
        billingCycle: isYearly ? "Yearly" : "Termly",
      };

      const response = await api.addBilling(payload);
      if (response.data.success === true) {
        toast.success("Payment request created successfully!");
        navigate("/payment-confirmation", { 
          state: {
            subscriptionName: Subscription,
            grandTotal: sub,
            billingCycle: isYearly ? "Yearly" : "Termly"
          }
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      
      {/* Modern Header with Progress */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              complete Your Purchase
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You're just one step away from unlocking the full potential of XoolHub
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Plan Selected</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Checkout</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-500">3</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Information - Left Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <School className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Account Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter school name"
                        value={school.name}
                        autoComplete="off"
                        icon={School}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="school@example.com"
                        value={school.email}
                        autoComplete="off"
                        icon={Mail}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="+265 XXX XXX XXX"
                        value={school.contact}
                        autoComplete="off"
                        icon={Phone}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription & Payment - Right Column */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subscription Plan Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Subscription Plan</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        MK{(Price || 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">per {isYearly ? 'year' : 'term'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {Subscription} Plan
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Access to all premium features and unlimited usage
                    </p>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                      <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                        Termly
                      </span>
                      <button
                        type="button"
                        onClick={handleToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isYearly ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isYearly ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                          Yearly
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Save 10%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {isYearly ? 'Yearly' : 'Termly'} Billing
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        MK{displayedPrice}
                      </span>
                    </div>
                    
                    {isYearly && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">Yearly discount (10%)</span>
                        <span className="text-sm font-medium text-green-600">
                          -MK{discount}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">
                        MK{sub}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          MK{sub}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security & Payment Button */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Your payment is secured with 256-bit SSL encryption
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>complete Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Invoicing;
