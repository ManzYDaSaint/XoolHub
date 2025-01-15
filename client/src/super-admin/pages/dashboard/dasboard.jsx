import React, { useState, useEffect } from "react";
import SuperSidebar from "../../components/navbar/navbar";
import Menu from "../../components/Top/menu";
import SuperAuth0 from "../../../hooks/superauth";
import Card from "../../../pages/students/dashboard/components/card";
import {
  LayoutGrid,
  School,
  LayoutDashboard,
  Rss,
  CircleDollarSign,
} from "lucide-react";
import "./dashboard.css";
import PaymentChart from "./components/payments";
import YearOptions from "./components/yearSelector";
import api from "../../../services/apiServices";

const SuperDashboard = () => {
  const [ count, setCount ] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await api.countXuls();
      const data = res.data.count;
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="super__cards">
                <Card icon={School} title={count} description="Schools" />
                <Card
                  icon={LayoutDashboard}
                  title={"15"}
                  description="Public"
                />
                <Card icon={LayoutGrid} title={"8"} description="Private" />
                <Card icon={Rss} title={"10"} description="Subscribed" />
                <Card
                  icon={CircleDollarSign}
                  small={"MK"}
                  title={"391020"}
                  description="Total Payments"
                />
              </div>

              {/* LIne Chart */}
              <div className="payment__container">
                <div className="top__divider">
                  <div className="cutter_container">

                  <h2>Subsciption Payments</h2>
                  <p>The line graph shows the total amount of payments that have been made for the whole year</p>
                  </div>
                  <YearOptions />
                </div>
                <PaymentChart />
              </div>
              {/* LIne Chart */}
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default SuperDashboard;
