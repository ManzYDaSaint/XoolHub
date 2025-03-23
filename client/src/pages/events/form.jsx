import React from "react";
import api from "../../services/apiServices.jsx";
import FormInput from "../../components/input/formInput.jsx";
import FormButton from "../../components/input/formButton.jsx";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsEditMode,
  setEditItemId,
  setEventFormData,
} from "../../helpers/examination/examSlice.jsx";

const Form = ({ fetchData }) => {
  const eventFormData = useSelector((state) => state.exam.eventFormData);
  const dispatch = useDispatch();
  const isEditMode = useSelector((state) => state.exam.isEditMode);
  const editItemId = useSelector((state) => state.exam.editItemId);

  // Handle submit
  const handleSubmit = async (data) => {
    if (isEditMode) {
      const res = await api.updateEvent(editItemId, data);
      if (res.data.success === true) {
        fetchData();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      dispatch(setIsEditMode(false));
      dispatch(setEditItemId(null));
    } else {
      try {
        const res = await api.addEvent({ data });
        if (res.data.success === true) {
          fetchData();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
    dispatch(
      setEventFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      })
    );
    dispatch(setIsEditMode(false));
    dispatch(setEditItemId(null));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setEventFormData({
        ...eventFormData,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(eventFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <FormInput
            label={"Event Title"}
            type={"text"}
            name="title"
            value={eventFormData.title}
            onChange={handleChange}
            placeholder={"Type event title"}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <FormInput
            label={"Event Date"}
            type={"date"}
            name="date"
            value={eventFormData.date}
            onChange={handleChange}
            placeholder={"Type event date"}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <FormInput
            label={"Event Time"}
            type={"text"}
            name="time"
            value={eventFormData.time}
            onChange={handleChange}
            placeholder={"Type event time (e.g. 10:00 AM - 2:45 PM)"}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormInput
            label={"Event Location"}
            type={"text"}
            name="location"
            value={eventFormData.location}
            onChange={handleChange}
            placeholder={"Type event location"}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <FormInput
            label={"Event Description"}
            type={"text"}
            name="description"
            value={eventFormData.description}
            onChange={handleChange}
            placeholder={"Type event description"}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <FormButton
        label={isEditMode ? "Update Upcoming Event" : "Add Upcoming Event"}
        id="tyepButton"
      />
    </form>
  );
};

export default Form;
