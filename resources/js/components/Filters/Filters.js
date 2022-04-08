import React from "react";
import "./Filters.css";
import DoubleRangeSlider from "../PriceRange/PriceRange";
import {usePage} from "@inertiajs/inertia-react";

let options = function (code,options){
    let rows = [];
    options.map((item, index) => {
        rows.push(
            <div className="flex" key={index}>
                <input type="checkbox" id={`${code}-${index}`} />
                <label htmlFor={`${code}-${index}`}>{item.label}</label>
            </div>
        );
    })
    return rows;
}

const Filters = () => {
    const { filter } = usePage().props;

    console.log(filter);
  const categories = [
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
  ];
  const brands = [
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
    "დასახელება",
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  return (
    <div className="product_filter">
      <div className="section">
        <button className=" op05 flex clear">
          <img src="/img/icons/other/delete.svg" alt="" />
          <span>გასუფთავება</span>
        </button>
      </div>
      <div className="section">
        <div className="head">ფასი</div>
        {/* Price Range */}
        <DoubleRangeSlider />
      </div>

        {filter.attributes.map((item, index) => {
            return (
                <div className="section">
                    <div className="head">{item.name}</div>
                        {options(item.code,item.options)}
                </div>
                )
        })}

    </div>
  );
};

export default Filters;
