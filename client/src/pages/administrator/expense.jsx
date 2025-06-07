import React from 'react'
import Auth0 from '../../hooks/auth'
import PAID from '../../hooks/subscription'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import ExpenseSection from './component/expense'

const Expense = () => {
  return (
    <Auth0>
      <PAID>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Navbar />
              <ExpenseSection />
            </div>
          </div>
        </div>
      </PAID>
    </Auth0>
  )
}

export default Expense