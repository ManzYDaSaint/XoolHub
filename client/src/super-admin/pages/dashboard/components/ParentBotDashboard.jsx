import React, { useState, useEffect } from "react";
import { 
  Bot, 
  MessageSquare, 
  Users, 
  Star, 
  Clock,
  AlertTriangle
} from "lucide-react";
import api from "../../../../services/apiServices";
import ParentBotStats from "./ParentBotStats";
import ParentBotNotifications from "./ParentBotNotifications";
import ParentBotAnalytics from "./ParentBotAnalytics";
import ParentBotRealTime from "./ParentBotRealTime";

const ParentBotDashboard = () => {
  const [stats, setStats] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParentBotStats = async () => {
    try {
      const response = await api.getParentBotStats();
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching parent bot stats:', error);
      setError('failed to load parent bot statistics');
    }
  };

  const fetchRealTimeStats = async () => {
    try {
      const response = await api.getParentBotRealTimeStats();
      if (response.data.success) {
        setRealTimeStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.getParentBotNotifications();
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchParentBotStats(),
        fetchRealTimeStats(),
        fetchNotifications()
      ]);
      setLoading(false);
    };

    loadData();

    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchRealTimeStats();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Bot className="h-8 w-8 mr-3" />
              parent Bot Dashboard
            </h1>
            <p className="text-blue-100 mt-2">
              Real-time monitoring and analytics for the parent Telegram Bot
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Last Updated</div>
            <div className="text-lg font-semibold">
              {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalFeedback || 0}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              +{realTimeStats?.feedbackLast24Hours || 0} in last 24h
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.avgRating ? stats.avgRating.toFixed(1) : '0.0'}
                <span className="text-lg text-gray-500">/5</span>
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Last 24h: {realTimeStats?.avgRatingLast24Hours || '0.0'}/5
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.activeUsers || 0}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              +{realTimeStats?.activeUsersLast24Hours || 0} in last 24h
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.avgSessionDuration || 0}
                <span className="text-lg text-gray-500">min</span>
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Recent feedback: {realTimeStats?.feedbackLastHour || 0}/hour
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <ParentBotNotifications notifications={notifications} />
      )}

      {/* Real-time Activity */}
      <ParentBotRealTime realTimeStats={realTimeStats} />

      {/* Analytics */}
      <ParentBotAnalytics stats={stats} />

      {/* Detailed Statistics */}
      <ParentBotStats stats={stats} />
    </div>
  );
};

export default ParentBotDashboard;
