/*************  ✨ Codeium Command ⭐  *************/
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../../services/apiServices";
import TopNav from "../../components/topnav";
import ParentNavBar from "../../components/navbar";

const localizer = momentLocalizer(moment);

const ParentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/events");
      const events = response.data;
      const formattedEvents = events.map((event) => {
        return {
          title: event.name,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
        };
      });
      setEvents(formattedEvents);
    };
    fetchEvents();
  }, []);

  return (
    <div className="parent_container">
      <div className="parent_content">
    <div className="parent_events">
        <TopNav />
      <h1>Term Events</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
      />
      <ParentNavBar />
    </div>
    </div>
    </div>
  );
};

export default ParentEvents;