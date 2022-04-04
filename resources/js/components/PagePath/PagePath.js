import React from "react";
import "./PagePath.css";

export const PagePath = ({ previous, current, first }) => {
  return (
    <div className="pagepath">
      <div className="wrapper">
        <p>
          {first} {previous} / {current}
        </p>
      </div>
    </div>
  );
};
