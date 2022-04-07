import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { AddToCart } from "../Buttons/Buttons";

import "./ProductBox.css";

export const ProductBox = (props) => {
  return (
    <Link href={props.link}>
      <div className="product_box">
        {props.sale ? <div className="status sale">Sale</div> : ""}
        {props.new ? <div className="status new">New</div> : ""}
        <div className="img">
          <img src={props.img} alt="" />
        </div>
        <div className="title">{props.title}</div>
        <div className="flex">
          <div className="price blue" style={{ fontWeight: "bold" }}>
            {props.price} ლარი
          </div>
          <AddToCart productId={props.id} />
        </div>
      </div>
    </Link>
  );
};
