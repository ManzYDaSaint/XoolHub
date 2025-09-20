"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react";
import api from "../../services/apiServices.jsx";
import { toast } from "react-hot-toast";

const ReferralDiscount = ({ 
  subscriptionAmount, 
  onDiscountApplied, 
  referralCode, 
  schoolId 
}) => {
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
    if (referralCode) {
      validateReferralCode();
    }
  }, [referralCode]);

  const fetchSettings = async () => {
    try {
      const response = await api.getReferralSettings();
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const validateReferralCode = async () => {
    if (!referralCode) return;
    
    try {
      setLoading(true);
      const response = await api.validateReferralCode({ referralCode });
      if (response.data.success) {
        const validation = response.data.data;
        const discountPercentage = parseFloat(settings.referral_discount_percentage) || 10;
        const discountAmount = (subscriptionAmount * discountPercentage) / 100;
        
        setDiscount({
          percentage: discountPercentage,
          amount: discountAmount,
          referrer: validation.referrer_email,
          code: referralCode
        });
      } else {
        toast.error("Invalid referral code");
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      toast.error("failed to validate referral code");
    } finally {
      setLoading(false);
    }
  };

  const applyDiscount = async () => {
    if (!discount || !schoolId) return;
    
    try {
      setLoading(true);
      
      // Track the referral usage
      const trackResponse = await api.trackReferralUsage({
        referrerSchoolId: discount.referrerSchoolId,
        referredSchoolId: schoolId,
        referralCode: discount.code
      });
      
      if (trackResponse.data.success) {
        setApplied(true);
        onDiscountApplied?.(discount);
        toast.success(`Referral discount applied! You saved $${discount.amount.toFixed(2)}`);
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      toast.error("failed to apply referral discount");
    } finally {
      setLoading(false);
    }
  };

  if (!referralCode) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Referral discount Available!</h3>
            <p className="text-sm text-gray-600">You have a valid referral code</p>
          </div>
        </div>
        {applied && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">applied</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-gray-600">Validating referral code...</span>
        </div>
      ) : discount ? (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Referral Code</span>
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {discount.code}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Referrer</span>
              <span className="text-sm text-gray-900">{discount.referrer}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">discount</span>
              <span className="text-sm font-bold text-green-600">
                {discount.percentage}% off
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">You Save</span>
              <span className="text-lg font-bold text-green-600">
                ${discount.amount.toFixed(2)}
              </span>
            </div>
          </div>

          {!applied && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={applyDiscount}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Applying discount...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Apply Referral discount
                </div>
              )}
            </motion.button>
          )}

          {applied && (
            <div className="bg-green-100 border border-green-300 rounded-xl p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  Referral discount successfully applied! You saved ${discount.amount.toFixed(2)}.
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 font-medium">Invalid referral code</p>
          <p className="text-sm text-gray-600">Please check your referral code and try again.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ReferralDiscount;
