import React, { useState, useEffect } from "react";
import SuperSidebar from "../../components/navbar/navbar";
import SuperAuth0 from "../../../hooks/superauth";
import Card from "../../../pages/students/dashboard/components/card";
import {
  LayoutGrid,
  School,
  LayoutDashboard,
  Rss,
  CircleDollarSign,
  Bot,
} from "lucide-react";
import PaymentChart from "./components/payments";
import YearOptions from "./components/yearSelector";
import ParentBotDashboard from "./components/ParentBotDashboard";
import api from "../../../services/apiServices";

const SuperDashboard = () => {
  const [count, setCount] = useState(0);
  const [publico, setPublic] = useState(0); 
  const [privato, setPrivate] = useState(0);
  const [subscribe, setSubscribe] = useState(0);
  const [sum, setSum] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

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

  const fetchPrivate = async () => {
    try {
      const res = await api.countPrivateXuls();
      const data = res.data.count;
      setPrivate(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchPrivate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPublic = async () => {
    try {
      const res = await api.countPublicXuls();
      const data = res.data.count;
      setPublic(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchPublic();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSubscribe = async () => {
    try {
      const res = await api.countSubscribed();
      const data = res.data.count;
      setSubscribe(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchSubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSum = async () => {
    try {
      const res = await api.sumAmount();
      const data = res.data.sum;
      setSum(data.sum);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchSum();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <div className="settingContainer">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8 px-6 pt-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4 inline mr-2" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('parent-bot')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'parent-bot'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Bot className="h-4 w-4 inline mr-2" />
                    parent Bot Analytics
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-5 gap-4 py-6 px-4">
                    <Card icon={School} title={count} description="Schools" />
                    <Card
                      icon={LayoutDashboard}
                      title={publico}
                      description="public"
                    />
                    <Card icon={LayoutGrid} title={privato} description="private" />
                    <Card icon={Rss} title={subscribe} description="Subscribed" />
                    <Card
                      icon={CircleDollarSign}
                      small={"MK"}
                      title={sum}
                      description="Total Payments"
                    />
                  </div>

                  {/* Line Chart */}
                  <div className="p-6">
                    <div className="border-2 border-gray-300 rounded-lg shadow-lg p-6 mb-6">
                      <div className="mb-4 ">
                        <h2 className="text-md font-semibold mb-4 text-gray-700 border-b-2 border-gray-300 pb-3">
                          Subscription Payments
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                          The line graph shows the total amount of payments that
                          have been made for the whole year
                        </p>
                      </div>
                      <div className="border-2 border-gray-300 rounded-lg shadow-lg p-6 mb-6">
                        <YearOptions />
                        <PaymentChart />
                      </div>
                    </div>
                  </div>
                  {/* Line Chart */}
                </>
              )}

              {activeTab === 'parent-bot' && (
                <div className="p-6">
                  <ParentBotDashboard />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default SuperDashboard;
