import React from "react";
import AuthT from "../../hooks/tauth";
import Entry from "./components/entry";
import Layout from "../../components/layout";

const BEntry = () => {
  return (
    <AuthT>
      <Layout>
        <Entry />
      </Layout>
    </AuthT>
  );
};

export default BEntry;
