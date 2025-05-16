import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative min-w-300 max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={30} />
        </button>
        {title && (
          <h2 className="mb-4 mt-2 text-xl font-semibold text-gray-800">
            {title}
          </h2>
        )}
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
