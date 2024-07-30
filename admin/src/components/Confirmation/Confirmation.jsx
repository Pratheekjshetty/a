import React from 'react';

const Confirmation = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg text-center">
        <p>{message}</p>
        <div className="mt-4">
          <button
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onConfirm}
          >
            Ok
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
