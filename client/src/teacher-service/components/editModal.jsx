import React, { useState } from "react";
import {
  setEditItemId,
  setScoreFormData,
} from "../../helpers/examination/examSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/input/formInput.jsx";
import FormButton from "../../components/input/formButton.jsx";
import { InfinitySpin } from "react-loader-spinner";
import api from "../../services/apiServices";
import toast from "react-hot-toast";
import { FilePenLine } from "lucide-react";

function EditModal({ open, setOpen, classID }) {
  const dispatch = useDispatch();
  const editItemId = useSelector((state) => state.exam.editItemId);
  const scoreFormData = useSelector((state) => state.exam.scoreFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.updateScore(editItemId, { classID, data });
      if (res.data.success === true) {
        toast.success(res.data.message);
        setOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    dispatch(
      setScoreFormData({
        score: "",
      })
    );
    dispatch(setEditItemId(null));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setScoreFormData({
        ...scoreFormData,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(scoreFormData);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setOpen(false)}></div>
      <div className="bg-white rounded-lg shadow-lg w-1/3 z-50">
        <div className="flex flex-col items-center justify-center p-4">
          <FilePenLine size={50} />
          <h2 className="text-2xl font-bold text-gray-800">Update Score</h2>
        </div>
        <div className="p-4">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="mb-4">
              <FormInput
                label={"Score"}
                type={"text"}
                name="score"
                value={scoreFormData.score}
                onChange={handleChange}
                placeholder={"Type here..."}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <FormButton
              label={loading ? "Processing.." : "Update Score"}
              id="rowButton"
              className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
            />
          </form>
          {loading && (
            <div className="flex justify-center mt-4">
              <InfinitySpin width="200" color="#007BFE" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditModal;
