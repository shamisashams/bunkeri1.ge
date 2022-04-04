import React from "react";
import { Fb, Ig } from "./Icons";

export const SocialMedia = ({ color }) => {
  return (
    <div className="flex sm">
      <a href="/" style={{ marginRight: "30px" }}>
        <Fb color={color} />
      </a>
      <a href="/">
        <Ig color={color} />
      </a>
    </div>
  );
};
