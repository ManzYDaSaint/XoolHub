import React from "react";
import Sidebar from "../../components/input/sidebar";
import AuthT from "../../hooks/tauth";
import Profile from "./components/profile";

const BProfile = () => {
  return (
    <AuthT>
      <Sidebar />
      <Profile />
    </AuthT>
  );
};

export default BProfile;
