import React from "react";
import { Toaster } from "react-hot-toast";
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
    <div className="flex bg-gray-100 pb-3">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
          <div>
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Head Of Department Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, edit and update student information.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
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
        </div>

        {/* Profile Information */}
        <Overview />
      </div>
    </div>
  );
};

export default Hold;
