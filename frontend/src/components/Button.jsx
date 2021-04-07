import React from "react";

const Button = ({ color }) => {
  return (
    <button style={{ backgroundColor: color }} className="btn">
      Add
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
};

export default Button;
