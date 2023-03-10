import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Pin } from "../SmallComps/Icons";
import { SocialMedia } from "../SmallComps/SocialMedia";
import "./Header.css";
import { Languages } from "../SmallComps/Languages";
import { CatButton, CommonButton } from "../Buttons/Buttons";
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
                    ? parseFloat(el.product.special_price)
                    : parseFloat(el.product.price));
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
            name: __("client.nav_home", sharedData),
            link: route("client.home.index"),
        },
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
            name: "??????????????????????????? ??????????????????????????????",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/2.png",
            name: "??????????????????????????? ??????????????????????????????",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/3.png",
            name: "??????????????????????????? ??????????????????????????????",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/3.png",
            name: "??????????????????????????? ??????????????????????????????",
            number: "1",
            price: "17.0",
        },
        {
            link: "/",
            img: "/img/products/1.png",
            name: "??????????????????????????? ??????????????????????????????",
            number: "1",
            price: "17.0",
        },
    ];
    const search = function () {
        let term = document.getElementById("search_inp").value;
        Inertia.get(route("search.index"), { term: term });
    };

    /*let input = document.getElementById("search_inp");

// Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            search()
        }
    });*/

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
                                href={route("client.cart.index")}
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
                            {getCart().items.length > 0 ? (
                                <div className="cart_drop">
                                    <div className="incart_products">
                                        {getCart().items.map((item, index) => {
                                            return (
                                                <div
                                                    className="flex"
                                                    key={index}
                                                >
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
                                                                ? parseFloat(item.product.special_price).toFixed(2)
                                                                : parseFloat(item.product.price).toFixed(2)}
                                                            ???
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            removeCartItem(
                                                                index
                                                            );
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
                                            {getCart().total.toFixed(2)} ???
                                        </strong>
                                    </div>
                                    <div className="flex">
                                        <CommonButton
                                            link={route("client.cart.index")}
                                            text={__(
                                                "client.mini_cart_cart",
                                                sharedData
                                            )}
                                        />
                                        <CommonButton
                                            gray
                                            link={route(
                                                "client.checkout.index"
                                            )}
                                            text={__(
                                                "client.mini_cart_payment",
                                                sharedData
                                            )}
                                        />
                                    </div>
                                </div>
                            ) : null}
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
