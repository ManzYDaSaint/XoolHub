import React from "react";
import Sidebar from "../../components/input/sidebar";
import StudentData from "./studentData";
import AuthT from "../../hooks/tauth";

const AddStudents = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <StudentData />
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default AddStudents;
