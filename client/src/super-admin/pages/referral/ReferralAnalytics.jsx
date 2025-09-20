"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Share2,
  Award,
  Download,
  RefreshCw,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp, 
  Search,
  Copy,
  CheckCircle,
  Crown,
} from "lucide-react";
import api from "../../../services/apiServices.jsx";
import { toast } from "react-hot-toast";

const ReferralAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("total_referrals");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [settings, setSettings] = useState({});
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchAnalytics();
    fetchSettings();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getAllReferralAnalytics();
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

  const updateSettings = async (newSettings) => {
    try {
      const response = await api.updateReferralSettings({ settings: newSettings });
      if (response.data.success) {
        setSettings(newSettings);
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("failed to update settings");
    }
  };

  const filteredAnalytics = analytics.filter((item) =>
    item.school_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAnalytics = [...filteredAnalytics].sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;
    return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
  });

  const totalReferrals = analytics.reduce((sum, item) => sum + (item.total_referrals || 0), 0);
  const totalSuccessful = analytics.reduce((sum, item) => sum + (item.successful_referrals || 0), 0);
  const totalRewards = analytics.reduce((sum, item) => sum + (item.total_rewards_earned || 0), 0);
  const totalDiscounts = analytics.reduce((sum, item) => sum + (item.total_discounts_given || 0), 0);

  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const copyReferralCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Referral code copied to clipboard!");
  };

  const exportData = () => {
    const csvContent = [
      ["School Email", "Total Referrals", "Successful Referrals", "Total Rewards", "Total Discounts", "Last Referral", "Referral Code"],
      ...sortedAnalytics.map(item => [
        item.school_email || "",
        item.total_referrals || 0,
        item.successful_referrals || 0,
        item.total_rewards_earned || 0,
        item.total_discounts_given || 0,
        item.last_referral_date || "Never",
        item.referral_code || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "referral-analytics.csv";
    a.click();
    window.URL.revokeObjectURL(url);
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
          <p className="text-gray-600 text-lg">Loading referral analytics...</p>
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
                Referral Analytics
              </h1>
              <p className="text-gray-600">Track and analyze referral performance across all schools</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <Settings className="h-5 w-5 text-gray-600 mr-2" />
                Settings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <Download className="h-5 w-5 text-gray-600 mr-2" />
                Export
              </motion.button>
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
          </div>
        </motion.div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-6 w-6 text-blue-600 mr-2" />
              Referral Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={settings.referral_discount_percentage || 10}
                  onChange={(e) => setSettings({...settings, referral_discount_percentage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reward Amount ($)
                </label>
                <input
                  type="number"
                  value={settings.referral_reward_amount || 50}
                  onChange={(e) => setSettings({...settings, referral_reward_amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Referrals per School
                </label>
                <input
                  type="number"
                  value={settings.max_referrals_per_school || 100}
                  onChange={(e) => setSettings({...settings, max_referrals_per_school: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSettings(settings)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-3xl font-bold text-gray-900">{totalReferrals}</p>
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
                <p className="text-3xl font-bold text-gray-900">{totalSuccessful}</p>
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
                <p className="text-3xl font-bold text-gray-900">${totalRewards.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Discounts</p>
                <p className="text-3xl font-bold text-gray-900">${totalDiscounts.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="total_referrals">Sort by Referrals</option>
                <option value="successful_referrals">Sort by Successful</option>
                <option value="total_rewards_earned">Sort by Rewards</option>
                <option value="total_discounts_given">Sort by Discounts</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Showing {sortedAnalytics.length} of {analytics.length} schools
            </div>
          </div>
        </motion.div>

        {/* Analytics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referrals
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rewards
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discounts
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Referral
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAnalytics.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                          {item.school_email?.charAt(0).toUpperCase() || "S"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.school_email || "Unknown School"}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.school_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.total_referrals || 0}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.successful_referrals || 0} successful
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.total_referrals > 0 
                            ? Math.round((item.successful_referrals / item.total_referrals) * 100)
                            : 0}%
                        </div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${item.total_referrals > 0 
                                ? (item.successful_referrals / item.total_referrals) * 100 
                                : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.total_rewards_earned || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.total_discounts_given || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.last_referral_date 
                          ? new Date(item.last_referral_date).toLocaleDateString()
                          : "Never"
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {item.referral_code && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyReferralCode(item.referral_code)}
                            className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy Code
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleRowExpansion(index)}
                          className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralAnalytics;
