import React from "react";
import PromotionData from "./data";
import AuthT from "../../../hooks/tauth";

const PromoteStudents = () => {
  return (
    <AuthT>
            <PromotionData />
    </AuthT>
  );
};

export default PromoteStudents;
