import React from "react";
import "./Filters.css";
import DoubleRangeSlider from "../PriceRange/PriceRange";
import {usePage} from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia'





const Filters = () => {
    const { filter } = usePage().props;
    const { category } = usePage().props;
    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(',');
    });

    console.log(appliedFilters)


    let filt_ckbox = document.querySelectorAll('.filter_ckbox');
    //console.log(el.name)
    filt_ckbox.forEach(function (el){
        if(appliedFilters.hasOwnProperty(el.name)){
            if(appliedFilters[el.name].includes(el.value)){
                el.checked = true
            } else el.checked = false
        } else el.checked = false
    })




    let options = function (code,options){
        let rows = [];

        options.map((item, index) => {

            rows.push(
                <div className="flex" key={index}>
                    <input className="filter_ckbox" onClick={(event) => {
                        handleFilterClick(event,code,item.id)
                    }} name={ code } type="checkbox" id={`${code}-${index}`} value={item.id} />
                    <label htmlFor={`${code}-${index}`}>{item.label}</label>
                </div>
            );
        })
        return rows;
    }

    const handleFilterClick = function (event,code,value){
        console.log(code);
        console.log(value);
        //Inertia.visit('?brand=12');
        let appliedFilters = [];
        let urlParams = new URLSearchParams(window.location.search);

        urlParams.forEach((value, index) => {
            appliedFilters[index] = value.split(',');
        });
        if (appliedFilters.hasOwnProperty(code)){
            appliedFilters[code].push(value);
        } else appliedFilters[code] = [value];

        console.log(appliedFilters)
        let params = [];

        for(let key in appliedFilters) {
            params.push(key + '=' + appliedFilters[key].join(','))
        }

        Inertia.visit("?" + params.join('&'));


    }

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
        <DoubleRangeSlider price={filter.price} />
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
