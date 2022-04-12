import React from "react";
import { Fb, Ig } from "./Icons";
import {usePage} from "@inertiajs/inertia-react";

export const SocialMedia = ({ color }) => {
    const {info} = usePage().props;
  return (
    <div className="flex sm">
        {info.active.facebook === 1 ? <a href={info.facebook} style={{ marginRight: "30px" }}>
        <Fb color={color} />
      </a> : null}
        {info.active.instagram === 1 ? <a href={info.instagram}>
        <Ig color={color} />
      </a> : null}
    </div>
  );
};
