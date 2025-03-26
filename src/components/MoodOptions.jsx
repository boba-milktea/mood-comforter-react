import React from "react";
import { data } from "../data/data";

const MoodOptions = ({ checkedMoods, handleChange }) => {
  const checkboxOptions = data.checkbox.map((mood) => {
    return (
      <div className="checkbox" key={mood.id}>
        <input
          type="checkbox"
          name={mood.label}
          id={mood.id}
          checked={checkedMoods.includes(mood.id)}
          onChange={(e) => handleChange(e)}
        />
        <label key={mood.id} htmlFor={mood.label}>
          {mood.label.charAt(0).toUpperCase() + mood.label.slice(1)}
        </label>
      </div>
    );
  });

  return <>{checkboxOptions}</>;
};

export default MoodOptions;
