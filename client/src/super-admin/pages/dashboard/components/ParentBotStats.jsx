import React, { useState } from "react";
import { 
  Download, 
  User,
  MessageSquare,
  Star,
  Clock
} from "lucide-react";

const ParentBotStats = ({ stats }) => {
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const exportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      totalFeedback: stats.totalFeedback,
      avgRating: stats.avgRating,
      ratingDistribution: stats.ratingDistribution,
      feedbackByType: stats.feedbackByType,
      featureUsage: stats.featureUsage,
      activeUsers: stats.activeUsers,
      avgSessionDuration: stats.avgSessionDuration
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parent-bot-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Detailed Statistics</h2>
        <div className="flex items-center space-x-3">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Schools</option>
            <option value="school1">School 1</option>
            <option value="school2">School 2</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Feedback</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalFeedback}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-blue-600 mt-2">
            All time feedback entries
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-900">
                {stats.avgRating.toFixed(1)}
                <span className="text-lg text-yellow-600">/5</span>
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Overall satisfaction score
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">active Users</p>
              <p className="text-2xl font-bold text-green-900">{stats.activeUsers}</p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">
            Users in last 7 days
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Avg Session</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.avgSessionDuration}
                <span className="text-lg text-purple-600">min</span>
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-purple-600 mt-2">
            Average session duration
          </p>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
        <div className="grid grid-cols-5 gap-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating];
            const percentage = stats.totalFeedback > 0 ? 
              ((count / stats.totalFeedback) * 100).toFixed(1) : 0;
            
            return (
              <div key={rating} className="text-center">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Categories */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Feedback Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.feedbackByType).map(([type, count]) => {
            const typeLabels = {
              'bot_experience': 'Bot Experience',
              'ai_features': 'AI Features',
              'school_communication': 'School Communication',
              'student_info_access': 'Student Info Access',
              'overall': 'Overall Experience'
            };

            const icons = {
              'bot_experience': '🤖',
              'ai_features': '🧠',
              'school_communication': '🏫',
              'student_info_access': '📊',
              'overall': '⭐'
            };

            return (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg mb-1">{icons[type]}</div>
                    <div className="font-medium text-gray-900">
                      {typeLabels[type]}
                    </div>
                    <div className="text-sm text-gray-600">
                      {count} feedback
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-xs text-gray-500">
                      {stats.totalFeedback > 0 ? 
                        ((count / stats.totalFeedback) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Usage */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">Feature Usage Statistics</h3>
        <div className="space-y-3">
          {Object.entries(stats.featureUsage)
            .sort(([,a], [,b]) => b - a)
            .map(([feature, count]) => {
              const maxCount = Math.max(...Object.values(stats.featureUsage));
              const percentage = maxCount > 0 ? ((count / maxCount) * 100).toFixed(1) : 0;
              
              return (
                <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {feature.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {feature.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {count} uses
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{count}</div>
                    <div className="text-xs text-gray-500">
                      {percentage}% of max
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ParentBotStats;
