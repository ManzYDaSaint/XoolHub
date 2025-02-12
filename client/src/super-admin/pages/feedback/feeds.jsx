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
        const info = [{
          sr: '',
          name: 'No records found!',
          rating: '',
          option: '',
          comment:'',
          date: '',
        }];
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
                <div className="profile_container mt-5">
                  <h4 className="gift">Feedback Management</h4>
                  <Table data={feedback} />
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
