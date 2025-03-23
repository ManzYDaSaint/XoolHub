import React from "react";
import Sidebar from "../../components/input/sidebar";
import AuthT from "../../hooks/tauth";
import ExpensesPage from "./components/expense";

const Expenses = () => {
  return (
    <AuthT>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <ExpensesPage />
            </div>
          </div>
        </div>
    </AuthT>
  );
};

export default Expenses;
