import React from "react";
import { 
  Activity, 
  MessageSquare, 
  Star,
} from "lucide-react";

const ParentBotRealTime = ({ realTimeStats }) => {
  if (!realTimeStats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-600" />
          Real-time Activity
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Last 24 Hours */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-blue-900">Last 24 Hours</h3>
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Feedback</span>
              <span className="font-semibold text-blue-900">
                {realTimeStats.feedbackLast24Hours}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">active Users</span>
              <span className="font-semibold text-blue-900">
                {realTimeStats.activeUsersLast24Hours}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Avg Rating</span>
              <span className="font-semibold text-blue-900">
                {realTimeStats.avgRatingLast24Hours}/5
              </span>
            </div>
          </div>
        </div>

        {/* Last Hour */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-green-900">Last Hour</h3>
            <Activity className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Feedback</span>
              <span className="font-semibold text-green-900">
                {realTimeStats.feedbackLastHour}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Rate/Hour</span>
              <span className="font-semibold text-green-900">
                {realTimeStats.feedbackLastHour}/hr
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Status</span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                {realTimeStats.feedbackLastHour > 5 ? 'high' : 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-purple-900">System Status</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">Bot Status</span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                Online
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">Response Time</span>
              <span className="font-semibold text-purple-900">
                &lt;1s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">Uptime</span>
              <span className="font-semibold text-purple-900">
                99.9%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      {realTimeStats.recentFeedback && realTimeStats.recentFeedback.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Recent Feedback</h3>
          <div className="space-y-3">
            {realTimeStats.recentFeedback.slice(0, 5).map((feedback, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {feedback.feedback_type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {new Date(feedback.created_at).toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      User: {feedback.user_id.substring(0, 8)}...
                    </div>
                  </div>
                </div>
                {feedback.comment && (
                  <p className="text-sm text-gray-600 mt-2 italic">
                    "{feedback.comment.substring(0, 100)}
                    {feedback.comment.length > 100 ? '...' : ''}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentBotRealTime;
