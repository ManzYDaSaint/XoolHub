import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Trophy,
  Calendar,
  Users,
  Settings
} from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your subscription has been activated and you now have access to all premium features.
            </p>
          </div>

          {/* Success Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription active</h3>
                <p className="text-gray-600">Your account is now fully activated</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing Cycle</h3>
                <p className="text-gray-600">Automatic renewal enabled</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Access</h3>
                <p className="text-gray-600">All features unlocked</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">What's Next?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Explore Your Dashboard</h4>
                  <p className="text-gray-600">Access all your school management tools and features</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Set Up Your School</h4>
                  <p className="text-gray-600">Add students, teachers, and configure your school settings</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Start Using Features</h4>
                  <p className="text-gray-600">Begin managing attendance, grades, and communication</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <button
              onClick={() => navigate("/administrator")}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 mr-4"
            >
              <Settings className="w-5 h-5 mr-2" />
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={() => navigate("/pricing")}
              className="inline-flex items-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200"
            >
              View Pricing Plans
            </button>
          </div>

          {/* Auto Redirect Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              You will be automatically redirected to the dashboard in 5 seconds...
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PaymentSuccess;
