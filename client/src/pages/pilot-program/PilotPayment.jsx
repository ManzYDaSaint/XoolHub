import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Smartphone, Banknote, Shield, Clock, Gift, Percent } from 'lucide-react';
import api from '../../services/apiServices';
import toast from 'react-hot-toast';

const PilotPayment = ({ programId, onPaymentSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    originalAmount: 0,
    discountAmount: 0,
    dueDate: '',
    paymentMethod: '',
    transactionId: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethods] = useState([
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
  ]);

  useEffect(() => {
    if (programId) {
      fetchPaymentDetails();
    }
  }, [programId]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await api.getPilotProgramPayments(programId);
      if (response.data.success && response.data.data.length > 0) {
        const initialPayment = response.data.data.find(payment => payment.payment_type === 'initial');
        if (initialPayment) {
          setPaymentData({
            amount: initialPayment.amount,
            originalAmount: initialPayment.original_amount,
            discountAmount: initialPayment.discount_amount,
            dueDate: initialPayment.due_date,
            paymentMethod: initialPayment.payment_method || '',
            transactionId: initialPayment.transaction_id || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error('failed to load payment details');
    }
  };

  const handlePaymentMethodSelect = (methodId) => {
    setPaymentData(prev => ({
      ...prev,
      paymentMethod: methodId
    }));
  };

  const handleTransactionIdChange = (e) => {
    setPaymentData(prev => ({
      ...prev,
      transactionId: e.target.value
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!paymentData.transactionId.trim()) {
      toast.error('Please enter your transaction ID');
      return;
    }

    setLoading(true);

    try {
      // Find the payment ID (you might need to adjust this based on your API structure)
      const response = await api.getPilotProgramPayments(programId);
      const initialPayment = response.data.data.find(payment => payment.payment_type === 'initial');
      
      if (initialPayment) {
        const updateResponse = await api.updatePilotPaymentStatus(initialPayment.id, {
          status: 'paid',
          transactionId: paymentData.transactionId,
          paymentMethod: paymentData.paymentMethod
        });

        if (updateResponse.data.success) {
          toast.success('Payment submitted successfully! We will verify and confirm within 24 hours.');
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        } else {
          toast.error('failed to submit payment');
        }
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('failed to submit payment. Please try again.');
    } finally {
      setLoading(false);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pilot Program Payment</h1>
              <p className="text-green-100">complete your initial payment to start your pilot program</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">MK {formatPrice(paymentData.amount)}</div>
              <div className="text-green-100 text-sm">
                Save MK {formatPrice(paymentData.discountAmount)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Payment Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Percent className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">discount applied</h3>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                50% OFF
              </div>
              <p className="text-blue-700 text-sm">
                MK {formatPrice(paymentData.discountAmount)} saved
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Gift className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-900">Pilot Benefit</h3>
              </div>
              <div className="text-2xl font-bold text-green-900">
                1 Year
              </div>
              <p className="text-green-700 text-sm">
                Full access at 50% off
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Clock className="h-6 w-6 text-orange-600 mr-2" />
                <h3 className="font-semibold text-orange-900">Due Date</h3>
              </div>
              <div className="text-2xl font-bold text-orange-900">
                {formatDate(paymentData.dueDate)}
              </div>
              <p className="text-orange-700 text-sm">
                Pay before this date
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentData.paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-3 ${
                      paymentData.paymentMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      {method.popular && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Payment Instructions */}
          {paymentData.paymentMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Instructions</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                {paymentData.paymentMethod === 'mobile_money' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Mobile Money Payment</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>1. Open your mobile money app (Airtel Money, TNM Mpamba, or MoMo)</p>
                      <p>2. Send MK {formatPrice(paymentData.amount)} to:</p>
                      <div className="bg-white p-4 rounded-lg mt-3">
                        <p className="font-mono text-lg font-bold">+265 999 123 456</p>
                        <p className="text-sm text-gray-600">Reference: PILOT-{programId?.slice(-8)}</p>
                      </div>
                      <p>3. Enter the transaction ID below after payment</p>
                    </div>
                  </div>
                )}

                {paymentData.paymentMethod === 'bank_transfer' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Bank Transfer</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>1. Transfer MK {formatPrice(paymentData.amount)} to our account:</p>
                      <div className="bg-white p-4 rounded-lg mt-3">
                        <p className="font-semibold">Bank: Standard Bank Malawi</p>
                        <p className="font-mono text-lg font-bold">Account: 1234567890</p>
                        <p className="font-semibold">Account Name: XoolHub Limited</p>
                        <p className="text-sm text-gray-600">Reference: PILOT-{programId?.slice(-8)}</p>
                      </div>
                      <p>2. Enter the transaction reference below</p>
                    </div>
                  </div>
                )}

                {paymentData.paymentMethod === 'cash' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Cash Payment</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>1. Visit our office with MK {formatPrice(paymentData.amount)}</p>
                      <div className="bg-white p-4 rounded-lg mt-3">
                        <p className="font-semibold">XoolHub Office</p>
                        <p>Area 3, Lilongwe</p>
                        <p>Phone: +265 999 123 456</p>
                        <p>Hours: Mon-Fri, 8AM-5PM</p>
                      </div>
                      <p>2. Get a receipt and enter the receipt number below</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Transaction ID Input */}
          {paymentData.paymentMethod && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transaction ID / Reference Number *
              </label>
              <input
                type="text"
                value={paymentData.transactionId}
                onChange={handleTransactionIdChange}
                placeholder="Enter your transaction ID or reference number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </motion.div>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Secure Payment</h4>
                <p className="text-blue-800 text-sm">
                  Your payment information is secure and encrypted. We will verify your payment 
                  within 24 hours and send you a confirmation email. If you have any questions, 
                  contact our support team.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="button"
            onClick={handlePaymentSubmit}
            disabled={loading || !paymentData.paymentMethod || !paymentData.transactionId.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Submit Payment
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PilotPayment;
