import React from "react";
import Overview from "./overview";
import { useNavigate } from "react-router-dom";
import FormButton from "../../../components/input/formButton";

const Hold = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/add-student");
  };
  const handlePromote = () => {
    navigate("/student-promotion");
  };

  return (
    <div className="bg-gray-100 pb-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
        <div className="ml-16">
          <h1
            className="text-lg font-semibold"
            style={{ fontFamily: "'Poppins', san-serif" }}
          >
            Head Of Department Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Manage, edit and update student information.
          </p>
        </div>
          <div className="flex gap-4 align-center">
            <FormButton
              label={"Promotions"}
              id={"nextButton"}
              onClick={handlePromote}
            />
            <FormButton
              label={"Create"}
              id={"tyepButton"}
              icon={"plus"}
              onClick={handleRedirect}
            />
          </div>
      </div>

      {/* Profile Information */}
      <Overview />
    </div>
  );
};

export default Hold;
