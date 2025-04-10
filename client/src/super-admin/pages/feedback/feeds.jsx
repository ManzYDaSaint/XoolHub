import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import Menu from "../../components/Top/menu.jsx";
import Table from "./table.jsx";

const Feeds = () => {
  const [feedback, setFeedback] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getFeedback();
    const data = res.data.feedback;
    if (data.length === 0) {
      const info = [
        {
          sr: "",
          name: "No records found!",
          rating: "",
          option: "",
          comment: "",
          date: "",
        },
      ];
      setFeedback(info);
    } else {
      const info = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        rating: item.rating,
        option: item.optioni,
        comment: item.commenti,
        date: item.date,
      }));
      setFeedback(info);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SuperAuth0>
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
                          Feedback Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage feedback from schools and their details.
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0"></div>
                    </div>

                    {/* Content */}
                    <div className="px-5">
                      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
                        <Table data={feedback} />
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

export default Feeds;
