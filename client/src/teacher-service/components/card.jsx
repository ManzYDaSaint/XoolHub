import React from 'react'
import CountUp from "react-countup";
import { FlipVertical } from 'lucide-react';

const DashboardCard = ({ label, figure, icon, note, dico, cardTop }) => {

  return (
    <div className='group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300'>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
        <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <h5 className="text-3xl font-bold text-gray-900 mb-1">
                      <CountUp
                        start={0}
                        end={figure}
                        duration={2.5}
                        separator=","
                      />
                    </h5>
                    <p className="text-gray-600 font-medium">{label}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {icon && <FlipVertical id={dico} className="w-6 h-6 text-white" />}
                </div>
            </div>
            {note && (
              <div className="border-t border-gray-200/50 pt-4">
                <p className='text-sm text-gray-600 font-medium'>{note}</p>
              </div>
            )}
        </div>
    </div>
  )
}

export default DashboardCard