import React from "react";
import "./Button.scss";

const Button = ({ name, clickHandler }) => {
  return (
    <div className="btn-wrap">
      <button className={name} onClick={clickHandler}>
        {name === "merge" ? "merge selected" : "export all"}
      </button>
    </div>
  );
};

export default Button;
