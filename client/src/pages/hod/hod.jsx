import React from "react";
import AuthT from "../../hooks/tauth";
import Hold from "./components/hod";
import Layout from "../../components/layout";

const hod = () => {
  return (
    <AuthT>
      <Layout>
        <Hold />
      </Layout>
    </AuthT>
  );
};

export default hod;
