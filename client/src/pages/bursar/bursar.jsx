import React from "react";
import AuthT from "../../hooks/tauth";
import Dashboard from "./components/dashboard";
import Layout from "../../components/layout";

const bursar = () => {
  return (
    <AuthT>
      <Layout>
        <Dashboard />
      </Layout>
    </AuthT>
  );
};

export default bursar;
