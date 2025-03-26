import React from "react";
import FormButton from "../../../components/input/formButton";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FormButton 
          label={'Close'}
          id={'closeBtn'}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;