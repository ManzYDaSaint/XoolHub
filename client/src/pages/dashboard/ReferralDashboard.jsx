"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Gift,
  Users,
  CheckCircle,
  Award,
  Target,
  Copy,
  RefreshCw,
  Calendar,
  Crown,
  Activity,
} from "lucide-react";
import api from "../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const ReferralDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareText, setShareText] = useState("");
  const [trackingRecords, setTrackingRecords] = useState([]);
  
  const schoolId = useSelector((state) => state.exam.schoolId);

  useEffect(() => {
    if (schoolId) {
      fetchAnalytics();
      fetchReferralCode();
      fetchTrackingRecords();
    }
  }, [schoolId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getReferralAnalytics(schoolId);
      if (response.data.success) {
        setAnalytics(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("failed to fetch referral analytics");
    } finally {
      setLoading(false);
    }
  };

  const fetchReferralCode = async () => {
    try {
      const response = await api.getReferralCode(schoolId);
      if (response.data.success) {
        setReferralCode(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  const fetchTrackingRecords = async () => {
    try {
      const response = await api.getReferralTracking(schoolId);
      if (response.data.success) {
        setTrackingRecords(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tracking records:", error);
    }
  };

  const copyReferralCode = async () => {
    if (referralCode?.referral_code) {
      try {
        await navigator.clipboard.writeText(referralCode.referral_code);
        setCopied(true);
        toast.success("Referral code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error("failed to copy referral code");
      }
    }
  };

  const generateShareText = () => {
    const code = referralCode?.referral_code;
    const baseUrl = window.location.origin;
    return `Join me on XoolHub! Use my referral code "${code}" to get exclusive benefits when you sign up. Sign up here: ${baseUrl}/register?ref=${code}`;
  };

  const shareOnSocial = (platform) => {
    const text = generateShareText();
    const url = encodeURIComponent(window.location.origin + `/register?ref=${referralCode?.referral_code}`);
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const copyShareText = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Share text copied to clipboard!");
    } catch (error) {
      toast.error("failed to copy share text");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading referral dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Crown className="h-8 w-8 text-yellow-500 mr-3" />
                Referral Dashboard
              </h1>
              <p className="text-gray-600">Track your referral performance and earn rewards</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAnalytics}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Referral Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Gift className="h-6 w-6 text-purple-600 mr-2" />
              Your Referral Code
            </h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyReferralCode}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  copied 
                    ? "bg-green-100 text-green-700" 
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy Code"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareModal(true)}
                className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </motion.button>
            </div>
          </div>
          
          {referralCode ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2 font-mono">
                  {referralCode.referral_code}
                </div>
                <p className="text-gray-600 mb-4">
                  Share this code with other schools to earn rewards when they sign up!
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    active
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                    Created {new Date(referralCode.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No referral code found. Please contact support.</p>
            </div>
          )}
        </motion.div>

        {/* Analytics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics?.total_referrals || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Referrals</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics?.successful_referrals || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rewards</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${(analytics?.total_rewards_earned || 0).toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics?.total_referrals > 0 
                    ? Math.round((analytics.successful_referrals / analytics.total_referrals) * 100)
                    : 0}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="h-6 w-6 text-blue-600 mr-2" />
            Recent Referrals
          </h3>
          
          {trackingRecords.length > 0 ? (
            <div className="space-y-4">
              {trackingRecords.slice(0, 5).map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                      {record.referred_email?.charAt(0).toUpperCase() || "S"}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {record.referred_email || "Unknown School"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(record.referral_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${(record.discount_applied || 0).toFixed(2)} discount
                      </div>
                      <div className="text-sm text-gray-500">
                        {record.status}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : record.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {record.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No referrals yet. Start sharing your code to earn rewards!</p>
            </div>
          )}
        </motion.div>

        {/* Share Modal */}
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Referral Code</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Text
                  </label>
                  <textarea
                    value={shareText || generateShareText()}
                    onChange={(e) => setShareText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareOnSocial("twitter")}
                    className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <span className="text-sm">Twitter</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareOnSocial("facebook")}
                    className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <span className="text-sm">Facebook</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareOnSocial("linkedin")}
                    className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <span className="text-sm">LinkedIn</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareOnSocial("whatsapp")}
                    className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <span className="text-sm">WhatsApp</span>
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyShareText}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Share Text
                </motion.button>
              </div>
              
              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;
