import React from "react";
import EventPage from "../events/data.jsx";
import Layout from "../../components/layout.jsx";
import Navbar from "../../components/input/top.jsx";

const Events = () => {
  return (
    <>
      <Layout>
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="flex h-16 items-center gap-4 px-6">
            <div className="flex items-center justify-between w-full">
              <div className="ml-16 border-l-2 border-blue-600 pl-6">
                <h1 className="text-lg bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent font-semibold">
                  Events Management
                </h1>
              </div>
              <Navbar />
            </div>
          </div>
        </header>
      </Layout>

      {/* Main Content */}
      <EventPage />
    </>
  );
};

export default Events;
