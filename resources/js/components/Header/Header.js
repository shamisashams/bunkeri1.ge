import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Pin } from "../SmallComps/Icons";
import { SocialMedia } from "../SmallComps/SocialMedia";
import "./Header.css";
import { Languages } from "../SmallComps/Languages";
import { CatButton } from "../Buttons/Buttons";
import Categories from "../Categories/Categories";
import { Inertia } from "@inertiajs/inertia";

const Header = () => {
    const [categoryDrop, setCategoryDrop] = useState(false);
    const toggleDrop = () => {
        setCategoryDrop(!categoryDrop);
    };

    const sharedData = usePage().props.localizations;
    const { info } = usePage().props;

    const getCart = function () {
        let cart = [];
        let _cart = localStorage.getItem("cart");
        if (_cart !== null) cart = JSON.parse(_cart);

        let total = 0;
        cart.forEach(function (el, i) {
            total +=
                el.qty *
                (el.product.special_price !== null
                    ? el.product.special_price
                    : el.product.price);
        });

        let obj = {
            items: cart,
            total: total,
        };
        return obj;
    };

    const removeCartItem = function (i) {
        let cart = [];
        let _cart = localStorage.getItem("cart");
        if (_cart !== null) cart = JSON.parse(_cart);
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        Inertia.visit(window.location.href);
    };

    const links = [
        {
            name: __("client.header_last_added", sharedData),
            link: route("client.category.new"),
        },
        {
            name: __("client.header_popular", sharedData),
            link: route("client.category.popular"),
        },
        {
            name: __("client.header_special", sharedData),
            link: route("client.category.special"),
        },
    ];
    const inCartProducts = [
        {
            link: "/",
            img: "/img/products/1.png",
            name: "პროდუქტის დასახელება",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/2.png",
            name: "პროდუქტის დასახელება",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/3.png",
            name: "პროდუქტის დასახელება",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/3.png",
            name: "პროდუქტის დასახელება",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/1.png",
            name: "პროდუქტის დასახელება",
            number: "1",
            price: "17.0",
        },
    ];
    const search = function () {
        let term = document.getElementById("search_inp").value;
        Inertia.get(route("search.index"), { term: term });
    };
    return (
        <div className="header">
            <div className="top">
                <div className="wrapper flex">
                    <Link className="logo " href={route("client.home.index")}>
                        <img src="/img/logo/1.svg" alt="" />
                    </Link>
                    <Link className="logo second" href="/">
                        <img src="/img/logo/2.svg" alt="" />
                    </Link>
                    <div className="search radius5">
                        <input
                            id="search_inp"
                            name="term"
                            type="text"
                            placeholder={__(
                                "client.header_search_placeholder",
                                sharedData
                            )}
                        />
                        <button onClick={search}>
                            <img src="/img/icons/header/search.svg" alt="" />
                        </button>
                    </div>
                    <div className="contact_info blue">
                        <Link className="archy-edt" href="/">
                            <Pin color="#303285" />
                            {info.address}
                        </Link>
                        <Link className="archy-edt" href="/">
                            {info.phone}
                        </Link>
                    </div>
                    <SocialMedia color="#303285" />
                </div>
            </div>
            <div className="bottom">
                <div className="wrapper flex">
                    <div className="flex">
                        <CatButton
                            onClick={() => toggleDrop()}
                            rotate={categoryDrop ? "180" : "0"}
                        />
                        {links.map((link, i) => {
                            return (
                                <Link
                                    className="links_3"
                                    key={i}
                                    href={link.link}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex">
                        <div className="shopping_cart">
                            <Link
                                className="  flex centered"
                                href="/shopping-cart"
                            >
                                {getCart().items.length > 0 ? (
                                    <div className="number_of_products">
                                        {getCart().items.length}
                                    </div>
                                ) : null}
                                <img src="/img/icons/header/cart.svg" alt="" />
                                <span className="archy-edt">
                                    {__("client.header_cart", sharedData)}
                                </span>
                            </Link>
                            {getCart().items.length > 0 ?
                            <div className="cart_drop">
                                <div className="incart_products">
                                    {getCart().items.map((item, index) => {
                                        return (
                                            <div className="flex" key={index}>
                                                <Link
                                                    href={route(
                                                        "client.product.show",
                                                        item.product.slug
                                                    )}
                                                >
                                                    <div className="img">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .latest_image !=
                                                                null
                                                                    ? "/" +
                                                                      item
                                                                          .product
                                                                          .latest_image
                                                                          .path +
                                                                      "/" +
                                                                      item
                                                                          .product
                                                                          .latest_image
                                                                          .title
                                                                    : null
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                </Link>

                                                <div>
                                                    <strong>
                                                        {item.product.title}
                                                    </strong>
                                                    <p>
                                                        {item.qty} x{" "}
                                                        {item.product
                                                            .special_price !==
                                                        null
                                                            ? item.product.special_price.toFixed(
                                                                  2
                                                              )
                                                            : item.product.price.toFixed(
                                                                  2
                                                              )}
                                                        ₾
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        removeCartItem(index);
                                                    }}
                                                    className="close"
                                                >
                                                    <img
                                                        src="/img/icons/other/close.svg"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex total">
                                    <strong>
                                        {__(
                                            "client.mini_cart_total",
                                            sharedData
                                        )}
                                    </strong>
                                    <strong>
                                        {getCart().total.toFixed(2)} ₾
                                    </strong>
                                </div>
                                <div className="flex">
                                    <Link
                                        href={route("client.cart.index")}
                                        className="archy-edt blue"
                                    >
                                        {__(
                                            "client.mini_cart_cart",
                                            sharedData
                                        )}
                                    </Link>
                                    <Link
                                        href={route("client.checkout.index")}
                                        className="archy-edt"
                                    >
                                        {__(
                                            "client.mini_cart_payment",
                                            sharedData
                                        )}
                                    </Link>
                                </div>
                            </div> : null}
                        </div>

                        <Languages />
                    </div>
                </div>
            </div>
            <Categories linkList={links} dropList={categoryDrop} />
        </div>
    );
};

export default Header;
