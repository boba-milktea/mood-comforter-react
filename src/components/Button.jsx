import React from "react";

const Button = ({ style, handleClick, children }) => {
  return (
    <button className={style} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
