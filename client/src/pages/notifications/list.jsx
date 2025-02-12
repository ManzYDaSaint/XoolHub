import { Bell } from "lucide-react"

export function NotificationList({ notifications, onNotificationClick, selectedId }) {
    return (
      <div className="w-full md:w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 cursor-pointer transition-colors duration-200 ease-in-out ${
                notification.viewed ? "bg-gray-100" : "bg-blue-50 font-bold"
              } ${notification.id === selectedId ? "bg-blue-50" : "hover:bg-gray-50"}`}
              onClick={() => onNotificationClick(notification)}
            >
              <h3 className="font-medium text-sm">{notification.title}</h3>
              <p className="text-gray-500 text-sm truncate">{notification.message}</p>
              <span className="text-xs text-gray-400 mt-1 block">{notification.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default NotificationList