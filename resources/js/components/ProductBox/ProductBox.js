import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { AddToCart } from "../Buttons/Buttons";

import "./ProductBox.css";

export const ProductBox = (props,handleClick,product) => {
  return (
    <Link href={props.link}>
      <div className="product_box">
        {props.special_price !== null ? <div className="status sale">Sale</div> : ""}
        {props.new ? <div className="status new">New</div> : ""}
        <div className="img">
          <img src={props.img} alt="" />
        </div>
        <div className="title">{props.title}</div>
        <div className="flex">
          <div className="price blue" style={{ fontWeight: "bold" }}>
            {props.special_price !== null ? props.special_price.toFixed(2) : props.price.toFixed(2)} ლარი
          </div>
          <AddToCart />
        </div>
      </div>
    </Link>
  );
};
