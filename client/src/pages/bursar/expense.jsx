import React from "react";
import AuthT from "../../hooks/tauth";
import ExpensesPage from "./components/expense";
import Layout from "../../components/layout";

const Expenses = () => {
  return (
    <AuthT>
      <Layout>
        <ExpensesPage />
      </Layout>
    </AuthT>
  );
};

export default Expenses;
