import React from "react";
import api from "../../services/apiServices";
import toast from "react-hot-toast";

function DeleteModal({ modal, setModal, filterData }) {
  const handleDelete = async (data) => {
    try {
      const res = await api.deleteResult({ data });
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setModal(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${modal ? 'block' : 'hidden'}`}
      onClose={() => setModal(false)}
      onOpen={() => setModal(true)}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <h2 className="text-lg font-bold ml-2">Delete Report</h2>
        </div>
        <div className="mb-4">
          <p>
            Are you sure you want to delete this data? <br /> This action is
            irreversible.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => setModal(false)}>
            No
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(filterData)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
