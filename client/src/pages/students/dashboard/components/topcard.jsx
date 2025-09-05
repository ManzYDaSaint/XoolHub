import React from "react";

const TopPerforming = ({ icon: Icon, score, student, term, exam, form }) => {
  return (
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30"></div>
      <div className="relative p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
            {Icon && <Icon size={24} className="text-white" />}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">Agg: {score}</h4>
            <p className="text-gray-600 font-medium">{student}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200/50 pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              <span className="text-gray-600 font-medium">{term}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
              <span className="text-gray-600 font-medium">{exam}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              <span className="text-gray-600 font-medium">{form}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerforming;
