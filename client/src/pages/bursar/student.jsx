import React from "react";
import StudentData from "../../teacher-service/data/studentData";
import AuthT from "../../hooks/tauth";
import Layout from "../../components/layout";

const BStudent = () => {
  return (
    <AuthT>
      <Layout>
        <div className="bg-gray-100">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
            <div className="ml-16">
              <h1
                className="text-lg font-semibold"
                style={{ fontFamily: "'Poppins', san-serif" }}
              >
                Student Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage and update student information
              </p>
            </div>
            <div className="mt-4 sm:mt-0"></div>
          </div>

          {/* Profile Information */}
          <div className="pl-6 pr-6 pb-6">
            <h1 className="text-xl font-bold mb-4">Students Information</h1>
              <StudentData />
            {/* <div className="p-6 shadow-lg rounded-lg">
            </div> */}
          </div>
        </div>
      </Layout>
    </AuthT>
  );
};

export default BStudent;
