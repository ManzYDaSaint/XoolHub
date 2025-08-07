import React from 'react'

const Nopage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
        <a
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

export default Nopage