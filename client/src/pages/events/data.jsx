import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Edit, Trash } from "lucide-react";
import { Icon } from "semantic-ui-react";
import FormButton from "../../components/input/formButton";
import Form from "./form";
import "./event.css";
import { useDispatch } from 'react-redux';
import api from "../../services/apiServices";
import { setEventFormData, setIsEditMode, setEditItemId } from "../../helpers/examination/examSlice";
import toast from "react-hot-toast";

const EventPage = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const res = await api.getEvent();
    const data = res.data.event;
    setEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditEvent = async(id) => {
    setShow(true);
    const res = await api.editEvent(id);
    dispatch(setEventFormData({
      title: res.data.edit.title || '',
      date: res.data.edit.date || '',
      time: res.data.edit.time || '',
      location: res.data.edit.location || '',
      description: res.data.edit.description || '',
    }));
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id || ''));
  };
  
    //   Handle Delete
    const handleDeleteEvent = async (id) => {
      try {
          const res = await api.deleteEvent(id);
          if (res.data.success === true) {
              fetchData();
              toast.success(res.data.message);
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
          toast.error('An error occurred. Please try again.');
      }
    };

  return (
    <>
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="div" style={{ display: show ? "none" : "block" }}>
        <button type="button" onClick={handleOpen} class="add__rows__btn">
          <Icon name="plus" className="plus" />
          Add
        </button>
        <h1 className="text-xl mt-4 text-gray-600 xoolinfo">Upcoming Events</h1>
        <p>
          This section helps you add, edit and delete events. <br /> Those with
          a <strong>New</strong> tag means their date hasn't passed yet, and
          those without means they already happened.
        </p>
      </div>
      <div className="toggleDiv" style={{ display: show ? "block" : "none" }}>
        <Form fetchData={fetchData} />
        <FormButton label={"Close"} id={"closeBtn"} onClick={handleClose} />
      </div>

      {/* Event List */}
      <div className="event-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg p-8 relative"
              style={{
                backgroundColor: "#E8ECEF",
                border: "2px solid #CDCCCC",
              }}
            >
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="circle3"></div>
              <div className="circle4"></div>
              <div className="circle5"></div>
              <div className="circle6"></div>
              <div className="divider flex justify-between items-center">
                <h3
                  className="text-lg font-semibold text-gray-600 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {event.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEvent(event.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default EventPage;
