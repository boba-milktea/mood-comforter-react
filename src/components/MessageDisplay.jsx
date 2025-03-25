import React from "react";

const MessageDisplay = ({ children }) => {
  return (
    <div className="message">
      {!children ? "How're you feeling today?" : children}
    </div>
  );
};

export default MessageDisplay;
