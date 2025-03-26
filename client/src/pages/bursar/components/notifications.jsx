import React from "react";
import { AlertTriangle, Bell } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-4 shadow rounded-lg ${className}`}>{children}</div>
);

const Notifications = () => {
  return (
    <Card className="p-6 mt-6">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      <p className="text-sm text-gray-500 mb-4">Recent alerts and pending actions</p>
      {/* <h4 className="text-md font-semibold mb-2">Recent Notifications</h4> */}
      <ul className="space-y-2 text-sm mb-4">
        <li className="flex items-start flex-col align-center py-2 pl-3 border-l-2 border-yellow-200 cursor-pointer">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span>5 pending invoices require attention</span>
          </div>
          <span className="text-gray-400 text-xs ml-6 pt-1">about 2 hours ago</span>
        </li>
        <li className="flex items-start flex-col align-center py-2 pl-3 border-l-2 border-blue-500 cursor-pointer">  
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-blue-500" />
            <span>12 new fee payments received today</span>
          </div>
          <span className="text-gray-400 text-xs ml-6 pt-1">1 day ago</span>
        </li>
      </ul>
    </Card>
  );
};

export default Notifications;