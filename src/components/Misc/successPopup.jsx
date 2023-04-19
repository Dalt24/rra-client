import React from "react";
import "./classes.css";

function CustomAlertMessage({ message, type, onClose }) {
  const alertType = type || "info";

  return (
    <div className={`custom-alert custom-alert-${alertType}`}>
      <div className="custom-alert-content">
        <span className="custom-alert-message">{message}</span>
      </div>
    </div>
  );
}

export default CustomAlertMessage;
