import React, { useState } from 'react';
import api from "../../../services/apiServices";
import toast from "react-hot-toast";
import FormButton from '../../../components/input/formButton';
import { CircleArrowOutUpLeft } from 'lucide-react'

const Modal = ({ reportData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        if (!reportData) {
            toast.error("No report data available.");
            return;
        }

        try {
            const res = await api.deleteReport({ data: reportData });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <div>
            <FormButton
              label={"Delete"}
              id="dangerButton"
              onClick={toggleModal}
            />

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    aria-hidden="true"
                    onClick={toggleModal} // Close modal when clicking outside
                >
                    <div
                        className="bg-white rounded-lg p-6 w-1/3"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <h2 className="text-lg font-bold flex items-center" style={{fontFamily: "'Poppins', sans-serif", color: "red"}}>
                            <CircleArrowOutUpLeft size={24} className="mr-4" />
                            Delete Report
                        </h2>
                        <div className="mt-4">
                            <p>
                                Are you sure you want to delete this data? <br /> This action is irreversible.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;