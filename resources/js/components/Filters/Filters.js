import React from "react";
import "./Filters.css";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import RangeSlider from "../PriceRange/PriceRange";

const Filters = ({appliedFilters}) => {
    const { filter } = usePage().props;
    const { category } = usePage().props;
    const sharedData = usePage().props.localizations;


    console.log(filter);

    let options = function (code, options) {
        let rows = [];
        let checked;

        console.log(appliedFilters);
        options.map((item, index) => {
            if (appliedFilters.hasOwnProperty(code)) {
                if (appliedFilters[code].includes(item.id.toString())) {
                    checked = true;
                } else checked = false;
            } else checked = false;
            console.log(item.id);
            rows.push(
                <div className="flex" key={index}>
                    <input
                        className="filter_ckbox"
                        onClick={(event) => {
                            handleFilterClick(event, code, item.id);
                        }}
                        name={code}
                        type="checkbox"
                        id={`${code}-${index}`}
                        value={item.id}
                        checked={checked}
                    />
                    <label htmlFor={`${code}-${index}`}>{item.label}</label>
                </div>
            );
        });
        return rows;
    };

    function removeA(arr) {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    const handleFilterClick = function (event, code, value) {
        console.log(code);
        console.log(value);
        //Inertia.visit('?brand=12');

        if (event.target.checked === true) {
            if (appliedFilters.hasOwnProperty(code)) {
                appliedFilters[code].push(value);
            } else appliedFilters[code] = [value];
        } else {
            if (appliedFilters[code].length > 1)
                removeA(appliedFilters[code], value.toString());
            else delete appliedFilters[code];
        }

        console.log(appliedFilters);
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    const clearFilter = function () {
        appliedFilters = [];
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

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
                <button onClick={clearFilter} className=" op05 flex clear">
                    <img src="/img/icons/other/delete.svg" alt="" />
                    <span>
                        {__("client.products_filter_clear", sharedData)}
                    </span>
                </button>
            </div>
            <div className="section">
                <div className="head">
                    {__("client.products_filter_price", sharedData)}
                </div>
                {/* Price Range */}
                <RangeSlider appliedFilters={appliedFilters} />
            </div>

            {filter.attributes.map((item, index) => {
                let checked;
                if (appliedFilters.hasOwnProperty(item.code)) {
                    if (
                        appliedFilters[item.code].includes(item.id.toString())
                    ) {
                        checked = true;
                    } else checked = false;
                } else checked = false;
                return (
                    <div className="section">
                        <div className="head">{item.name}</div>
                        {item.type !== "boolean" ? (
                            options(item.code, item.options)
                        ) : (
                            <input
                                style={{ display: "block" }}
                                className="filter_ckbox"
                                onClick={(event) => {
                                    handleFilterClick(
                                        event,
                                        item.code,
                                        item.id
                                    );
                                }}
                                name={item.code}
                                type="checkbox"
                                id={`${item.code}`}
                                value="1"
                                checked={checked}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Filters;
