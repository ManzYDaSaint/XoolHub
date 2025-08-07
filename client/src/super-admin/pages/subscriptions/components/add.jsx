import React from "react";
import SuperAuth0 from "../../../../hooks/superauth";
import SuperSidebar from "../../../components/navbar/navbar";
import PlanData from "./data";
import { Toaster } from "react-hot-toast";

const AddSubsciptions = () => {
  return (
    <SuperAuth0>
      <Toaster />
      <SuperSidebar />
      <div className="px-6 py-8 border-2 border-gray-300 m-6 rounded-lg">
        <PlanData />
      </div>
    </SuperAuth0>
  );
};

export default AddSubsciptions;
