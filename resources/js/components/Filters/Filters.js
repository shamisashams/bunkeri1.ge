import React from "react";
import "./Filters.css";
import DoubleRangeSlider from "../PriceRange/PriceRange";

const Filters = () => {
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
      <div className="section">
        <div className="head">ქვეკატეგორია</div>
        {categories.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <input type="checkbox" id={`category-${index}`} />
              <label htmlFor={`category-${index}`}>{item}</label>
            </div>
          );
        })}
      </div>
      <div className="section">
        <div className="head">ბრენდი</div>
        {brands.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <input type="checkbox" id={`brand-${index}`} />
              <label htmlFor={`brand-${index}`}>{item}</label>
            </div>
          );
        })}
      </div>
      <div className="section">
        <div className="head">ზომები</div>
        {sizes.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <input type="checkbox" id={`size-${index}`} />
              <label htmlFor={`size-${index}`}>{item}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
