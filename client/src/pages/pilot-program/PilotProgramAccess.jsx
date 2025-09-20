import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Gift, 
  Percent,
  Calendar,
  Users,
} from 'lucide-react';
import api from '../../services/apiServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PilotProgramAccess = () => {
  const [pilotProgram, setPilotProgram] = useState(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Airtel Money, TNM Mpamba, MoMo',
      popular: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: <Banknote className="h-6 w-6" />,
      description: 'Direct bank transfer',
      popular: false
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Pay at our office',
      popular: false
    }
  ];

  const fetchPilotProgram = useCallback(async () => {
    try {
      setLoading(true);
      // Get the school's pilot program (no schoolId needed - uses logged-in user)
      const response = await api.getPilotProgramBySchool();
      
      if (response.data.success && response.data.data) {
        setPilotProgram(response.data.data);
        // Get the subscription plan details
        const planResponse = await api.getPilotPlanById(response.data.data.preferred_plan_id);
        if (planResponse.data.success) {
          setSubscriptionPlan(planResponse.data.data);
        }
      } else {
        toast.error('No approved pilot program found. Please contact support.');
        navigate('/pilot-program');
      }
    } catch (error) {
      console.error('Error fetching pilot program:', error);
      toast.error('failed to load pilot program details');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPilotProgram();
  }, [fetchPilotProgram]);

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!transactionId.trim()) {
      toast.error('Please enter your transaction ID');
      return;
    }

    try {
      setPaymentLoading(true);
      
      const paymentData = {
        pilotProgramId: pilotProgram.id,
        paymentMethod: selectedPaymentMethod,
        transactionId: transactionId,
        amount: subscriptionPlan.pilot_price,
        originalAmount: subscriptionPlan.price
      };

      const response = await api.submitPilotPayment(paymentData);
      
      if (response.data.success) {
        toast.success('Payment submitted successfully! You will receive confirmation within 24 hours.');
        // Redirect to dashboard or success page
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Payment submission failed');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('failed to submit payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pilotProgram || !subscriptionPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Pilot Program Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find an approved pilot program for your account. Please contact support if you believe this is an error.
          </p>
          <button
            onClick={() => navigate('/pilot-program')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply for Pilot Program
          </button>
        </div>
      </div>
    );
  }

  const savings = subscriptionPlan.price - subscriptionPlan.pilot_price;
  const savingsPercentage = Math.round((savings / subscriptionPlan.price) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to XoolHub Pilot Program!</h1>
          <p className="text-gray-600 text-lg">
            Your application has been approved. complete your payment to start your 12-month pilot program.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Program Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Gift className="h-6 w-6 text-blue-600 mr-2" />
              Your Pilot Program Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">School Name</span>
                <span className="font-medium text-gray-900">{pilotProgram.school_name}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium text-gray-900">{subscriptionPlan.name}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">12 Months</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium text-gray-900">{formatDate(pilotProgram.start_date)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium text-gray-900">{formatDate(pilotProgram.end_date)}</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pricing Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Regular Price</span>
                  <span className="text-gray-900">MK {formatPrice(subscriptionPlan.price)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Pilot discount ({savingsPercentage}%)</span>
                  <span>-MK {formatPrice(savings)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-2">
                  <span>You Pay</span>
                  <span className="text-green-600">MK {formatPrice(subscriptionPlan.pilot_price)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
              complete your payment
            </h2>

            {/* Payment Amount */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-green-600 text-sm font-medium">Initial Payment Required</p>
                <p className="text-2xl font-bold text-green-700">MK {formatPrice(subscriptionPlan.pilot_price)}</p>
                <p className="text-green-600 text-sm">Save MK {formatPrice(savings)} with pilot program</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Select Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center flex-1">
                      <div className="text-blue-600 mr-3">{method.icon}</div>
                      <div>
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {method.popular && (
                        <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID / Reference
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID or reference number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the transaction ID from your payment (e.g., from Mobile Money, Bank Transfer, etc.)
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Payment Instructions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• complete payment using your selected method</li>
                <li>• Enter the transaction ID above</li>
                <li>• We'll verify your payment within 24 hours</li>
                <li>• You'll receive email confirmation once verified</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={paymentLoading || !selectedPaymentMethod || !transactionId.trim()}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paymentLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <CheckCircle className="h-5 w-5 mr-2" />
              )}
              Submit Payment
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting payment, you agree to our pilot program terms and conditions.
            </p>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Your Pilot Program Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Percent className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">50% discount</h3>
              <p className="text-sm text-gray-600">For 12 months</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Priority Support</h3>
              <p className="text-sm text-gray-600">Dedicated assistance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Early Access</h3>
              <p className="text-sm text-gray-600">New features first</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">12 Month Access</h3>
              <p className="text-sm text-gray-600">Full platform access</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PilotProgramAccess;
