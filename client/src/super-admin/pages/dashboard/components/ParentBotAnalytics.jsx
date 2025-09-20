import React from "react";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Star,
  Users,
  Clock
} from "lucide-react";

const ParentBotAnalytics = ({ stats }) => {
  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const getRatingPercentage = (rating) => {
    const total = stats.totalFeedback;
    if (total === 0) return 0;
    return ((stats.ratingDistribution[rating] / total) * 100).toFixed(1);
  };

  const getFeedbackTypePercentage = (type) => {
    const total = stats.totalFeedback;
    if (total === 0) return 0;
    return ((stats.feedbackByType[type] / total) * 100).toFixed(1);
  };

  const getTopFeatures = () => {
    const features = stats.featureUsage;
    return Object.entries(features)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Rating Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-600" />
            Rating Distribution
          </h2>
          <span className="text-sm text-gray-500">
            Total: {stats.totalFeedback} feedback
          </span>
        </div>

        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating];
            const percentage = getRatingPercentage(rating);
            const width = `${percentage}%`;
            
            return (
              <div key={rating} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                    <span className="text-xs text-gray-500 ml-2">({percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      rating >= 4 ? 'bg-green-500' : 
                      rating === 3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback by Type */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            Feedback by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(stats.feedbackByType).map(([type, count]) => {
            const percentage = getFeedbackTypePercentage(type);
            const typeLabels = {
              'bot_experience': 'Bot Experience',
              'ai_features': 'AI Features',
              'school_communication': 'School Communication',
              'student_info_access': 'Student Info Access',
              'overall': 'Overall Experience'
            };

            return (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">
                    {typeLabels[type]}
                  </h3>
                  <span className="text-sm font-semibold text-blue-600">
                    {count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {percentage}% of total feedback
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Usage */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Most Used Features
          </h2>
        </div>

        <div className="space-y-4">
          {getTopFeatures().map(([feature, count], index) => {
            const maxCount = Math.max(...Object.values(stats.featureUsage));
            const percentage = ((count / maxCount) * 100).toFixed(1);
            
            return (
              <div key={feature} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      #{index + 1} {feature.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                    <span className="text-xs text-gray-500 ml-2">uses</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-blue-900">User Engagement</h3>
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-blue-700">active Users (7d)</span>
              <span className="font-semibold text-blue-900">{stats.activeUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-700">Recent Feedback</span>
              <span className="font-semibold text-blue-900">{stats.recentFeedback}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-green-900">Performance</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-green-700">Avg Rating</span>
              <span className="font-semibold text-green-900">
                {stats.avgRating}/5
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-700">Satisfaction</span>
              <span className="font-semibold text-green-900">
                {stats.avgRating >= 4 ? 'Excellent' : 
                 stats.avgRating >= 3 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-purple-900">Session Data</h3>
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-purple-700">Avg Duration</span>
              <span className="font-semibold text-purple-900">
                {stats.avgSessionDuration} min
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-purple-700">Engagement</span>
              <span className="font-semibold text-purple-900">
                {stats.avgSessionDuration > 15 ? 'high' : 
                 stats.avgSessionDuration > 8 ? 'medium' : 'low'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentBotAnalytics;
