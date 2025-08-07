import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import EntryForm from "../../../teacher-service/form/entryForm";
import FilterForm from "../../../teacher-service/form/filterForm";
import Tabs from "../../../components/tabs";

function Entry() {
    const [selectedTab, setSelectedTab] = useState("Entry");

  return (
    <div className="flex bg-gray-100 pb-3">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="ml-16">
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Examination Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage examinations by entering and filtering.
            </p>
          </div>
        </div>

        {/* Content */}
        <main className="p-6">
          <h1 className="text-xl font-bold">{selectedTab}</h1>
          <Tabs tabs={['Entry', 'Filter']} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === "Entry" && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <EntryForm />
            </div>
          )}
          {selectedTab === "Filter" && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <FilterForm />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Entry;
