import React, { useState } from "react";
import Filters from "../../components/Filters/Filters";
import makeAnimated from "react-select/animated";
import "./Products.css";
import { ProductBox } from "../../components/ProductBox/ProductBox";
import { Arrow } from "../../components/SmallComps/Icons";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

let links = function (links) {
    let rows = [];
    //links.shift();
    //links.splice(-1);
    {
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rows.push(
                    <Link
                        href={item.url}
                        className={item.active ? "num active" : "num"}
                    >
                        {item.label}
                    </Link>
                );
            }
        });
    }
    return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
};

let linksPrev = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[0].url}>
            <Arrow color="#2F3E51" rotate="90" />
            <Arrow color="#2F3E51" rotate="90" />
        </Link>
    ) : null;
};
let linksNext = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[links.length - 1].url}>
            <Arrow color="#2F3E51" rotate="-90" />
            <Arrow color="#2F3E51" rotate="-90" />
        </Link>
    ) : null;
};

const addToCart = function (product) {
    //localStorage.removeItem('cart')
    let _cart = localStorage.getItem("cart");
    let cart;
    if (_cart !== null) {
        cart = JSON.parse(_cart);
    } else cart = [];

    let qty = 1;

    if (cart.length > 0) {
        let exists = false;
        cart.forEach(function (el, i) {
            if (el.product.id === product.id) {
                el.qty += qty;
                exists = true;
            }
        });
        if (!exists) {
            let obj = {
                product: product,
                qty: qty,
            };
            cart.push(obj);
        }
    } else {
        let obj = {
            product: product,
            qty: qty,
        };
        cart.push(obj);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
    //localStorage.removeItem('cart')
    Inertia.visit(window.location.href)
};

const Products = ({ page, seo }) => {

    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });


    const sharedData = usePage().props.localizations;
    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };
    const animatedComponents = makeAnimated();

    const { products, category, images } = usePage().props;

    console.log(products);
    console.log(category);

    const sort = function (data) {


        appliedFilters["sort"] = data.sort;
        appliedFilters["order"] = data.order;

        console.log(appliedFilters);
        let params = [];

        for (let key in appliedFilters) {
            if (Array.isArray(appliedFilters[key])) {
                params.push(key + "=" + appliedFilters[key].join(","));
            } else {
                params.push(key + "=" + appliedFilters[key]);
            }
        }

        Inertia.visit("?" + params.join("&"));
    };
    const selectOptions = [
        {
            label: "newest",
            sort: "created_at",
            order: "desc",
        },
        {
            label: "oldest",
            sort: "created_at",
            order: "asc",
        },
        {
            label: "cheaper",
            sort: "price",
            order: "asc",
        },
        {
            label: "expensive",
            sort: "price",
            order: "desc",
        },
        {
            label: "a-z",
            sort: "title",
            order: "asc",
        },
        {
            label: "z-a",
            sort: "title",
            order: "desc",
        },
    ];

    let index = 0;

    if(appliedFilters.hasOwnProperty('sort')){
        selectOptions.forEach(function (el,i){
            if(el.sort === appliedFilters['sort'][0] && el.order === appliedFilters['order'][0]){
                index = i;
            }
        })
    }


    const [selected, setSelected] = useState(index);


    const handleOption = (index) => {
        sort({
            sort: selectOptions[index].sort,
            order: selectOptions[index].order,
        });

        setSelected(index);
    };

    return (
        <Layout seo={seo}>
            <div className="productsPage">
                <div className="wrapper flex main">
                    <div
                        className={
                            showFilter
                                ? "column filter_column show"
                                : "column filter_column"
                        }
                    >
                        <div className="headtitle">
                            {__("client.products_filter_title", sharedData)}
                        </div>

                        <Filters appliedFilters={appliedFilters} />
                    </div>
                    <div className="column pro_co">
                        <button
                            className="filter_btn"
                            onClick={() => toggleFilter()}
                        >
                            <img src="/img/icons/other/filter.png" alt="" />
                        </button>
                        <div className="flex headflex">
                            <div className="headtitle">
                                {category !== null ? category.title : null}
                            </div>
                            <div className="select_dropdown">
                                <div className="selected">
                                    {selectOptions[selected].label}
                                </div>
                                <div className="options">
                                    {selectOptions.map((opt, index) => {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    handleOption(index)
                                                }
                                            >
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="product_grid">
                            {products.data.map((data, index) => {
                                return (
                                    <ProductBox
                                        key={index}
                                        link={route(
                                            "client.product.show",
                                            data.slug
                                        )}
                                        img={
                                            data.latest_image != null
                                                ? "/" +
                                                  data.latest_image.path +
                                                  "/" +
                                                  data.latest_image.title
                                                : null
                                        }
                                        title={data.title}
                                        price={
                                            data.special_price !== null
                                                ? data.special_price
                                                : data.price
                                        }
                                        sale={
                                            data.special_price !== null
                                                ? true
                                                : false
                                        }
                                        new={data.new}
                                        product={data}
                                        handleClick={() => addToCart(data)}
                                    />
                                );
                            })}
                        </div>
                        <div className="pagination flex centered">
                            {linksPrev(products.links)}
                            {links(products.links)}
                            {linksNext(products.links)}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
