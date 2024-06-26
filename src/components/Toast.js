import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast">
      {message}
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
