import React from 'react'
import FinData from './tabs/financial/feesData'

const panes = [
  {
    menuItem: 'Academics',
    render: () => (
      <div className="p-4 border-b">
        <h5 className="text-lg font-semibold">Academics</h5>
      </div>
    ),
  },
  {
    menuItem: 'Fees History',
    render: () => (
      <div className="p-4 border-b">
        <FinData />
      </div>
    ),
  },
  {
    menuItem: 'Attendance',
    render: () => (
      <div className="p-4 border-b">Tab 3 Content</div>
    ),
  },
]

const StudentHistory = () => (
  <div className="flex flex-col">
    <div className="flex space-x-4 border-b">
      {panes.map((pane, index) => (
        <button key={index} className="py-2 px-4 hover:bg-gray-200">
          {pane.menuItem}
        </button>
      ))}
    </div>
    <div>
      {panes[0].render()} {/* Render the first pane by default */}
    </div>
  </div>
)

export default StudentHistory