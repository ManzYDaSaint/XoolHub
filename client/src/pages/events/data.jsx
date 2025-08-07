import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Edit, Trash, Plus } from "lucide-react";
import FormButton from "../../components/input/formButton";
import Form from "./form";
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
    console.log(data);
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
    <div className="px-6 py-4">
    <div className="p-4 border-2 border-gray-300 rounded-lg">
      <div className="div" style={{ display: show ? "none" : "block" }}>
        <button type="button" onClick={handleOpen} className="bg-gradient-to-r from-blue-700 via-gray-500 to-green-600 text-white hover:bg-gradient-to-br transition duration-300 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3">
          <Plus size={15} className="plus" />
          Add Event
        </button>
      </div>
      <div className="toggleDiv" style={{ display: show ? "block" : "none" }}>
        <Form fetchData={fetchData} />
        <FormButton label={"Close"} id={"closeBtn"} onClick={handleClose} />
      </div>

      {/* Event List */}
      <div className="border-2 border-gray-300 rounded-lg p-4 mt-6">
        <h5 className="text-gray-700 text-md font-medium p-2 border-b-2 border-gray-300 mb-4">All active events are listed below, <br /> Feel free to edit or delete these active events</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg p-4 relative"
              style={{
                backgroundColor: "#E8ECEF",
                border: "2px solid #CDCCCC",
              }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white"></div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white"></div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-white"></div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-white"></div>
              <div className="absolute top-[4.4rem] -left-4 w-8 h-8 rounded-full bg-white"></div>
              <div className="absolute top-[4.4rem] -right-4 w-8 h-8 rounded-full bg-white"></div>
              <div className="border-b-2 border-gray-300 mb-2 flex justify-between items-center">
                <h3
                  className="text-md font-semibold text-gray-600 mb-2"
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
    </div>
  );
};

export default EventPage;
