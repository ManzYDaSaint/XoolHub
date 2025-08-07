import React, { useState } from "react";
import Navbar from "../../components/input/top";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Data from "./add/data";
import { Toaster } from "react-hot-toast";
import AssignData from "./assign/data";
import ClassTData from "./classTeacher/data";
import Tabs from "../../components/tabs";

const Config = () => {
  const [selectedTab, setSelectedTab] = useState("Add");
  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Toaster />
              <Link to={"/teachers"}>
                <p className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600">
                  <ChevronLeft className="h-5 w-5 md:h-5 md:w-5" /> Back
                </p>
              </Link>
              <div className="ml-8 border-l-2 border-blue-600 pl-6">
                <h1 className="text-lg bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent font-semibold">
                  Teacher Configuration
                </h1>
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="p-4 border-2 border-gray-300 rounded-lg">
          <h1 className="text-xl text-gray-600 font-semibold">{selectedTab}</h1>
          <Tabs
            tabs={["Add", "Assign", "Class"]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === "Add" && (
            <div className="p-6 border-2 border-gray-300 rounded-lg w-full">
              <Data />
            </div>
          )}
          {selectedTab === "Assign" && (
            <div className="p-6 border-2 border-gray-300 rounded-lg w-full">
              <AssignData />
            </div>
          )}
          {selectedTab === "Class" && (
            <div className="p-6 border-2 border-gray-300 rounded-lg w-full">
              <ClassTData />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Config;
