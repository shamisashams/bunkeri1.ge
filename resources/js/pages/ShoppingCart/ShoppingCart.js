import React, {useState} from "react";
import "./ShoppingCart.css";
import { PagePath } from "../../components/PagePath/PagePath";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Arrow } from "../../components/SmallComps/Icons";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const ShoppingCart = ({ seo }) => {
    // const [quantity, setquantity] = useState(1);
    const sharedData = usePage().props.localizations;
    const [quantity, setquantity] = useState(2);

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
            total: parseFloat(total),
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

    const toUrl = function (url) {
        Inertia.get(url);
    };

    const items = [
        {
            img: "/img/products/3.png",
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 17.5,
            quantity: 1,
        },
        {
            img: "/img/products/2.png",
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 48,
            quantity: 2,
        },
        {
            img: "/img/products/6.png",
            name: "პროდუქტის დასახელება გრძელი ვარიანტი",
            brand: "brandname",
            price: 27.99,
            quantity: 1,
        },
    ];
    const path = [
        {
            title: __("client.page_home", sharedData),
        },
        {
            title: __("client.page_cart", sharedData),
        },
    ];

    const updateCart = (quantity,index) => {

        console.log(quantity)
        console.log(index)
        let cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);
        cart[index].qty = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        Inertia.visit(window.location.href);
    }

    return (
        <Layout seo={seo}>
            <div className="shoppingcartPage">
                <PagePath previous={breadcrumb(path)} current="კალათა" />
                <div className="wrapper">
                    <div className="title35">
                        {__("client.cart_title", sharedData)}
                    </div>
                    <div className="blue">
                        სულ მოიძებნა {getCart().items.length} პროდუქტი
                    </div>
                    <div className="table">
                        <table>
                            <tr className="head">
                                <th>
                                    {__("client.cart_table_product",sharedData)}
                                </th>
                                <th>
                                    {__("client.cart_table_unite_price",sharedData)}
                                </th>
                                <th>
                                    {__("client.cart_table_qnty", sharedData)}
                                </th>
                                <th>
                                    {__("client.cart_table_total", sharedData)}
                                </th>
                                <th>
                                    {__("client.cart_table_delete", sharedData)}
                                </th>
                            </tr>
                            {getCart().items.map((item, index) => {
                                const [quantity, setquantity] = useState(item.qty);
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div
                                                className="flex intable_pro"
                                                style={{
                                                    justifyContent:
                                                        "flex-start",
                                                }}
                                            >
                                                <div className="img">
                                                    <img
                                                        src={
                                                            item.product
                                                                .latest_image !=
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
                                                        მწარმოებელი:{" "}
                                                        {
                                                            item.product
                                                                .attributes
                                                                .brand
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.product.special_price !== null
                                                ? parseFloat(item.product.special_price).toFixed(
                                                      2
                                                  )
                                                : parseFloat(item.product.price).toFixed(2)}
                                            ლარი
                                        </td>
                                        <td>
                                            <div className="number radius5">
                                                <button onClick={() => {
                                                    setquantity(
                                                        quantity > 1 ? quantity - 1 : 1
                                                    )
                                                    updateCart(quantity > 1 ? quantity - 1 : 1,index)
                                                }
                                                }>−</button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                />
                                                <button onClick={() => {
                                                    setquantity(quantity + 1)
                                                    updateCart(quantity + 1,index)
                                                }
                                                }>+</button>
                                            </div>
                                        </td>
                                        <td className="sum">
                                            {(
                                                (item.product.special_price !==
                                                null
                                                    ? parseFloat(item.product.special_price)
                                                    : parseFloat(item.product.price)) *
                                                item.qty
                                            ).toFixed(2)}{" "}
                                            ლარი
                                        </td>
                                        <td>
                                            <button
                                                onClick={(event) =>
                                                    removeCartItem(index)
                                                }
                                                className="remove flex centered"
                                            >
                                                <img
                                                    src="/img/icons/other/delete.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className="bottom flex">
                        <button
                            onClick={() => toUrl(route("client.home.index"))}
                            className="back"
                        >
                            <Arrow color="#fff" rotate="90" />
                            <span className="archy-edt">
                                {__("client.cart_continue_shopping",sharedData)}
                            </span>
                        </button>
                        <div>
                            <strong className="total_cost">
                                {__("client.cart_grand_total", sharedData)}:{" "}
                                <span>{getCart().total.toFixed(2)}</span> ლარი
                            </strong>
                            <Link href={route('client.checkout.index')}>
                                <YellowButton
                                    text={__("client.cart_checkout", sharedData)}
                                />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ShoppingCart;
