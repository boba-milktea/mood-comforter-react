import React from "react";

const MessageDisplay = ({ children }) => {
  return (
    <div className="message">
      <p>{!children ? "How're you feeling today?" : children}</p>
    </div>
  );
};

export default MessageDisplay;
