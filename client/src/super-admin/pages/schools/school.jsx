import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SchoolTable from "./table.jsx";
import { Toaster } from "react-hot-toast";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import Menu from "../../components/Top/menu.jsx";
import { Trash, Pencil } from "lucide-react";

const Schools = () => {
  const [school, setSchoolData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
      const res = await api.getXuls();
      const data = res.data.school;
      if (data.length === 0) {
        const info = [{
          sr: '',
          name: 'No records found!',
          type: '',
          email: '',
          contact:'',
          status: '',
          actions: ""
        }];
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
            <div>
              <button
                onClick={() => handleEdit(item.classid)}
                className="action_icon"
              >
                <Pencil size={18} className="action_edit" />
              </button>
              <button
                onClick={() => handleDelete(item.sid)}
                className="action_icon"
              >
                <Trash size={18} className="action_delete" />
              </button>
            </div>
          ),
        }));
        setSchoolData(info);
      }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
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
                <div className="profile_container mt-5">
                  <h4 className="gift">Schools Management</h4>
                  <SchoolTable data={school} />
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
