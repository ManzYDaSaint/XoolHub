import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SchoolTable from "./table.jsx";
import toast, { Toaster } from "react-hot-toast";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import Menu from "../../components/Top/menu.jsx";
import ToggleSwitch from "./toggle.jsx";

const Schools = () => {
  const [school, setSchoolData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getXuls();
    const data = res.data.school;
    if (data.length === 0) {
      const info = [
        {
          sr: "",
          name: "No records found!",
          type: "",
          email: "",
          contact: "",
          status: "",
          actions: "",
        },
      ];
      setSchoolData(info);
    } else {
      const info = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        type: item.type,
        email: item.email,
        contact: item.contact,
        status: item.status,
        actions: (
          <ToggleSwitch
            id={item.id}
            status={item.status}
            onToggle={handleToggle}
          />
        ),
      }));
      setSchoolData(info);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Activated" ? "Deactivated" : "Activated";

    try {
      // API call to update the data
      const res = await api.updateSchoolStatus(id, {
        status: newStatus,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }

      // Refresh the table data
      fetchData();
    } catch (error) {
      console.error("Error updating the data:", error);
    }
  };

  return (
    <SuperAuth0>
      <Toaster />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="flex bg-gray-100 pb-3">
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                      <div>
                        <h1
                          className="text-lg font-semibold"
                          style={{ fontFamily: "'Poppins', san-serif" }}
                        >
                          Schools Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage registered schools and their details.
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0"></div>
                    </div>

                    {/* Content */}
                    <div className="px-5">
                      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
                        <SchoolTable data={school} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default Schools;
