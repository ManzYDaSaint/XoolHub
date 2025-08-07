import React from "react";
import AuthT from "../../hooks/tauth";
import Howa from "./components/hoa";
import Layout from "../../components/layout";

const Hoa = () => {
  return (
    <AuthT>
      <Layout>
        <Howa />
      </Layout>
    </AuthT>
  );
};

export default Hoa;
