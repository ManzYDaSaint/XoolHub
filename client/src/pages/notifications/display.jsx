import { MessageSquare, X } from "lucide-react"

function MessageDisplay({ notification, isMobileOpen, onClose }) {
  return (
    <div
      className={`w-full md:w-2/3 p-4 transition-all duration-300 ease-in-out ${
        isMobileOpen ? "fixed inset-0 z-50 bg-white" : "hidden md:block"
      }`}
    >
      {notification ? (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              {notification.title}
            </h2>
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 flex-grow">{notification.message}</p>
          <span className="text-sm text-gray-400 mt-4 block">{notification.timestamp}</span>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          Select a notification to view details
        </div>
      )}
    </div>
  )
}

export default MessageDisplay

