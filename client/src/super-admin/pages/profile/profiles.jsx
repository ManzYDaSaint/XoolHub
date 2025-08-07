import React from "react";
import SuperSidebar from "../../components/navbar/navbar";
import SuperAuth0 from "../../../hooks/superauth";
import SuperTabs from "./components/tabs";
import { Toaster } from "react-hot-toast";

const ProfileSuper = () => {
  return (
    <SuperAuth0>
      <Toaster />
      <SuperSidebar />
      <div className="p-6">
        <SuperTabs />
      </div>
    </SuperAuth0>
  );
};

export default ProfileSuper;
