import React from "react";
import AuthT from "../../hooks/tauth";
import Report from "./components/report";
import Layout from "../../components/layout";

const HReports = () => {
  return (
    <AuthT>
      <Layout>
        <Report />
      </Layout>
    </AuthT>
  );
};

export default HReports;
