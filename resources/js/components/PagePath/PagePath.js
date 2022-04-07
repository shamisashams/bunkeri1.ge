import React from "react";
import "./PagePath.css";

export const PagePath = ({ previous, current, first }) => {
  return (
    <div className="pagepath">
      <div className="wrapper">
        <p>
          {previous}
        </p>
      </div>
    </div>
  );
};
