import React from "react";
import {
    CommonButton,
    RoundButton,
    SliderButtons,
} from "../../components/Buttons/Buttons";
import { ProductBox } from "../../components/ProductBox/ProductBox";
import "./Home.css";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { SliderData } from "../../components/ProductSlider/SliderData";
import TodaysBox from "../../components/TodaysBox/TodaysBox";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });

const Home = ({ page, seo }) => {
    const sharedData = usePage().props.localizations;
    const { images, products } = usePage().props;

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
        //localStorage.removeItem('cart')
        Inertia.visit(window.location.href);
    };

    const buyNow = function (product) {
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
        //localStorage.removeItem('cart')
        Inertia.get(route("client.checkout.index"));
    };

    return (
        <Layout seo={seo}>
            <div className="homePage">
                <div
                    className="hero_section"
                    style={{ background: "url(" + images[0] + ")" }}
                >
                    <div className="wrapper">
                        <div className="title35 blue">
                            {__("client.home_section1_title", sharedData)}
                        </div>
                        <div className="archy-edt blue">
                            {renderHTML(
                                __(
                                    "client.home_section1_text",
                                    sharedData
                                ).newLineToBr()
                            )}
                        </div>
                        <RoundButton
                            link="/"
                            text={__(
                                "client.home_section1_btn_title",
                                sharedData
                            )}
                        />
                    </div>
                </div>
                <div className="new_products wrapper">
                    <ProductSlider
                        showArrows
                        head={__("client.home_new_collection", sharedData)}
                        data={products.new_collection}
                        handleClick={addToCart}
                    />
                </div>
                <div className="bunker">
                    <div className="wrapper">
                        <ProductSlider
                            head={__("client.home_bunker", sharedData)}
                            data={products.bunker}
                            handleClick={addToCart}
                        />
                    </div>
                </div>
                <div className="today wrapper ">
                    <TodaysBox
                        addTocart={addToCart}
                        buyNow={buyNow}
                        data1={products.day_product}
                        data2={products.day_price}
                    />
                </div>
                <div className="special_price" id="special_price">
                    <div className="wrapper">
                        <ProductSlider
                            head={__("client.home_special_price", sharedData)}
                            data={products.special_price_tag}
                            rightBtns={[
                                <CommonButton
                                    link={route("client.category.special")}
                                    text={__(
                                        "client.home_btn_view_all",
                                        sharedData
                                    )}
                                />,
                            ]}
                            handleClick={addToCart}
                        />
                    </div>
                </div>
                <div id="popular_products" className="popular wrapper">
                    <ProductSlider
                        head={__("client.home_popular", sharedData)}
                        data={products.popular}
                        rightBtns={[
                            <CommonButton
                                link={route("client.category.popular")}
                                text={__(
                                    "client.home_btn_view_all",
                                    sharedData
                                )}
                            />,
                        ]}
                        handleClick={addToCart}
                    />
                </div>
                <div className="new_collection">
                    <div className="wrapper">
                        <div className="title35">
                            {__("client.home_section2_title", sharedData)}
                        </div>
                        <div className="archy-edt">
                            {renderHTML(
                                __(
                                    "client.home_section2_text",
                                    sharedData
                                ).newLineToBr()
                            )}
                        </div>
                        <RoundButton
                            white
                            text={__(
                                "client.home_section2_btn_txt",
                                sharedData
                            )}
                            link="/"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
