import React from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Bell,
  Clock
} from "lucide-react";

const ParentBotNotifications = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getNotificationTextColor = (type) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800';
      case 'success':
        return 'text-green-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-600" />
          Live Notifications
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {notifications.length} active
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getNotificationBgColor(notification.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${getNotificationTextColor(notification.type)}`}>
                      {notification.title}
                    </h3>
                    {notification.count && (
                      <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        {notification.count}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${getNotificationTextColor(notification.type)}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(notification.timestamp)}
                  </div>
                </div>
              </div>
            </div>

            {/* Show additional data for low ratings */}
            {notification.type === 'warning' && notification.data && (
              <div className="mt-3 pt-3 border-t border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  Recent low Ratings:
                </h4>
                <div className="space-y-2">
                  {notification.data.slice(0, 3).map((rating, idx) => (
                    <div key={idx} className="bg-white rounded p-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          User: {rating.user_id}
                        </span>
                        <span className="text-yellow-600 font-medium">
                          {rating.rating}/5 stars
                        </span>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-500 mt-1 italic">
                          "{rating.comment.substring(0, 100)}
                          {rating.comment.length > 100 ? '...' : ''}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-500">No active notifications</p>
          <p className="text-sm text-gray-400">All systems are running smoothly</p>
        </div>
      )}
    </div>
  );
};

export default ParentBotNotifications;
