import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { AddToCart } from "../Buttons/Buttons";

import "./ProductBox.css";

export const ProductBox = (props) => {
    return (
        <div className="product_box">
            {props.sale ? <div className="status sale">Sale</div> : ""}
            {props.new ? <div className="status new">New</div> : ""}
            <Link href={props.link}>
                <div className="img">
                    <img src={props.img} alt="" />
                </div>
            </Link>
            <div className="title">{props.title}</div>
            <div className="flex">
                <div className="price blue" style={{ fontWeight: "bold" }}>
                    {props.price.toFixed(2)} ლარი
                </div>
                <AddToCart onClick={() => props.handleClick(props.product)} />
            </div>
        </div>
    );
};
