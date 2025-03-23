import { useState } from "react";
import Navbar from "./navbar";
import FinancialChart from "./financialchart";
import Notifications from "./notifications";
import Tabs from "./tabs";
import Transactions from "./transactions";
import FeePayments from "./payments";
import OverviewSection from "../../fees/dashboard/components/OverviewSection";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-xl font-bold">{selectedTab}</h1>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === "Overview" && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <OverviewSection />
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <FinancialChart />
                </div>
                <div>
                  <Notifications />
                </div>
              </div>
            </div>
          )}
          {selectedTab === "Transactions" && <Transactions />}
          {selectedTab === "Fee Payments" && <FeePayments />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
