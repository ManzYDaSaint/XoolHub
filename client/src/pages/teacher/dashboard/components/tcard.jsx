import React from "react";

const Ctcard = ({ icon: Icon, score, student }) => {
  return (
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/30"></div>
      <div className="relative p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
            {Icon && <Icon size={24} className="text-white" />}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">{score}</h4>
            <p className="text-gray-600 font-medium">{student}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ctcard;
