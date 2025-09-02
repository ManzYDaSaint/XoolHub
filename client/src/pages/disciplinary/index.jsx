import React from 'react'
import { Toaster } from 'react-hot-toast'

const DisciplinaryComponent = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="ml-16">
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Disciplinary Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage disciplinary by entering and filtering.
            </p>
          </div>
        </div>

        {/* Disciplinary Content */}
      </div>
    </div>
  )
}

export default DisciplinaryComponent