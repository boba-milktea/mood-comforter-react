import React from "react";

const MoodSelector = ({ children }) => {
  return (
    <>
      <legend>Tell me about your feeling</legend>
      <fieldset className="checkbox-field">{children}</fieldset>
    </>
  );
};

export default MoodSelector;
