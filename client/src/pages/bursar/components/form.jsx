import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";
import FormInput from "../../../components/input/formInput.jsx";
import FormButton from "../../../components/input/formButton.jsx";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsEditMode,
  setEditItemId,
  setPayFormData,
} from "../../../helpers/examination/examSlice.jsx";
import FeesSelectInput from "../../students/components/feesSelect.jsx";
import TermSelector from "../../students/components/termSelector.jsx";
import AutoSuggestInput from "./AutoSuggestInput.jsx";

const PfForm = ({ fetchData, setIsModalOpen }) => {
  const payFormData = useSelector((state) => state.exam.payFormData);
  const dispatch = useDispatch();
  const isEditMode = useSelector((state) => state.exam.isEditMode);
  const editItemId = useSelector((state) => state.exam.editItemId);
  const [feeid, setSelectedId] = useState(null);
  const [feeamount, setSelectedAmount] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students from the API
    const fetchStudents = async () => {
      try {
        const response = await api.gettStudent();
        setStudents(response.data.student);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleFeeChange = (data) => {
    setSelectedId(data.id);
    setSelectedAmount(data.amount);
    // Process the selected ID and amount here
  };

  const handleSubmit = async (data) => {
    if (isEditMode) {
    const res = await api.updatePay(editItemId, { amount: feeamount, data });
      if (res.data.success === true) {
        fetchData();
        toast.success(res.data.message);
        dispatch(setIsEditMode(false));
        dispatch(setEditItemId(null));
      } else {
        toast.error(res.data.message);
      }
    } else {
      try {
        const res = await api.addPay({ feeamount, feeid, data });
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
      setPayFormData({
        paid: "",
        term: "",
        studentID: "",
      })
    );
    dispatch(setIsEditMode(false));
    dispatch(setEditItemId(null));
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPayFormData({
        ...payFormData,
        [name]: value,
      })
    );
  };

  const handleSuggestionSelected = (suggestion) => {
    dispatch(
      setPayFormData({
        ...payFormData,
        studentID: suggestion.id, // Store the student ID
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(payFormData);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="formGroup">
        <AutoSuggestInput
          suggestions={students}
          onSuggestionSelected={handleSuggestionSelected}
          onChange={handleChange}
          name="student"
          placeholder="Type student name here..."
        />
      </div>
      <div className="formGroup mt-4">
        <FeesSelectInput
          label={"Fee category"}
          value={feeid}
          onChange={handleFeeChange}
        />
        <FormInput
          label={"Amount"}
          type={"text"}
          name="paid"
          value={payFormData.paid}
          onChange={handleChange}
          placeholder={"Type here..."}
        />
      </div>
      <div className="formGroup mt-4">
        <TermSelector
          label={"Term"}
          onChange={handleChange}
          name="term"
          value={payFormData.term}
        />
      </div>
      <FormButton label={isEditMode ? "Update Pay" : "Pay"} id="tyepButton" />
    </form>
  );
};

export default PfForm;
