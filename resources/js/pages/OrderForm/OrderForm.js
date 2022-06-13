import React, { useState } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import Product1 from "/img/products/3.png";
import Product2 from "/img/products/2.png";
import Product3 from "/img/products/6.png";
import "./OrderForm.css";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Link } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

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

const OrderForm = ({ seo }) => {
    const sharedData = usePage().props.localizations;
    const items = [
        {
            img: Product1,
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 17.5,
            quantity: 1,
        },
        {
            img: Product2,
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 48,
            quantity: 2,
        },
        {
            img: Product3,
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 27.99,
            quantity: 1,
        },
    ];
    const inputs = [
        {
            type: "text",
            Placeholder: __("client.checkout_f_name", sharedData),
            name: "first_name",
        },
        {
            Placeholder: __("client.checkout_city_country", sharedData),
            type: "text",
            name: "city",
        },
        {
            Placeholder: __("client.checkout_l_name", sharedData),
            type: "text",
            name: "last_name",
        },
        {
            Placeholder: __("client.checkout_address", sharedData),
            type: "text",
            name: "address",
        },
        {
            Placeholder: __("client.checkout_phone", sharedData),
            type: "number",
            name: "phone",
        },
        {
            Placeholder: __("client.checkout_email", sharedData),
            type: "email",
            name: "email",
        },
    ];

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        payment_method: null,
        courier_service: null,
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));

        console.log(e.target.id);
        let bankList = document.getElementById("banks_list");
        if (e.target.id === "bank-transfer" || e.target.id === "bog") {
            bankList.style.display = "block";
        } else {
            bankList.style.display = "none";
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.checkout.order"), values);
    }

    function handleClick(e) {
        e.preventDefault();
        if (document.getElementById("iagree").checked === false) {
            alert("Check i agree");

            return false;
        }
        //document.getElementById('order_f').submit();
        values["cart"] = getCart();
        Inertia.post(route("client.checkout.order"), values, {
            onSuccess: (page) => {
                console.log(page);
            },
        });
    }

    const path = [
        {
            title: __("client.page_home", sharedData),
        },
        {
            title: __("client.page_cart", sharedData),
        },
        {
            title: __("client.page_checkout", sharedData),
        },
    ];
    const { errors } = usePage().props;

    console.log(errors);

    return (
        <Layout seo={seo}>
            <div className="orderformPage">
                <PagePath
                    first="მთავარი /"
                    previous={breadcrumb(path)}
                    current="შეკვეთის გაფორმება"
                />
                <div className="wrapper">
                    <div className="title35">
                        {__("client.checkout_title", sharedData)}
                    </div>
                    <div className="grid">
                        <div className="first">
                            <div className="title archy-edt">
                                {__("client.checkout_form_title", sharedData)}
                            </div>
                            <form id="order_f" onSubmit={handleSubmit}>
                                <div className="input_grid">
                                    {inputs.map((input, index) => {
                                        return (
                                            <input
                                                className="common_input"
                                                placeholder={input.Placeholder}
                                                key={index}
                                                type={input.type}
                                                name={input.name}
                                                onChange={handleChange}
                                            />
                                        );
                                    })}
                                    <textarea
                                        name="info"
                                        className="common_input"
                                        placeholder={__(
                                            "client.checkout_extra_info",
                                            sharedData
                                        )}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                {Object.keys(errors).map((item, i) => {
                                    return (
                                        <div className="error">
                                            {item} : {errors[item]}
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="products">
                            <div className="title archy-edt">
                                {__(
                                    "client.checkout_ordered_items",
                                    sharedData
                                )}
                            </div>
                            {getCart().items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex intable_pro"
                                        style={{ justifyContent: "flex-start" }}
                                    >
                                        <div className="img">
                                            <img
                                                src={
                                                    item.product.latest_image !=
                                                    null
                                                        ? "/" +
                                                          item.product
                                                              .latest_image
                                                              .path +
                                                          "/" +
                                                          item.product
                                                              .latest_image
                                                              .title
                                                        : null
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="name">
                                                {item.product.title}
                                            </div>
                                            <div className="op05">
                                                {__(
                                                    "client.checkout_brand",
                                                    sharedData
                                                )}
                                                :{" "}
                                                {item.product.attributes.brand}
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            {item.qty}
                                        </div>
                                        <div>
                                            {item.product.special_price !== null
                                                ? parseFloat(
                                                      item.product.special_price
                                                  ).toFixed(2)
                                                : parseFloat(
                                                      item.product.price
                                                  ).toFixed(2)}{" "}
                                            ლარი
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <div className="title archy-edt">
                                {__(
                                    "client.checkout_courier_service",
                                    sharedData
                                )}
                            </div>
                            <div className="checks">
                                <input
                                    type="radio"
                                    onClick={handleChange}
                                    name="courier_service"
                                    id="tbilisi"
                                    value={0}
                                />
                                <label htmlFor="tbilisi">თბილისი</label>
                            </div>
                            <div className="checks">
                                <input
                                    type="radio"
                                    onClick={handleChange}
                                    name="courier_service"
                                    id="region"
                                    value={1}
                                />
                                <label htmlFor="region">რეგიონი</label>
                            </div>
                            <div className="checks last">
                                <input
                                    type="checkbox"
                                    name="location"
                                    id="iagree"
                                />
                                <label htmlFor="iagree">
                                    {__("client.checkout_agree", sharedData)}{" "}
                                    <Link
                                        className="blue"
                                        href="/"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {__(
                                            "client.checkout_rules_cond",
                                            sharedData
                                        )}
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="title archy-edt">
                                <strong className="total_cost">
                                    {__(
                                        "client.checkout_grand_total",
                                        sharedData
                                    )}
                                    : <span>{getCart().total.toFixed(2)}</span>{" "}
                                    ლარი
                                </strong>
                            </div>
                            <div className="checks">
                                <input
                                    type="radio"
                                    onClick={handleChange}
                                    name="payment_method"
                                    id="cash"
                                    value={0}
                                />
                                <label htmlFor="cash">
                                    {__("client.checkout_cash_pay", sharedData)}
                                </label>
                            </div>
                            <div className="checks">
                                <input
                                    type="radio"
                                    onClick={handleChange}
                                    name="payment_method"
                                    id="bank-transfer"
                                    value={1}
                                />
                                <label htmlFor="bank-transfer">
                                    {__("client.checkout_bank_pay", sharedData)}
                                </label>
                                <div
                                    id="banks_list"
                                    style={{ display: "none" }}
                                >
                                    <div className="banks_list_item flex ">
                                        <input
                                            type="radio"
                                            onClick={handleChange}
                                            name="payment_type"
                                            id="bog"
                                            value="bog"
                                        />
                                        <label htmlFor="bog">
                                            {__(
                                                "client.checkout_bog_pay",
                                                sharedData
                                            )}
                                        </label>
                                    </div>
                                    <div className="banks_list_item flex ">
                                        <input
                                            type="radio"
                                            // onClick={handleChange}
                                            name="payment_type"
                                            id="tbc"
                                            value="tbc"
                                        />
                                        <label htmlFor="tbc">
                                            {__(
                                                "client.checkout_tbc_pay",
                                                sharedData
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <YellowButton
                                onclick={handleClick}
                                text={__(
                                    "client.checkout_place_order",
                                    sharedData
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderForm;
